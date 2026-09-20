import fs from 'node:fs';
import path from 'node:path';

const token = process.env.FIGMA_TOKEN || '';
const fileKey = process.env.FIGMA_FILE_KEY || '4qnjzbm8ngKdL5EKVfrrEH';

async function main() {
  const res = await fetch(`https://api.figma.com/v1/files/${fileKey}/nodes?ids=55:25,236:946`, {
    headers: { 'X-Figma-Token': token }
  });
  const data = await res.json();
  fs.writeFileSync('scripts/figma-homescreen.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('Successfully saved figma-homescreen.json');

  const node55 = data.nodes['55:25'].document;

  function summarize(n, depth = 0) {
    const pad = '  '.repeat(depth);
    let info = `${pad}- ${n.name} [${n.type}]`;
    if (n.characters) {
      info += ` text="${n.characters.replace(/\n/g, ' ')}"`;
    }
    if (n.style) {
      info += ` font: ${n.style.fontFamily} ${n.style.fontSize}px w${n.style.fontWeight}`;
    }
    if (n.cornerRadius) {
      info += ` r:${n.cornerRadius}`;
    }
    if (n.fills && n.fills[0] && n.fills[0].color) {
      const c = n.fills[0].color;
      const hex = '#' + [c.r, c.g, c.b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
      info += ` fill:${hex}`;
    }
    console.log(info);
    if (n.children) {
      for (const child of n.children) {
        summarize(child, depth + 1);
      }
    }
  }

  console.log('=== DETECTION SHEET (236:946) ===');
  summarize(data.nodes['236:946'].document);

  const compRes = await fetch(`https://api.figma.com/v1/files/${fileKey}/nodes?ids=7:9`, {
    headers: { 'X-Figma-Token': token }
  });
  const compData = await compRes.json();
  fs.writeFileSync('scripts/figma-buttons.json', JSON.stringify(compData, null, 2), 'utf8');
  console.log('=== BUTTONS & COMPONENT SETS (7:9) ===');
  const page2 = compData.nodes['7:9'].document;
  if (page2.children) {
    page2.children.forEach(c => {
      console.log(`- ${c.name} [${c.type} id:${c.id}]`);
      if (c.children) {
        c.children.forEach(variant => {
          console.log(`    Variant: ${variant.name} [${variant.type}]`);
        });
      }
    });
  }
}

main().catch(console.error);
