import fs from 'node:fs';
import type { ILogger } from '@/at-utils';

import type { WebmanifestOptions } from './index.js';
import { getManifest } from './get-manifest.js';
import { processIconsSet } from './helpers/process-icon-set.js';
import localize from './helpers/localize-outfile.js';

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
