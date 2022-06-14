import type { WebmanifestOptions, Shortcut } from '../index';
import { validateOptions } from '../validate-options';
import { WEBMANIFEST_CONFIG_DEFAULTS } from '../config-defaults';

vi.mock('sharp', () => {
  return {
    default: vi.fn(
      () =>
        new (class {
          metadata() {
            return {
              width: 128,
              height: 128,
              format: 'png',
            };
          }
        })(),
    ),
  };
});

describe('test validateOptions', () => {
  // opts
  it('`opts` is undefined, should throw', () => {
    const opts = undefined;
    const fn = () => validateOptions(opts as unknown as WebmanifestOptions);
    expect(fn).toThrow();
  });
  it('`opts` is {}, should throw', () => {
    const opts = {};
    const fn = () => validateOptions(opts as unknown as WebmanifestOptions);
    expect(fn).toThrow();
  });

  // name
  it('`name` is required, should throw', () => {
    expect(() => validateOptions({ name: '' })).toThrow();
  });
  it('`name` is not empty, should not throw', () => {
    const opts = { name: 'name' };
    const fn = () => validateOptions(opts as unknown as WebmanifestOptions);
    expect(fn).not.toThrow();
    expect(fn()?.config).toEqual(WEBMANIFEST_CONFIG_DEFAULTS.config);
  });

  // short_name
  it('`short_name` is number, should throw', () => {
    const opts = { name: 'name', short_name: 33 };
    const fn = () => validateOptions(opts as unknown as WebmanifestOptions);
    expect(fn).toThrow();
  });
  it('`short_name` is empty, should not throw', () => {
    expect(() => validateOptions({ name: 'name', short_name: '' })).not.toThrow();
  });
  it('`short_name` is undefined, should not throw', () => {
    expect(() => validateOptions({ name: 'name', short_name: undefined })).not.toThrow();
  });
  it('`short_name` is not empty, should not throw', () => {
    expect(() => validateOptions({ name: 'name', short_name: 'sname' })).not.toThrow();
  });

  // description
  it('`description` is empty, should not throw', () => {
    expect(() => validateOptions({ name: 'name', description: '' })).not.toThrow();
  });
  it('`description` is undefined, should not throw', () => {
    expect(() => validateOptions({ name: 'name', description: undefined })).not.toThrow();
  });
  it('`description` is not empty, should not throw', () => {
    expect(() => validateOptions({ name: 'name', description: 'description' })).not.toThrow();
  });

  // categories
  it('`categories` is undefined, should not throw', () => {
    expect(() => validateOptions({ name: 'name', categories: undefined })).not.toThrow();
  });
  it('`categories` is empty arr, should not throw', () => {
    expect(() => validateOptions({ name: 'name', categories: [] })).not.toThrow();
  });
  it('`categories` is not empty arr, but one element is empty, should not throw', () => {
    expect(() => validateOptions({ name: 'name', categories: ['ok', ''] })).not.toThrow();
  });
  it('`categories` is not empty string arr, but one element is string number, should throw', () => {
    const opts = { name: 'name', categories: ['ok', 1] };
    expect(() => validateOptions(opts as WebmanifestOptions)).toThrow();
  });
  it('`categories` is not empty string arr, should not throw', () => {
    expect(() => validateOptions({ name: 'name', categories: ['ok1', 'ok2'] })).not.toThrow();
  });

  // lang
  it('`lang` is not empty, should not throw', () => {
    expect(() => validateOptions({ name: 'name', lang: 'en' })).not.toThrow();
  });
  it('`lang` is empty, should not throw', () => {
    expect(() => validateOptions({ name: 'name', lang: '' })).not.toThrow();
  });
  it('`lang` is undefined, should not throw', () => {
    expect(() => validateOptions({ name: 'name', lang: undefined })).not.toThrow();
  });
  it('`lang` is number, should throw ', () => {
    const opts = { name: 'name', lang: 1 };
    expect(() => validateOptions(opts as unknown as WebmanifestOptions)).toThrow();
  });

  // dir
  it('`dir` is undefined, should not throw', () => {
    expect(() => validateOptions({ name: 'name', dir: undefined })).not.toThrow();
  });
  it('`dir` is `auto`, should not throw', () => {
    expect(() => validateOptions({ name: 'name', dir: 'auto' })).not.toThrow();
  });
  it('`dir` is `abc`, should throw ', () => {
    const opts = { name: 'name', dir: 'abc' };
    expect(() => validateOptions(opts as unknown as WebmanifestOptions)).toThrow();
  });

  // start_url (URL)
  it('`start_url` is undefined, should not throw', () => {
    expect(() => validateOptions({ name: 'name', start_url: undefined })).not.toThrow();
  });
  it('`start_url` is "", should not throw', () => {
    expect(() => validateOptions({ name: 'name', start_url: '' })).not.toThrow();
  });
  it('`start_url` is `https://example.com`, should not throw', () => {
    expect(() => validateOptions({ name: 'name', start_url: 'https://example.com' })).not.toThrow();
  });
  it('`start_url` is `/`, should not throw', () => {
    expect(() => validateOptions({ name: 'name', start_url: '/' })).not.toThrow();
  });
  it('`start_url` is `abc`, should not throw', () => {
    expect(() => validateOptions({ name: 'name', start_url: 'abc' })).not.toThrow();
  });
  it('`start_url` is `1`, should throw', () => {
    expect(() => validateOptions({ name: 'name', start_url: '1' })).toThrow();
  });
  // scope (URL)
  it('`scope` is undefined, should not throw', () => {
    expect(() => validateOptions({ name: 'name', scope: undefined })).not.toThrow();
  });
  it('`scope` is "", should not throw', () => {
    expect(() => validateOptions({ name: 'name', scope: '' })).not.toThrow();
  });
  it('`scope` is `https://example.com`, should not throw', () => {
    expect(() => validateOptions({ name: 'name', scope: 'https://example.com' })).not.toThrow();
  });
  it('`scope` is `/`, should not throw', () => {
    expect(() => validateOptions({ name: 'name', scope: '/' })).not.toThrow();
  });
  it('`scope` is `abc`, should not throw', () => {
    expect(() => validateOptions({ name: 'name', scope: 'abc' })).not.toThrow();
  });
  it('`scope` is 1`, should throw', () => {
    expect(() => validateOptions({ name: 'name', scope: '1' })).toThrow();
  });

  /**
   * isString:
   *
   * iarc_rating_id
   * id
   * theme_color
   * background_color
   *
   */

  // display
  it('`display` is undefined, should not throw', () => {
    expect(() => validateOptions({ name: 'name', display: undefined })).not.toThrow();
  });
  it('`display` is `standalone`, should not throw', () => {
    expect(() => validateOptions({ name: 'name', display: 'standalone' })).not.toThrow();
  });
  it('`display` is `abc`, should throw ', () => {
    const opts = { name: 'name', display: 'abc' };
    expect(() => validateOptions(opts as unknown as WebmanifestOptions)).toThrow();
  });

  // display_override
  it('`display_override` is undefined, should not throw', () => {
    expect(() => validateOptions({ name: 'name', display_override: undefined })).not.toThrow();
  });
  it('`display_override` is [], should not throw', () => {
    expect(() => validateOptions({ name: 'name', display_override: [] })).not.toThrow();
  });
  it('`display_override` is [`standalone`], should not throw', () => {
    expect(() => validateOptions({ name: 'name', display_override: ['standalone'] })).not.toThrow();
  });
  it('`display_override` is [`standalone`, `abc`], should throw ', () => {
    const opts = { name: 'name', display_override: ['standalone', 'abc'] };
    expect(() => validateOptions(opts as unknown as WebmanifestOptions)).toThrow();
  });

  // orientation
  it('`orientation` is undefined, should not throw', () => {
    expect(() => validateOptions({ name: 'name', orientation: undefined })).not.toThrow();
  });
  it('`orientation` is `standalone`, should not throw', () => {
    expect(() => validateOptions({ name: 'name', orientation: 'portrait' })).not.toThrow();
  });
  it('`orientation` is `abc`, should not throw', () => {
    const opts = { name: 'name', orientation: 'abc' };
    expect(() => validateOptions(opts as unknown as WebmanifestOptions)).toThrow();
  });

  // protocol_handlers
  it('`protocol_handlers` is undefined, should not throw', () => {
    expect(() => validateOptions({ name: 'name', protocol_handlers: undefined })).not.toThrow();
  });
  it('`protocol_handlers` is [], should not throw', () => {
    expect(() => validateOptions({ name: 'name', protocol_handlers: [] })).not.toThrow();
  });
  it('`protocol_handlers` is [{url:`/`, protocol:`p`], should not throw', () => {
    expect(() => validateOptions({ name: 'name', protocol_handlers: [{ url: '/', protocol: 'p' }] })).not.toThrow();
  });
  it('`protocol_handlers` is [{url:`abc`, protocol:`p`], should not throw', () => {
    expect(() => validateOptions({ name: 'name', protocol_handlers: [{ url: 'abc', protocol: 'p' }] })).not.toThrow();
  });
  it('`protocol_handlers` is [{url:``, protocol:`p`], should throw', () => {
    expect(() => validateOptions({ name: 'name', protocol_handlers: [{ url: '', protocol: 'p' }] })).toThrow();
  });
  it('`protocol_handlers` is [{url:`https://example.com`, protocol:``], should throw', () => {
    expect(() => validateOptions({ name: 'name', protocol_handlers: [{ url: 'https://example.com', protocol: '' }] })).toThrow();
  });

  // related_applications
  it('`related_applications` is undefined, should not throw', () => {
    expect(() => validateOptions({ name: 'name', related_applications: undefined })).not.toThrow();
  });
  it('`related_applications` is [], should not throw', () => {
    expect(() => validateOptions({ name: 'name', related_applications: [] })).not.toThrow();
  });
  it("`related_applications` is [{id: 'id', url: 'https://example.com', platform: 'ios'}]], should not throw", () => {
    expect(() =>
      validateOptions({ name: 'name', related_applications: [{ id: 'id', url: 'https://example.com', platform: 'ios' }] }),
    ).not.toThrow();
  });
  it("`related_applications` is [{id: undefined, url: 'https://example.com', platform: 'ios'}]], should not throw", () => {
    expect(() =>
      validateOptions({ name: 'name', related_applications: [{ id: undefined, url: 'https://example.com', platform: 'ios' }] }),
    ).not.toThrow();
  });
  it("`related_applications` is [{id: '', url: 'https://example.com', platform: 'ios'}]], should not throw", () => {
    expect(() =>
      validateOptions({ name: 'name', related_applications: [{ id: '', url: 'https://example.com', platform: 'ios' }] }),
    ).not.toThrow();
  });
  it("`related_applications` is [{id: 'id', url: undefined, platform: 'ios'}]], should throw", () => {
    expect(() => validateOptions({ name: 'name', related_applications: [{ id: 'id', url: '', platform: 'ios' }] })).toThrow();
  });
  it("`related_applications` is [{id: 'id', url: '', platform: 'ios'}]], should throw", () => {
    expect(() => validateOptions({ name: 'name', related_applications: [{ id: 'id', url: '', platform: 'ios' }] })).toThrow();
  });
  it("`related_applications` is [{id: 'id', url: 'abc', platform: 'ios'}]], should throw", () => {
    expect(() => validateOptions({ name: 'name', related_applications: [{ id: 'id', url: 'abc', platform: 'ios' }] })).toThrow();
  });

  // screenshots
  it('`screenshots` is undefined, should not throw', () => {
    expect(() => validateOptions({ name: 'name', screenshots: undefined })).not.toThrow();
  });
  it('`screenshots` is [], should not throw', () => {
    expect(() => validateOptions({ name: 'name', screenshots: [] })).not.toThrow();
  });
  it("`screenshots` is [{ src: 'a', sizes: '32x32', type: 'jpg' }], should not throw", () => {
    expect(() => validateOptions({ name: 'name', screenshots: [{ src: 'a', sizes: '32x32', type: 'jpg' }] })).not.toThrow();
  });
  //src
  it("`screenshots` is [{ src: 'a' }], should not throw", () => {
    expect(() => validateOptions({ name: 'name', screenshots: [{ src: 'a' }] })).not.toThrow();
  });
  it("`screenshots` is [{ src: '' }], should throw", () => {
    expect(() => validateOptions({ name: 'name', screenshots: [{ src: '' }] })).toThrow();
  });
  it("`screenshots` is [{ src: 'a' }], should throw", () => {
    expect(() => validateOptions({ name: 'name', screenshots: [{ src: 'a', sizes: '100-200' }] })).toThrow();
  });
  // sizes
  it("`screenshots` is [{ src: 'a', sizes: 'a-200' }], should throw", () => {
    expect(() => validateOptions({ name: 'name', screenshots: [{ src: 'a', sizes: 'a-200' }] })).toThrow();
  });
  it("`screenshots` is [{ src: 'a', sizes: 'axb' }], should throw", () => {
    expect(() => validateOptions({ name: 'name', screenshots: [{ src: 'a', sizes: 'axb' }] })).toThrow();
  });
  it("`screenshots` is [{ src: 'a', sizes: '200' }], should throw", () => {
    expect(() => validateOptions({ name: 'name', screenshots: [{ src: 'a', sizes: '200' }] })).toThrow();
  });
  it("`screenshots` is [{ src: 'a', sizes: 200 }], should throw", () => {
    const opts = { name: 'name', screenshots: [{ src: 'a', sizes: 200 }] };
    expect(() => validateOptions(opts as unknown as WebmanifestOptions)).toThrow();
  });
  it("`screenshots` is [{ src: 'a', sizes: '100x200' }], should not throw", () => {
    expect(() => validateOptions({ name: 'name', screenshots: [{ src: 'a', sizes: '100x200' }] })).not.toThrow();
  });
  it("`screenshots` is [{ src: 'a', sizes: ' 100 x 200 ' }], should throw", () => {
    expect(() => validateOptions({ name: 'name', screenshots: [{ src: 'a', sizes: ' 100 x 200 ' }] })).toThrow();
  });
  it("`screenshots` is [{ src: 'a', sizes: '' }], should not throw", () => {
    expect(() => validateOptions({ name: 'name', screenshots: [{ src: 'a', sizes: '' }] })).not.toThrow();
  });
  // type
  it("`screenshots` is [{ src: 'a', type: '' }], should not throw", () => {
    expect(() => validateOptions({ name: 'name', screenshots: [{ src: 'a', type: '' }] })).not.toThrow();
  });
  it("`screenshots` is [{ src: 'a', type: undefined }], should not throw", () => {
    expect(() => validateOptions({ name: 'name', screenshots: [{ src: 'a', type: undefined }] })).not.toThrow();
  });

  // icons === screenshots + purpose
  it("`icons` is [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: 'maskable any'] }], should not throw", () => {
    expect(() =>
      validateOptions({ name: 'name', icons: [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: 'maskable any' }] }),
    ).not.toThrow();
  });
  it("`icons` is [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: '' }], should not throw", () => {
    expect(() => validateOptions({ name: 'name', icons: [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: '' }] })).not.toThrow();
  });
  it("`icons` is [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: undefined }], should not throw", () => {
    expect(() => validateOptions({ name: 'name', icons: [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: undefined }] })).not.toThrow();
  });
  it("`icons` is [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: 'aa' }], should throw", () => {
    expect(() => validateOptions({ name: 'name', icons: [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: 'aa' }] })).toThrow();
  });
  it("`icons` is [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: 1 }], should throw", () => {
    const opts = { name: 'name', icons: [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: 1 }] };
    expect(() => validateOptions(opts as unknown as WebmanifestOptions)).toThrow();
  });
  it("`icons` is [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: 'any '] }], should not throw", () => {
    expect(() => validateOptions({ name: 'name', icons: [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: 'any ' }] })).toThrow();
  });

  // shortcuts
  it('`shortcuts` is undefined, should not throw', () => {
    expect(() => validateOptions({ name: 'name', shortcuts: undefined })).not.toThrow();
  });
  it('`shortcuts` is [], should not throw', () => {
    expect(() => validateOptions({ name: 'name', shortcuts: [] })).not.toThrow();
  });
  it('`shortcuts` is complete, should not throw', () => {
    const shortcut: Shortcut = {
      name: 'n',
      short_name: 'sn',
      description: 'd',
      url: 'https://test',
      min_version: '1',
      fingerprints: [{ name: 'fpn', type: 'fpt' }],
      icons: [{ src: 'a', sizes: '32x32', type: 'jpg' }],
    };
    expect(() => validateOptions({ name: 'name', shortcuts: [shortcut] })).not.toThrow();
  });
  it('`shortcuts` has only name & url, should not throw', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: 'https://test',
    };
    expect(() => validateOptions({ name: 'name', shortcuts: [shortcut] })).not.toThrow();
  });
  it('`shortcuts` name is empty, should throw', () => {
    const shortcut: Shortcut = {
      name: '',
      url: 'https://test',
    };
    expect(() => validateOptions({ name: 'name', shortcuts: [shortcut] })).toThrow();
  });
  it('`shortcuts` url is empty, should throw', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: '',
    };
    expect(() => validateOptions({ name: 'name', shortcuts: [shortcut] })).toThrow();
  });
  it('`shortcuts` url is not valid, should not throw', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: 'abc',
    };
    expect(() => validateOptions({ name: 'name', shortcuts: [shortcut] })).not.toThrow();
  });
  // fingerprints
  it('`shortcuts` fingerprints name is empty, should throw', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: 'https://test',
      fingerprints: [{ name: '', type: 'fpt' }],
    };
    expect(() => validateOptions({ name: 'name', shortcuts: [shortcut] })).toThrow();
  });
  it('`shortcuts` fingerprints type is empty, should throw', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: 'https://test',
      fingerprints: [{ name: 'nn', type: '' }],
    };
    expect(() => validateOptions({ name: 'name', shortcuts: [shortcut] })).toThrow();
  });
  // icons
  it('`shortcuts` icons is empty arr, should not throw', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: 'https://test',
      icons: [],
    };
    expect(() => validateOptions({ name: 'name', shortcuts: [shortcut] })).not.toThrow();
  });
  it('`shortcuts` icons is completed, should not throw', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: 'https://test',
      icons: [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: 'maskable' }],
    };
    expect(() => validateOptions({ name: 'name', shortcuts: [shortcut] })).not.toThrow();
  });
  it('`shortcuts` icons has only src, should not throw', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: 'https://test',
      icons: [{ src: 'a' }],
    };
    expect(() => validateOptions({ name: 'name', shortcuts: [shortcut] })).not.toThrow();
  });
  it('`shortcuts` icons src is empty, should throw', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: 'https://test',
      icons: [{ src: '' }],
    };
    expect(() => validateOptions({ name: 'name', shortcuts: [shortcut] })).toThrow();
  });

  // iconOptions.purpose
  it('`iconOptions.purpose` is [], should not throw', () => {
    expect(() => validateOptions({ name: 'name', config: { iconPurpose: [] } })).not.toThrow();
  });
  it("`iconOptions.purpose` is ['any'], should not throw", () => {
    expect(() => validateOptions({ name: 'name', config: { iconPurpose: ['any'] } })).not.toThrow();
  });
  it("`iconOptions.purpose` is ['abc'], should throw", () => {
    const opts = { name: 'name', config: { iconPurpose: ['abc'] } };
    expect(() => validateOptions(opts as unknown as WebmanifestOptions)).toThrow();
  });
  it("`iconOptions.purpose` is 'abc', should throw", () => {
    const opts = { name: 'name', config: { iconPurpose: 'abc' } };
    expect(() => validateOptions(opts as unknown as WebmanifestOptions)).toThrow();
  });
  it('`iconOptions.purpose` is 1, should throw', () => {
    const opts = { name: 'name', config: { iconPurpose: 1 } };
    expect(() => validateOptions(opts as unknown as WebmanifestOptions)).toThrow();
  });

  // outfile
  it('`outfile` is `abc`, should not throw', () => {
    expect(() => validateOptions({ name: 'name', config: { outfile: 'abc' } })).not.toThrow();
  });
  it('`outfile` is `/abc`, should throw', () => {
    expect(() => validateOptions({ name: 'name', config: { outfile: '/abc' } })).toThrow();
  });
  it('`outfile` is ``, should throw', () => {
    expect(() => validateOptions({ name: 'name', config: { outfile: '' } })).toThrow();
  });

  // crossOrigin
  it('`crossOrigin` is `use-credentials`, should not throw', () => {
    expect(() => validateOptions({ name: 'name', config: { crossOrigin: 'use-credentials' } })).not.toThrow();
  });
  it('`crossOrigin` is ``, should not throw', () => {
    const opts = { name: 'name', config: { crossOrigin: '' } };
    expect(() => validateOptions(opts as unknown as WebmanifestOptions)).toThrow();
  });
  it('`crossOrigin` is undefined, should not throw', () => {
    const opts = { name: 'name', config: { crossOrigin: undefined } };
    expect(() => validateOptions(opts as unknown as WebmanifestOptions)).not.toThrow();
  });
  it('`crossOrigin` is `abc`, should throw', () => {
    const opts = { name: 'name', config: { crossOrigin: 'abc' } };
    expect(() => validateOptions(opts as unknown as WebmanifestOptions)).toThrow();
  });
  it('`crossOrigin` is 1, should throw', () => {
    const opts = { name: 'name', config: { crossOrigin: 1 } };
    expect(() => validateOptions(opts as unknown as WebmanifestOptions)).toThrow();
  });

  // locales
  it('`locales` is undefined, should not throw', () => {
    expect(() => validateOptions({ name: 'name', locales: undefined })).not.toThrow();
  });
  it('`locales` is empty, should not throw', () => {
    expect(() => validateOptions({ name: 'name', locales: {} })).not.toThrow();
  });
  it('`locales` is ok, should not throw', () => {
    expect(() => validateOptions({ name: 'name', locales: { fr: { name: 'fr' } } })).not.toThrow();
  });
  it('`locales` is not ok, should throw', () => {
    expect(() => validateOptions({ name: 'name', locales: { fr: { name: '' } } })).toThrow();
  });
});
