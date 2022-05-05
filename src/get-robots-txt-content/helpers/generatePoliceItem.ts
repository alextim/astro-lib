import type { PolicyItem } from '../../index';
import addLine from './addLine';

const generatePoliceItem = (item: PolicyItem, index: number) => {
  let contents = '';

  if (index !== 0) {
    contents += '\n';
  }

  contents += addLine('User-agent', item.userAgent);

  if (typeof item.disallow === 'string' || Array.isArray(item.disallow)) {
    contents += addLine('Disallow', item.disallow);
  }

  if (item.allow) {
    contents += addLine('Allow', item.allow);
  }

  if (item.crawlDelay) {
    contents += addLine('Crawl-delay', item.crawlDelay);
  }

  // Move from policy for next master version
  // https://yandex.ru/support/webmaster/controlling-robot/robots-txt.html
  if (item.cleanParam && item.cleanParam.length > 0) {
    contents += addLine('Clean-param', item.cleanParam);
  }

  return contents;
};

export default generatePoliceItem;
