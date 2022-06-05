import fs from 'node:fs';
import type { AstroConfig } from 'astro';
import type { RobotsTxtOptions } from './index';

import { withOptions } from './with-options';
import { validateOpts } from './validate-opts';
import { getRobotsTxtContent } from './get-robots-txt-content';

const onBuildDone = (pluginOptions: RobotsTxtOptions, config: AstroConfig, dir: URL) => {
  const opts = withOptions(pluginOptions);

  validateOpts(config.site, opts);

  const robotsTxtContent = getRobotsTxtContent(config.site!, opts);

  const url = new URL('robots.txt', dir);
  fs.writeFileSync(url, robotsTxtContent);
};

export default onBuildDone;
