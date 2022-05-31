import type { AstroConfig } from 'astro';
import type { WebmanifestOptions } from './index';
import { ILogger } from '@/at-utils';

import { withOptions } from './with-options';
import { isOptsValid } from './is-opts-valid';
import { processFavicon } from './process-favicon';
import { createManifest } from './create-manifest';
import { processPages } from './process-pages';
import { getHeads } from './get-heads';

const onBuildDone = async (
  pluginOptions: WebmanifestOptions,
  config: AstroConfig,
  dir: URL,
  pages: {
    pathname: string;
  }[],
  logger: ILogger,
) => {
  const opts = withOptions(pluginOptions);
  if (!(await isOptsValid(opts, logger))) {
    return;
  }
  const { config: { outfile, createFavicon } = {}, icon = '' } = opts;
  try {
    if (icon && createFavicon) {
      await processFavicon(icon, dir);
    }

    const results = [];

    results.push(await createManifest(opts, outfile!, dir, logger));

    if (opts.locales) {
      const arr = Object.entries(opts.locales);
      for (const [locale, entry] of arr) {
        results.push(await createManifest({ ...opts, ...entry }, outfile!, dir, logger, locale));
      }
    }

    const heads = getHeads(opts, results);

    await processPages(pages, dir, heads, config.build.format);
  } catch (err) {
    logger.error((err as any).toString());
  }
};

export default onBuildDone;
