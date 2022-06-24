import type { AstroConfig } from 'astro';
import { ILogger, isObjectEmpty } from '@/at-utils';

import type { WebmanifestOptions } from './index';
import { isIconSquare } from './helpers/is-icon-square';
import { validateOptions } from './validate-options';
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
  const checkIconDimension = async (icon: string | undefined) => {
    if (icon && !(await isIconSquare(icon))) {
      logger.info(`
        The icon(${icon}) provided is not square.
        The generated icons will be square and for the best results it's recommend to provide a square icon.
        `);
    }
  };

  const opts = validateOptions(pluginOptions);

  await checkIconDimension(opts.icon);
  if (opts.locales) {
    for (const { icon } of Object.values(opts.locales)) {
      await checkIconDimension(icon);
    }
  }

  if (opts.icon && opts.config?.createFavicon) {
    await processFavicon(opts.icon, dir);
  }

  const results = [];

  results.push(await createManifest(opts, opts.config?.outfile!, dir, logger));

  if (opts.locales) {
    const arr = Object.entries(opts.locales);
    for (const [locale, entry] of arr) {
      results.push(await createManifest({ ...opts, ...entry }, opts.config?.outfile!, dir, logger, locale));
    }
  }

  if (pages.length > 0) {
    const heads = getHeads(opts, config.base, results);
    if (!isObjectEmpty(heads)) {
      await processPages(pages, dir, heads, config.build.format);
      logger.success('Webmanifest links are inserted into <head> section of generated pages.');
    }
  }
};

export default onBuildDone;
