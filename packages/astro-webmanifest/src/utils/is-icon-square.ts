import sharp from 'sharp';

export async function isIconSquare(icon: string) {
  try {
    const metadata = await sharp(icon).metadata();
    return metadata.width === metadata.height;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}
