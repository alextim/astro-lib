import fs from 'node:fs';

export function isFileExistsSync(file: fs.PathLike) {
  try {
    return fs.statSync(file).isFile();
  } catch (e: any) {
    if (e.code !== 'ENOENT') {
      throw e;
    }

    return false;
  }
}
