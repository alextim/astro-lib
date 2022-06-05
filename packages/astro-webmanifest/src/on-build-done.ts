import type { AstroConfig } from 'astro';
import type { WebmanifestOptions } from './index';
import { ILogger } from '@/at-utils';

import { withOptions } from './with-options';
import { validateOpts } from './validate-opts';
import { processFavicon } from './process-favicon';
import { createManifest } from './create-manifest';
import { processPages } from './process-pages';
import { getHeads } from './get-heads';
import { isIconSquare } from './helpers/is-icon-square';

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

  const checkIconDimension = async (icon: string | undefined) => {
    if (!icon) {
      return;
    }
    if (!(await isIconSquare(icon))) {
      logger.info(`
        The icon(${icon}) provided is not square.
        The generated icons will be square and for the best results it's recommend to provide a square icon.
        `);
    }
  };

  const { config: { outfile, createFavicon } = {}, icon = '' } = opts;

  validateOpts(opts);

  await checkIconDimension(icon);
  if (opts.locales) {
    for (const { icon } of Object.values(opts.locales)) {
      await checkIconDimension(icon);
    }
  }

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
};

export default onBuildDone;
