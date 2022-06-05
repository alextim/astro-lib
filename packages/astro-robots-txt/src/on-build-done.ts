import fs from 'node:fs';
import type { AstroConfig } from 'astro';
import { ZodError } from 'zod';
import type { RobotsTxtOptions } from './index';
import { ILogger } from '@/at-utils';

import { withOptions } from './with-options';
import { isOptsValid } from './is-opts-valid';
import { getRobotsTxtContent } from './get-robots-txt-content';

function formatConfigErrorMessage(err: ZodError) {
  const errorList = err.issues.map((issue) => ` ${issue.path.join('.')}  ${issue.message + '.'}`);
  return errorList.join('\n');
}

const onBuildDone = (pluginOptions: RobotsTxtOptions, config: AstroConfig, dir: URL, logger: ILogger) => {
  const opts = withOptions(pluginOptions);

  try {
    if (!isOptsValid(config.site, opts)) {
      return;
    }

    const robotsTxtContent = getRobotsTxtContent(config.site!, opts);

    const url = new URL('robots.txt', dir);
    fs.writeFileSync(url, robotsTxtContent);
    logger.success('`robots.txt` is created.');
  } catch (err) {
    if (err instanceof ZodError) {
      logger.warn(formatConfigErrorMessage(err));
    } else {
      throw err;
    }
  }
};

export default onBuildDone;
