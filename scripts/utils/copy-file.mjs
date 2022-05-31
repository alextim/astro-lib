import fs from 'node:fs';
import path from 'node:path';

export function copyFile(fileName, src, dest) {
  const srcFile = path.join(...[process.cwd(), ...src, fileName]);
  const destFile = path.join(...[process.cwd(), ...dest, fileName]);

  try {
    fs.copyFileSync(srcFile, destFile);
    // eslint-disable-next-line no-console
    console.log(`Success: "${fileName}" copied to "${dest.join('/')}"`);
  } catch (err) {
    console.error(err);
  }
}
