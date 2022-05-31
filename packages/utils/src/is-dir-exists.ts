import { promises as fs, PathLike } from 'node:fs';

export async function isDirExists(dir: PathLike) {
  try {
    const stats = await fs.stat(dir);
    return stats.isDirectory();
  } catch (err) {
    if ((err as any).code !== 'ENOENT') {
      throw err;
    }
    return false;
  }
}
