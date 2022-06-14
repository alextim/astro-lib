import fs from 'node:fs';
import type { AstroConfig } from 'astro';
import type { RobotsTxtOptions } from './index';

import { validateOptions } from './validate-options';
import { getRobotsTxtContent } from './get-robots-txt-content';

const onBuildDone = (pluginOptions: RobotsTxtOptions, config: AstroConfig, dir: URL) => {
  const opts = validateOptions(config.site, pluginOptions);

  const finalSiteHref = new URL(config.base, config.site).href;

  const robotsTxtContent = getRobotsTxtContent(finalSiteHref, opts);

  const url = new URL('robots.txt', dir);
  fs.writeFileSync(url, robotsTxtContent);
};

export default onBuildDone;
