import { isFileExists } from './is-file-exists';

export async function loadConfig(namespace: string, base: URL) {
  if (!namespace) {
    return null;
  }
  const exts = ['js', 'mjs', 'cjs'];
  for (const ext of exts) {
    const fileName = `${namespace}.config.${ext}`;
    const file = new URL(fileName, base);
    if (await isFileExists(file)) {
      const module = await import(file.pathname);
      if (!module.default) {
        throw new Error(`'${fileName}' doesn't have default export`);
      }
      return module.default;
    }
  }
  return null;
}
