import type { PathLike } from 'node:fs';
import { promises as fs } from 'node:fs';

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
