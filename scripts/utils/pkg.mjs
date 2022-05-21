import fs from 'node:fs';
import path from 'node:path';

const pkgPath = path.join(process.cwd(), 'package.json');
const pkgRawContent = fs.readFileSync(pkgPath, 'utf8');
const pkg = JSON.parse(pkgRawContent);

export default pkg;
