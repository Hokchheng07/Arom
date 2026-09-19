import { createRequire } from "node:module";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

const require = createRequire(import.meta.url);
const Jimp = require("jimp");
const potrace = require("potrace");

const sourcePath = process.argv[2];
if (!sourcePath) {
  throw new Error('Pass the source SVG: npm run trace:design -- "C:\\path\\design.svg"');
}

const source = await readFile(path.resolve(sourcePath), "utf8");
const sizeMatch = source.match(/<svg[^>]*width="([\d.]+)"[^>]*height="([\d.]+)"/);
const matrixMatch = source.match(/transform="matrix\(([\d.eE+-]+)\s+0\s+0\s+([\d.eE+-]+)\s+([\d.eE+-]+)\s+([\d.eE+-]+)\)"/);
const imageMatch = source.match(/<image[^>]*width="([\d.]+)"[^>]*height="([\d.]+)"[^>]*xlink:href="data:image\/png;base64,([^"]+)"/s);

if (!sizeMatch || !matrixMatch || !imageMatch) {
  throw new Error("Expected an SVG containing a transformed, base64-encoded PNG.");
}

const [, outputWidthText, outputHeightText] = sizeMatch;
const [, scaleXText, scaleYText, translateXText, translateYText] = matrixMatch;
const [, imageWidthText, imageHeightText, base64] = imageMatch;
const outputWidth = Number(outputWidthText);
const outputHeight = Number(outputHeightText);
const imageWidth = Number(imageWidthText);
const imageHeight = Number(imageHeightText);
const scaleX = Number(scaleXText);
const scaleY = Number(scaleYText);
const translateX = Number(translateXText);
const translateY = Number(translateYText);

const cropX = Math.max(0, Math.round(-translateX / scaleX));
const cropY = Math.max(0, Math.round(-translateY / scaleY));
const cropWidth = Math.min(imageWidth - cropX, Math.round(1 / scaleX));
const cropHeight = Math.min(imageHeight - cropY, Math.round(1 / scaleY));

const outputDirectory = path.resolve("public", "traced");
const rasterPath = path.join(outputDirectory, "arom-design-source.png");
const potracePath = path.join(outputDirectory, "arom-design-potrace.svg");
const vtracerPath = path.join(outputDirectory, "arom-design.svg");
await mkdir(outputDirectory, { recursive: true });

const raster = await Jimp.read(Buffer.from(base64, "base64"));
raster.crop(cropX, cropY, cropWidth, cropHeight);
raster.resize(outputWidth * 3, outputHeight * 3, Jimp.RESIZE_BICUBIC);
await raster.writeAsync(rasterPath);

const potraceSvg = await new Promise((resolve, reject) => {
  potrace.posterize(
    rasterPath,
    { steps: 4, threshold: 180, turdSize: 6, optTolerance: 0.2 },
    (error, svg) => (error ? reject(error) : resolve(svg)),
  );
});
await writeFile(potracePath, potraceSvg, "utf8");

const pythonPath = process.platform === "win32"
  ? path.resolve(".venv", "Scripts", "python.exe")
  : path.resolve(".venv", "bin", "python");
const result = spawnSync(
  pythonPath,
  [path.resolve("scripts", "trace-vtracer.py"), rasterPath, vtracerPath],
  { stdio: "inherit" },
);

if (result.status !== 0) {
  throw new Error(`VTracer failed with exit code ${result.status ?? "unknown"}.`);
}

console.log(`Source crop: ${rasterPath}`);
console.log(`Potrace comparison: ${potracePath}`);
console.log(`Full-color recreation: ${vtracerPath}`);
