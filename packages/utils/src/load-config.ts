import { fileURLToPath } from 'node:url';
import { isFileExists } from './is-file-exists';

export async function loadConfig(namespace: string, base: URL) {
  if (!namespace) {
    return null;
  }
  const exts = ['js', 'mjs', 'cjs'];
  for (const ext of exts) {
    const fileName = `${namespace}.config.${ext}`;
    const fileUrl = new URL(fileName, base);
    if (await isFileExists(fileUrl)) {
      const file = fileURLToPath(fileUrl);
      const module = await import(/* @vite-ignore */ file);
      if (!module.default) {
        throw new Error(`'${fileName}' doesn't contain a default export`);
      }
      return module.default;
    }
  }
  return null;
}
