import fs from 'node:fs';
import path from 'node:path';

const token = process.env.FIGMA_TOKEN || '';
const fileKey = process.env.FIGMA_FILE_KEY || '4qnjzbm8ngKdL5EKVfrrEH';

const data = JSON.parse(fs.readFileSync('scripts/figma-homescreen.json', 'utf8'));

const iconNodes = {};

function search(node) {
  if (
    node.name.includes(':') ||
    node.name.includes('Vector') ||
    node.name.includes('Group 2') ||
    node.name.includes('Ellipse 1')
  ) {
    if (node.type === 'FRAME' || node.type === 'GROUP' || node.type === 'INSTANCE' || node.type === 'VECTOR') {
      iconNodes[node.name] = node.id;
    }
  }
  if (node.children) {
    for (const c of node.children) search(c);
  }
}

search(data.nodes['55:25'].document);
search(data.nodes['236:946'].document);

console.log('Found icons/graphics:', iconNodes);

const targetIds = [
  iconNodes['mdi:check-circle'],
  iconNodes['ant-design:play-circle-filled'],
  iconNodes['hugeicons:yoga-03'],
  iconNodes['boxicons:note-filled'],
  iconNodes['fluent:people-community-32-filled'],
  iconNodes['boxicons:quote-left-alt-filled'],
  iconNodes['akar-icons:heart'],
  iconNodes['boxicons:tired'],
  iconNodes['akar-icons:face-sad'],
  iconNodes['teenyicons:mood-flat-outline'],
  iconNodes['ic:outline-mood'],
  iconNodes['boxicons:happy-beaming'],
  iconNodes['ant-design:home-filled'],
  iconNodes['akar-icons:book'],
  iconNodes['cuida:heart-rate-outline'],
  iconNodes['boxicons:community-filled'],
  iconNodes['bi:journal-bookmark-fill'],
  iconNodes['oui:anomaly-detection'],
].filter(Boolean);

console.log('Target IDs for SVG export:', targetIds);

async function exportSvgs() {
  const url = `https://api.figma.com/v1/images/${fileKey}?ids=${targetIds.join(',')}&format=svg`;
  const res = await fetch(url, {
    headers: { 'X-Figma-Token': token }
  });
  const result = await res.json();
  console.log('SVG URLs:', result.images);

  const iconDir = path.resolve('public', 'figma', 'icons');
  if (!fs.existsSync(iconDir)) fs.mkdirSync(iconDir, { recursive: true });

  for (const [name, id] of Object.entries(iconNodes)) {
    if (result.images && result.images[id]) {
      const svgRes = await fetch(result.images[id]);
      const svgText = await svgRes.text();
      const safeName = name.replace(/[^a-zA-Z0-9_-]/g, '_') + '.svg';
      fs.writeFileSync(path.join(iconDir, safeName), svgText, 'utf8');
      console.log(`Saved ${safeName}`);
    }
  }
}

exportSvgs().catch(console.error);
