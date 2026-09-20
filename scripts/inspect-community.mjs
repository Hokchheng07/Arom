import fs from 'node:fs';

const token = process.env.FIGMA_TOKEN || '';
const fileKey = process.env.FIGMA_FILE_KEY || '4qnjzbm8ngKdL5EKVfrrEH';

async function main() {
  const res = await fetch(`https://api.figma.com/v1/files/${fileKey}/nodes?ids=241:566`, {
    headers: { 'X-Figma-Token': token }
  });
  console.log('Status:', res.status, 'Retry-After:', res.headers.get('retry-after'));
  const data = await res.json();
  if (res.status !== 200) {
    console.error('Error response:', data);
    return;
  }
  fs.writeFileSync('scripts/figma-community.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('Saved scripts/figma-community.json');

  const section = data.nodes['241:566'].document;
  console.log('Section Name:', section.name, 'Type:', section.type);
  
  function walk(node, depth = 0) {
    const pad = '  '.repeat(depth);
    let info = `${pad}- ${node.name} [${node.type} ${node.id}]`;
    if (node.characters) {
      info += ` text="${node.characters.replace(/\n/g, ' ')}"`;
    }
    if (node.style) {
      info += ` font: ${node.style.fontFamily} ${node.style.fontSize}px w${node.style.fontWeight}`;
    }
    if (node.fills && node.fills[0] && node.fills[0].color) {
      const c = node.fills[0].color;
      const hex = '#' + [c.r, c.g, c.b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
      info += ` fill:${hex}`;
    }
    console.log(info);
    if (node.children) {
      for (const child of node.children) {
        walk(child, depth + 1);
      }
    }
  }

  walk(section);
}

main().catch(console.error);
