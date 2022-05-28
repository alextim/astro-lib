import path from 'node:path';
import sharp from 'sharp';
import type { Icon } from '../index';

export async function generateIcon(icon: Icon, srcIcon: string, dir: URL) {
  if (!icon.sizes) {
    return undefined;
  }
  const imgPath = path.join(dir.pathname, icon.src);

  // console.log(`generating icon: `, icon.src)
  // if (fs.existsSync(imgPath)) {
  //   console.log(`icon already Exists, not regenerating`)
  //   return true
  // }

  const size = parseInt(icon.sizes.substring(0, icon.sizes.indexOf('x')));

  // For vector graphics, instruct sharp to use a pixel density suitable for the resolution we're rasterizing to.
  // For pixel graphics sources this has no effect.
  // Sharp accept density from 1 to 2400
  const density = Math.min(2400, Math.max(1, size));
  try {
    const sharpIcon = sharp(srcIcon, { density });
    const result = await sharpIcon
      .resize({
        width: size,
        height: size,
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .toFile(imgPath);
    return result;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}
