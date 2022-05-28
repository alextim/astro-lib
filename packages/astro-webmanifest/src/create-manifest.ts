import fs from 'node:fs';
import type { WebmanifestOptions } from './index';
import { getManifest } from './get-manifest';
import { processIconsSet } from './helpers/process-icon-set';
import { ILogger } from '@/at-utils';
import localize from './helpers/localize-outfile';

export async function createManifest(opts: WebmanifestOptions, outfile: string, dir: URL, logger: ILogger, locale = '') {
  const manifest = getManifest(opts);
  try {
    if (opts?.icon) {
      await processIconsSet(manifest.icons, opts.icon, dir);
    }
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
