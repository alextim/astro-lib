import fs from 'node:fs';
import path from 'node:path';

import pkg from '../utils/pkg.mjs';

const fileName = 'pkg-name.ts';
const constName = 'packageName';

export function createPkgName() {
  const { name } = pkg;
  const pkgNamePath = path.join(process.cwd(), 'src', 'data', fileName);
  const prevData = fs.existsSync(pkgNamePath) ? fs.readFileSync(pkgNamePath, 'utf8') : '';

  const currData = `// @internal\nexport const ${constName} = '${name}';\n`;
  if (currData != prevData) {
    fs.writeFileSync(pkgNamePath, currData);
    // eslint-disable-next-line no-console
    console.log(`new '${fileName}' with ${constName} = '${name}' created\n`);
  }
}
