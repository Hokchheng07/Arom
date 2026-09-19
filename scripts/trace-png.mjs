import { createRequire } from "node:module";
import { readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

const require = createRequire(import.meta.url);
const potrace = require("potrace");

const inputPath = process.argv[2];
const outputPath = process.argv[3];

if (!inputPath || !outputPath) {
  throw new Error("Usage: npm run trace:png -- INPUT.png OUTPUT.svg");
}

const resolvedInput = path.resolve(inputPath);
const resolvedOutput = path.resolve(outputPath);
const extension = path.extname(resolvedOutput);
const potraceOutput = resolvedOutput.slice(0, -extension.length) + "-potrace.svg";

await readFile(resolvedInput);

const potraceSvg = await new Promise((resolve, reject) => {
  potrace.posterize(
    resolvedInput,
    { steps: 4, threshold: 180, turdSize: 6, optTolerance: 0.2 },
    (error, svg) => (error ? reject(error) : resolve(svg)),
  );
});
await writeFile(potraceOutput, potraceSvg, "utf8");

const pythonPath = process.platform === "win32"
  ? path.resolve(".venv", "Scripts", "python.exe")
  : path.resolve(".venv", "bin", "python");
const result = spawnSync(
  pythonPath,
  [path.resolve("scripts", "trace-vtracer.py"), resolvedInput, resolvedOutput],
  { stdio: "inherit" },
);

if (result.status !== 0) {
  throw new Error(`VTracer failed with exit code ${result.status ?? "unknown"}.`);
}

console.log(`Potrace comparison: ${potraceOutput}`);
console.log(`Full-color recreation: ${resolvedOutput}`);
