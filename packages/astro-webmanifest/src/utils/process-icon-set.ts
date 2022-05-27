import type { Icon } from '../index';
import { generateIcon } from './generate-icon';

export async function processIconsSet(iconSet: Icon[], srcIcon: string, dir: URL) {
  for (const dstIcon of iconSet) {
    await generateIcon(dstIcon, srcIcon, dir);
  }
}
