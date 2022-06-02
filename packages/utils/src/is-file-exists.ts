import fs from 'node:fs';

export async function isFileExists(file: fs.PathLike) {
  try {
    const result = await fs.promises.stat(file);
    return result.isFile();
  } catch (e: any) {
    if (e.code !== 'ENOENT') {
      throw e;
    }
    return false;
  }
}
