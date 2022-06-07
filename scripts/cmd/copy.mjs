import pkg from '../utils/pkg.mjs';
import { copyFile } from '../utils/copy-file.mjs';

const checkArgs = (args) => {
  if (!args) {
    throw new Error('copy: args is required');
  }
  if (!Array.isArray(args)) {
    throw new Error('copy: args should be array');
  }
  if (args.length === 0) {
    throw new Error('copy: args array is empty');
  }
};

export function copyDst(args) {
  checkArgs(args);
  for (const fileName of args) {
    copyFile(fileName, ['dist', pkg.name, 'src'], ['dist']);
  }
}

export function copySrc(args) {
  checkArgs(args);
  for (const fileName of args) {
    copyFile(fileName, ['src'], ['dist']);
  }
}
