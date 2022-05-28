import type { Icon } from '../index';
import { generateIcon } from './generate-icon';

export async function processIconsSet(iconSet: Icon[] | undefined, srcIcon: string, dir: URL) {
  if (!iconSet) {
    return;
  }
  for (const dstIcon of iconSet) {
    await generateIcon(dstIcon, srcIcon, dir);
  }
}
