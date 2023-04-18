import path from 'node:path';
import sharp from 'sharp';
import { promises as fs } from 'node:fs';
import { isDirExists } from '@/at-utils';
import type { Icon } from '../index.js';

export async function generateIcon(icon: Icon, srcIcon: string, dir: URL) {
  const { sizes = '' } = icon;
  if (!sizes || sizes === 'any') {
    return undefined;
  }
  // console.log(dir, dir.pathname, icon.src)
  // const imgPath = path.join(dir.pathname, icon.src);

  // console.log(`generating icon: `, icon.src)
  // if (fs.existsSync(imgPath)) {
  //   console.log(`icon already Exists, not regenerating`)
  //   return true
  // }
  if (sizes.split(' ').length > 1) {
    return undefined;
  }
  const arr = sizes.split(/[xX]/);
  if (arr.length > 2) {
    return undefined;
  }
  const size = parseInt(arr[0]);

  // For vector graphics, instruct sharp to use a pixel density suitable for the resolution we're rasterizing to.
  // For pixel graphics sources this has no effect.
  // Sharp accept density from 1 to 2400
  const density = Math.min(2400, Math.max(1, size));
  const sharpIcon = sharp(srcIcon, { density });
  const { data, info } = await sharpIcon
    .resize({
      width: size,
      height: size,
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .toBuffer({ resolveWithObject: true });
  // .toFile(imgPath);
  const out = new URL(icon.src, dir);

  const dirname = path.dirname(out.href);

  if (!(await isDirExists(dirname))) {
    await fs.mkdir(new URL(dirname), { recursive: true });
  }
  await fs.writeFile(out, data);
  return info;
}
