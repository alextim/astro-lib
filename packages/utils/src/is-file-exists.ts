import fs from 'node:fs';

export function isFileExists(file: string) {
  try {
    return fs.statSync(file).isFile();
  } catch (e: any) {
    if (e.code !== 'ENOENT') {
      throw e;
    }

    return false;
  }
}
