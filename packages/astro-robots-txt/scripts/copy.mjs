import fs from 'node:fs';
import path from 'node:path';

const fileName = 'index.d.ts';
const src = path.join(process.cwd(), 'dist', 'astro-robots-txt', 'src', fileName);
const dest = path.join(process.cwd(), 'dist', fileName);

try {
  const s = fs.readFileSync(src, 'utf8');
  fs.writeFileSync(dest, s);
  console.log(`Success: "${fileName}" copied to "./dist"`);
} catch (err) {
  console.error(err);
}
