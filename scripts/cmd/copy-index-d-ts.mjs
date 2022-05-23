import pkg from '../utils/pkg.mjs';
import { copyFile } from '../utils/copy-file.mjs';

export function copyIndexD() {
  copyFile('index.d.ts', ['dist', pkg.name, 'src'], ['dist']);
}
