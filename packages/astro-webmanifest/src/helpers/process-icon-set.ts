import type { Icon } from '../index.js';
import { generateIcon } from './generate-icon.js';

export async function processIconsSet(iconSet: Icon[] | undefined, srcIcon: string, dir: URL) {
  if (!iconSet) {
    return;
  }
  for (const dstIcon of iconSet) {
    await generateIcon(dstIcon, srcIcon, dir);
  }
}
