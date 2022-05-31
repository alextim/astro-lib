import fs from 'node:fs';
import type { AstroConfig } from 'astro';
import type { RobotsTxtOptions } from './index';
import { ILogger } from '@/at-utils';

import { withOptions } from './with-options';
import { isOptsValid } from './is-opts-valid';
import { getRobotsTxtContent } from './get-robots-txt-content';

const onBuildDone = (pluginOptions: RobotsTxtOptions, config: AstroConfig, dir: URL, logger: ILogger) => {
  const opts = withOptions(pluginOptions);

  if (!isOptsValid(config.site, opts, logger)) {
    return;
  }

  const robotsTxtContent = getRobotsTxtContent(config.site!, opts);

  const url = new URL('robots.txt', dir);
  fs.writeFileSync(url, robotsTxtContent);
  logger.success('`robots.txt` is created.');
};

export default onBuildDone;
