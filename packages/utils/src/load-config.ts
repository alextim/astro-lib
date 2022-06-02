import { isFileExists } from './is-file-exists';

export async function loadConfig(name: string, base: URL) {
  if (!name) {
    return null;
  }
  const exts = ['ts', 'js', 'mjs', 'cjs'];
  for (const ext of exts) {
    const fileName = `${name}.config.${ext}`;
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
