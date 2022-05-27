import fs from 'node:fs';
import type { Webmanifest } from './index';
import { getManifest } from './get-manifest';
import { ILogger } from '@at-utils';

const localize = (outfile: string, locale: string) => {
  if (!locale) {
    return outfile;
  }
  const a = outfile.split('.');
  a[0] = `${a[0]}-${locale}`;
  return a.join('.');
};

export function createManifest(opts: Webmanifest, outfile: string, dir: URL, logger: ILogger, locale = '') {
  const manifest = getManifest(opts);
  try {
    const localized = localize(outfile, locale);
    const outfileUrl = new URL(localized, dir);
    fs.writeFileSync(outfileUrl, JSON.stringify(manifest));
    logger.success(`\`${localized}\` is created.`);
    return true;
  } catch (err) {
    logger.error((err as any).toString());
    return false;
  }
}
