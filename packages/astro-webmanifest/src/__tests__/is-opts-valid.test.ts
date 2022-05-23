import { Logger } from '@at-utils';
import { type Shortcut } from '../index';

// import type { WebmanifestOptions } from '../index';
import { isOptsValid } from '../is-opts-valid';

const logger = new Logger('dummy-astro-webmanifest');
// name
describe('test isOptsValid', () => {
  it('`name` is required, should return false', () => {
    expect(isOptsValid({ name: '' }, logger)).toBeFalsy();
  });
  it('`name` is not empty, should return true', () => {
    expect(isOptsValid({ name: 'name' }, logger)).toBeTruthy();
  });

  // short_name
  it('`short_name` is empty, should return true', () => {
    expect(isOptsValid({ name: 'name', short_name: '' }, logger)).toBeTruthy();
  });
  it('`short_name` is undefined, should return true', () => {
    expect(isOptsValid({ name: 'name', short_name: undefined }, logger)).toBeTruthy();
  });
  it('`short_name` is not empty, should return true', () => {
    expect(isOptsValid({ name: 'name', short_name: 'sname' }, logger)).toBeTruthy();
  });

  // description
  it('`description` is empty, should return true', () => {
    expect(isOptsValid({ name: 'name', description: '' }, logger)).toBeTruthy();
  });
  it('`description` is undefined, should return true', () => {
    expect(isOptsValid({ name: 'name', description: undefined }, logger)).toBeTruthy();
  });
  it('`description` is not empty, should return true', () => {
    expect(isOptsValid({ name: 'name', description: 'description' }, logger)).toBeTruthy();
  });

  // categories
  it('`categories` is undefined, should return true', () => {
    expect(isOptsValid({ name: 'name', categories: undefined }, logger)).toBeTruthy();
  });
  it('`categories` is empty arr, should return true', () => {
    expect(isOptsValid({ name: 'name', categories: [] }, logger)).toBeTruthy();
  });
  it('`categories` is not empty arr, but one element is empty, should return true', () => {
    expect(isOptsValid({ name: 'name', categories: ['ok', ''] }, logger)).toBeTruthy();
  });
  it('`categories` is not empty string arr, but one element is string number, should return true', () => {
    expect(isOptsValid({ name: 'name', categories: ['ok', '1'] }, logger)).toBeTruthy();
  });
  it('`categories` is not empty string arr, should return true', () => {
    expect(isOptsValid({ name: 'name', categories: ['ok1', 'ok2'] }, logger)).toBeTruthy();
  });

  // lang
  it('`lang` is not empty, should return true', () => {
    expect(isOptsValid({ name: 'name', lang: 'en' }, logger)).toBeTruthy();
  });
  it('`lang` is empty, should return true', () => {
    expect(isOptsValid({ name: 'name', lang: '' }, logger)).toBeTruthy();
  });
  it('`lang` is undefined, should return true', () => {
    expect(isOptsValid({ name: 'name', lang: undefined }, logger)).toBeTruthy();
  });

  // dir
  it('`dir` is undefined, should return true', () => {
    expect(isOptsValid({ name: 'name', dir: undefined }, logger)).toBeTruthy();
  });
  it('`dir` is `auto`, should return true', () => {
    expect(isOptsValid({ name: 'name', dir: 'auto' }, logger)).toBeTruthy();
  });

  // start_url
  it('`start_url` is undefined, should return true', () => {
    expect(isOptsValid({ name: 'name', start_url: undefined }, logger)).toBeTruthy();
  });
  it('`start_url` is "", should return true', () => {
    expect(isOptsValid({ name: 'name', start_url: '' }, logger)).toBeTruthy();
  });
  it('`start_url` is `https://example.com`, should return true', () => {
    expect(isOptsValid({ name: 'name', start_url: 'https://example.com' }, logger)).toBeTruthy();
  });
  it('`start_url` is `abc`, should return false', () => {
    expect(isOptsValid({ name: 'name', start_url: 'abc' }, logger)).toBeFalsy();
  });

  /**
   * isString:
   *
   * iarc_rating_id
   * id
   * scope
   * theme_color
   * background_color
   *
   */

  // display
  it('`display` is undefined, should return true', () => {
    expect(isOptsValid({ name: 'name', display: undefined }, logger)).toBeTruthy();
  });
  it('`display` is `standalone`, should return true', () => {
    expect(isOptsValid({ name: 'name', display: 'standalone' }, logger)).toBeTruthy();
  });

  // display_override
  it('`display_override` is undefined, should return true', () => {
    expect(isOptsValid({ name: 'name', display_override: undefined }, logger)).toBeTruthy();
  });
  it('`display_override` is [], should return true', () => {
    expect(isOptsValid({ name: 'name', display_override: [] }, logger)).toBeTruthy();
  });
  it('`display_override` is [`standalone`], should return true', () => {
    expect(isOptsValid({ name: 'name', display_override: ['standalone'] }, logger)).toBeTruthy();
  });

  // orientation
  it('`orientation` is undefined, should return true', () => {
    expect(isOptsValid({ name: 'name', orientation: undefined }, logger)).toBeTruthy();
  });
  it('`orientation` is `standalone`, should return true', () => {
    expect(isOptsValid({ name: 'name', orientation: 'portrait' }, logger)).toBeTruthy();
  });

  // protocol_handlers
  it('`protocol_handlers` is undefined, should return true', () => {
    expect(isOptsValid({ name: 'name', protocol_handlers: undefined }, logger)).toBeTruthy();
  });
  it('`protocol_handlers` is [], should return true', () => {
    expect(isOptsValid({ name: 'name', protocol_handlers: [] }, logger)).toBeTruthy();
  });
  it('`protocol_handlers` is [{url:`https://example.com`, protocol:`p`], should return true', () => {
    expect(isOptsValid({ name: 'name', protocol_handlers: [{ url: 'https://example.com', protocol: 'p' }] }, logger)).toBeTruthy();
  });
  it('`protocol_handlers` is [{url:`abc`, protocol:`p`], should return false', () => {
    expect(isOptsValid({ name: 'name', protocol_handlers: [{ url: 'abc', protocol: 'p' }] }, logger)).toBeFalsy();
  });
  it('`protocol_handlers` is [{url:``, protocol:`p`], should return false', () => {
    expect(isOptsValid({ name: 'name', protocol_handlers: [{ url: '', protocol: 'p' }] }, logger)).toBeFalsy();
  });
  it('`protocol_handlers` is [{url:`https://example.com`, protocol:``], should return false', () => {
    expect(isOptsValid({ name: 'name', protocol_handlers: [{ url: 'https://example.com', protocol: '' }] }, logger)).toBeFalsy();
  });

  // related_applications
  it('`related_applications` is undefined, should return true', () => {
    expect(isOptsValid({ name: 'name', related_applications: undefined }, logger)).toBeTruthy();
  });
  it('`related_applications` is [], should return true', () => {
    expect(isOptsValid({ name: 'name', related_applications: [] }, logger)).toBeTruthy();
  });
  it("`related_applications` is [{id: 'id', url: 'https://example.com', platform: 'ios'}]], should return true", () => {
    expect(
      isOptsValid({ name: 'name', related_applications: [{ id: 'id', url: 'https://example.com', platform: 'ios' }] }, logger),
    ).toBeTruthy();
  });
  it("`related_applications` is [{id: '', url: 'https://example.com', platform: 'ios'}]], should return false", () => {
    expect(
      isOptsValid({ name: 'name', related_applications: [{ id: '', url: 'https://example.com', platform: 'ios' }] }, logger),
    ).toBeFalsy();
  });
  it("`related_applications` is [{id: 'id', url: undefined, platform: 'ios'}]], should return true", () => {
    expect(isOptsValid({ name: 'name', related_applications: [{ id: 'id', url: undefined, platform: 'ios' }] }, logger)).toBeTruthy();
  });
  it("`related_applications` is [{id: 'id', url: '', platform: 'ios'}]], should return true", () => {
    expect(isOptsValid({ name: 'name', related_applications: [{ id: 'id', url: '', platform: 'ios' }] }, logger)).toBeTruthy();
  });
  it("`related_applications` is [{id: 'id', url: 'abc', platform: 'ios'}]], should return false", () => {
    expect(isOptsValid({ name: 'name', related_applications: [{ id: 'id', url: 'abc', platform: 'ios' }] }, logger)).toBeFalsy();
  });

  // screenshots
  it('`screenshots` is undefined, should return true', () => {
    expect(isOptsValid({ name: 'name', screenshots: undefined }, logger)).toBeTruthy();
  });
  it('`screenshots` is [], should return true', () => {
    expect(isOptsValid({ name: 'name', screenshots: [] }, logger)).toBeTruthy();
  });
  it("`screenshots` is [{ src: 'a', sizes: '32x32', type: 'jpg' }], should return true", () => {
    expect(isOptsValid({ name: 'name', screenshots: [{ src: 'a', sizes: '32x32', type: 'jpg' }] }, logger)).toBeTruthy();
  });
  //src
  it("`screenshots` is [{ src: 'a' }], should return true", () => {
    expect(isOptsValid({ name: 'name', screenshots: [{ src: 'a' }] }, logger)).toBeTruthy();
  });
  it("`screenshots` is [{ src: '' }], should return false", () => {
    expect(isOptsValid({ name: 'name', screenshots: [{ src: '' }] }, logger)).toBeFalsy();
  });
  it("`screenshots` is [{ src: 'a' }], should return false", () => {
    expect(isOptsValid({ name: 'name', screenshots: [{ src: 'a', sizes: '100-200' }] }, logger)).toBeFalsy();
  });
  // sizes
  it("`screenshots` is [{ src: 'a', sizes: 'a-200' }], should return false", () => {
    expect(isOptsValid({ name: 'name', screenshots: [{ src: 'a', sizes: 'a-200' }] }, logger)).toBeFalsy();
  });
  it("`screenshots` is [{ src: 'a', sizes: 'axb' }], should return false", () => {
    expect(isOptsValid({ name: 'name', screenshots: [{ src: 'a', sizes: 'axb' }] }, logger)).toBeFalsy();
  });
  it("`screenshots` is [{ src: 'a', sizes: '200' }], should return false", () => {
    expect(isOptsValid({ name: 'name', screenshots: [{ src: 'a', sizes: '200' }] }, logger)).toBeFalsy();
  });
  it("`screenshots` is [{ src: 'a', sizes: '100x200' }], should return true", () => {
    expect(isOptsValid({ name: 'name', screenshots: [{ src: 'a', sizes: '100x200' }] }, logger)).toBeTruthy();
  });
  it("`screenshots` is [{ src: 'a', sizes: ' 100 x 200 ' }], should return true", () => {
    expect(isOptsValid({ name: 'name', screenshots: [{ src: 'a', sizes: ' 100 x 200 ' }] }, logger)).toBeTruthy();
  });
  it("`screenshots` is [{ src: 'a', sizes: '' }], should return true", () => {
    expect(isOptsValid({ name: 'name', screenshots: [{ src: 'a', sizes: '' }] }, logger)).toBeTruthy();
  });
  // type
  it("`screenshots` is [{ src: 'a', type: '' }], should return true", () => {
    expect(isOptsValid({ name: 'name', screenshots: [{ src: 'a', type: '' }] }, logger)).toBeTruthy();
  });
  it("`screenshots` is [{ src: 'a', type: undefined }], should return true", () => {
    expect(isOptsValid({ name: 'name', screenshots: [{ src: 'a', type: undefined }] }, logger)).toBeTruthy();
  });

  // icons === screenshots + purpose
  it("`icons` is [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: ['maskable', 'any'] }], should return true", () => {
    expect(
      isOptsValid({ name: 'name', icons: [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: ['maskable', 'any'] }] }, logger),
    ).toBeTruthy();
  });
  it("`icons` is [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: [] }], should return true", () => {
    expect(isOptsValid({ name: 'name', icons: [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: [] }] }, logger)).toBeTruthy();
  });
  it("`icons` is [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: undefined }], should return true", () => {
    expect(isOptsValid({ name: 'name', icons: [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: undefined }] }, logger)).toBeTruthy();
  });
  it("`icons` is [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: ['aa'] }], should return false", () => {
    expect(isOptsValid({ name: 'name', icons: [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: ['aa'] }] }, logger)).toBeFalsy();
  });
  it("`icons` is [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: ['any', ''] }], should return false", () => {
    expect(isOptsValid({ name: 'name', icons: [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: ['any', ''] }] }, logger)).toBeFalsy();
  });

  // shortcuts
  it('`shortcuts` is undefined, should return true', () => {
    expect(isOptsValid({ name: 'name', shortcuts: undefined }, logger)).toBeTruthy();
  });
  it('`shortcuts` is [], should return true', () => {
    expect(isOptsValid({ name: 'name', shortcuts: [] }, logger)).toBeTruthy();
  });
  it('`shortcuts` is complete, should return true', () => {
    const shortcut: Shortcut = {
      name: 'n',
      short_name: 'sn',
      description: 'd',
      url: 'https://test',
      min_version: '1',
      fingerprints: [{ name: 'fpn', type: 'fpt' }],
      icons: [{ src: 'a', sizes: '32x32', type: 'jpg' }],
    };
    expect(isOptsValid({ name: 'name', shortcuts: [shortcut] }, logger)).toBeTruthy();
  });
  it('`shortcuts` has only name & url, should return true', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: 'https://test',
    };
    expect(isOptsValid({ name: 'name', shortcuts: [shortcut] }, logger)).toBeTruthy();
  });
  it('`shortcuts` name is empty, should return false', () => {
    const shortcut: Shortcut = {
      name: '',
      url: 'https://test',
    };
    expect(isOptsValid({ name: 'name', shortcuts: [shortcut] }, logger)).toBeFalsy();
  });
  it('`shortcuts` url is empty, should return false', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: '',
    };
    expect(isOptsValid({ name: 'name', shortcuts: [shortcut] }, logger)).toBeFalsy();
  });
  it('`shortcuts` url is not valid, should return false', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: 'abc',
    };
    expect(isOptsValid({ name: 'name', shortcuts: [shortcut] }, logger)).toBeFalsy();
  });
  // fingerprints
  it('`shortcuts` fingerprints name is empty, should return false', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: 'https://test',
      fingerprints: [{ name: '', type: 'fpt' }],
    };
    expect(isOptsValid({ name: 'name', shortcuts: [shortcut] }, logger)).toBeFalsy();
  });
  it('`shortcuts` fingerprints type is empty, should return false', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: 'https://test',
      fingerprints: [{ name: 'nn', type: '' }],
    };
    expect(isOptsValid({ name: 'name', shortcuts: [shortcut] }, logger)).toBeFalsy();
  });
  // icons
  it('`shortcuts` icons is empty arr, should return true', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: 'https://test',
      icons: [],
    };
    expect(isOptsValid({ name: 'name', shortcuts: [shortcut] }, logger)).toBeTruthy();
  });
  it('`shortcuts` icons is completed, should return true', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: 'https://test',
      icons: [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: ['maskable'] }],
    };
    expect(isOptsValid({ name: 'name', shortcuts: [shortcut] }, logger)).toBeTruthy();
  });
  it('`shortcuts` icons has only src, should return true', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: 'https://test',
      icons: [{ src: 'a' }],
    };
    expect(isOptsValid({ name: 'name', shortcuts: [shortcut] }, logger)).toBeTruthy();
  });
  it('`shortcuts` icons src is empty, should return false', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: 'https://test',
      icons: [{ src: '' }],
    };
    expect(isOptsValid({ name: 'name', shortcuts: [shortcut] }, logger)).toBeFalsy();
  });

  // iconOptions.purpose
  it('`iconOptions.purpose` is [], should return true', () => {
    expect(isOptsValid({ name: 'name', iconOptions: { purpose: [] } }, logger)).toBeTruthy();
  });
  it('`iconOptions.purpose` is [], should return true', () => {
    expect(isOptsValid({ name: 'name', iconOptions: { purpose: [] } }, logger)).toBeTruthy();
  });
  it("`iconOptions.purpose` is ['any'], should return true", () => {
    expect(isOptsValid({ name: 'name', iconOptions: { purpose: ['any'] } }, logger)).toBeTruthy();
  });
  it("`iconOptions.purpose` is [''], should return false", () => {
    expect(isOptsValid({ name: 'name', iconOptions: { purpose: [''] } }, logger)).toBeFalsy();
  });
  it("`iconOptions.purpose` is ['ab'], should return false", () => {
    expect(isOptsValid({ name: 'name', iconOptions: { purpose: ['ab'] } }, logger)).toBeFalsy();
  });

  // outfile
  it('`outfile` is `abc`, should return true', () => {
    expect(isOptsValid({ name: 'name', outfile: 'abc' }, logger)).toBeTruthy();
  });
  it('`outfile` is `/abc`, should return false', () => {
    expect(isOptsValid({ name: 'name', outfile: '/abc' }, logger)).toBeFalsy();
  });
});
