import sharp from 'sharp';
import path from 'node:path';

import type { Icon } from '../src/index';

async function generateIcon(icon: Icon, srcIcon: string, outDir: string) {
  const imgPath = path.join(outDir, icon.src);

  // console.log(`generating icon: `, icon.src)
  // if (fs.existsSync(imgPath)) {
  //   console.log(`icon already Exists, not regenerating`)
  //   return true
  // }
  if (!icon.sizes) {
    return null;
  }
  const size = parseInt(icon.sizes.substring(0, icon.sizes.lastIndexOf('x')));

  // For vector graphics, instruct sharp to use a pixel density
  // suitable for the resolution we're rasterizing to.
  // For pixel graphics sources this has no effect.
  // Sharp accept density from 1 to 2400
  const density = Math.min(2400, Math.max(1, size));

  const sharpInstance = sharp(srcIcon, { density });
  return sharpInstance
    .resize({
      width: size,
      height: size,
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .toFile(imgPath);
}

async function processIconSet(iconSet: Icon[]) {
  iconSet = iconSet.map((icon) => {
    const newIcon = { ...icon };
    newIcon.src = addDigestToPath(icon.src, iconDigest, cacheMode);
    return newIcon;
  });
  return iconSet;
}
