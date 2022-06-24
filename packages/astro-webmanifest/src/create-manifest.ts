import fs from 'node:fs';
import { ILogger } from '@/at-utils';

import type { WebmanifestOptions } from './index';
import { getManifest } from './get-manifest';
import { processIconsSet } from './helpers/process-icon-set';
import localize from './helpers/localize-outfile';

export async function createManifest(opts: WebmanifestOptions, outfile: string, dir: URL, logger: ILogger, locale = '') {
  const manifest = getManifest(opts);

  if (opts?.icon) {
    await processIconsSet(manifest.icons, opts.icon, dir);
  }
  const localized = localize(outfile, locale);
  fs.writeFileSync(new URL(localized, dir), JSON.stringify(manifest, null, 2));
  logger.success(`\`${localized}\` is created.`);

  return {
    locale,
    outfile: localized,
    manifest,
  };
}
