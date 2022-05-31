import sharp from 'sharp';
import fs from 'node:fs';

import { processIconsSet } from './helpers/process-icon-set';
import { favicons } from './default-icons';

export async function processFavicon(srcIcon: string, dir: URL) {
  const metadata = await sharp(srcIcon).metadata();
  await processIconsSet(favicons, srcIcon, dir);

  if (metadata.format === 'svg') {
    fs.copyFileSync(srcIcon, new URL('favicon.svg', dir));
  }
}
