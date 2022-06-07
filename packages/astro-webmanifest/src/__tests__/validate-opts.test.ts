import { WebmanifestOptions, type Shortcut } from '../index';

// import type { WebmanifestOptions } from '../index';
import { validateOpts } from '../validate-opts';

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

// name
describe('test validateOpts', () => {
  it('`name` is required, should throw', () => {
    expect(() => validateOpts({ name: '' })).toThrowError();
  });
  it('`name` is not empty, should not throw', () => {
    expect(() => validateOpts({ name: 'name' })).not.toThrowError();
  });

  // short_name
  it('`short_name` is empty, should not throw', () => {
    expect(() => validateOpts({ name: 'name', short_name: '' })).not.toThrowError();
  });
  it('`short_name` is undefined, should not throw', () => {
    expect(() => validateOpts({ name: 'name', short_name: undefined })).not.toThrowError();
  });
  it('`short_name` is not empty, should not throw', () => {
    expect(() => validateOpts({ name: 'name', short_name: 'sname' })).not.toThrowError();
  });

  // description
  it('`description` is empty, should not throw', () => {
    expect(() => validateOpts({ name: 'name', description: '' })).not.toThrowError();
  });
  it('`description` is undefined, should not throw', () => {
    expect(() => validateOpts({ name: 'name', description: undefined })).not.toThrowError();
  });
  it('`description` is not empty, should not throw', () => {
    expect(() => validateOpts({ name: 'name', description: 'description' })).not.toThrowError();
  });

  // categories
  it('`categories` is undefined, should not throw', () => {
    expect(() => validateOpts({ name: 'name', categories: undefined })).not.toThrowError();
  });
  it('`categories` is empty arr, should not throw', () => {
    expect(() => validateOpts({ name: 'name', categories: [] })).not.toThrowError();
  });
  it('`categories` is not empty arr, but one element is empty, should not throw', () => {
    expect(() => validateOpts({ name: 'name', categories: ['ok', ''] })).not.toThrowError();
  });
  it('`categories` is not empty string arr, but one element is string number, should throw', () => {
    const opts = { name: 'name', categories: ['ok', 1] };
    expect(() => validateOpts(opts as WebmanifestOptions)).toThrowError();
  });
  it('`categories` is not empty string arr, should not throw', () => {
    expect(() => validateOpts({ name: 'name', categories: ['ok1', 'ok2'] })).not.toThrowError();
  });

  // lang
  it('`lang` is not empty, should not throw', () => {
    expect(() => validateOpts({ name: 'name', lang: 'en' })).not.toThrowError();
  });
  it('`lang` is empty, should not throw', () => {
    expect(() => validateOpts({ name: 'name', lang: '' })).not.toThrowError();
  });
  it('`lang` is undefined, should not throw', () => {
    expect(() => validateOpts({ name: 'name', lang: undefined })).not.toThrowError();
  });
  it('`lang` is number, should throw ', () => {
    const opts = { name: 'name', lang: 1 };
    expect(() => validateOpts(opts as unknown as WebmanifestOptions)).toThrowError();
  });

  // dir
  it('`dir` is undefined, should not throw', () => {
    expect(() => validateOpts({ name: 'name', dir: undefined })).not.toThrowError();
  });
  it('`dir` is `auto`, should not throw', () => {
    expect(() => validateOpts({ name: 'name', dir: 'auto' })).not.toThrowError();
  });
  it('`dir` is `abc`, should throw ', () => {
    const opts = { name: 'name', dir: 'abc' };
    expect(() => validateOpts(opts as unknown as WebmanifestOptions)).toThrowError();
  });

  // start_url (URL)
  it('`start_url` is undefined, should not throw', () => {
    expect(() => validateOpts({ name: 'name', start_url: undefined })).not.toThrowError();
  });
  it('`start_url` is "", should not throw', () => {
    expect(() => validateOpts({ name: 'name', start_url: '' })).not.toThrowError();
  });
  it('`start_url` is `https://example.com`, should not throw', () => {
    expect(() => validateOpts({ name: 'name', start_url: 'https://example.com' })).not.toThrowError();
  });
  it('`start_url` is `/`, should not throw', () => {
    expect(() => validateOpts({ name: 'name', start_url: '/' })).not.toThrowError();
  });
  it('`start_url` is `abc`, should not throw', () => {
    expect(() => validateOpts({ name: 'name', start_url: 'abc' })).not.toThrowError();
  });
  it('`start_url` is `1`, should throw', () => {
    expect(() => validateOpts({ name: 'name', start_url: '1' })).toThrowError();
  });
  // scope (URL)
  it('`scope` is undefined, should not throw', () => {
    expect(() => validateOpts({ name: 'name', scope: undefined })).not.toThrowError();
  });
  it('`scope` is "", should not throw', () => {
    expect(() => validateOpts({ name: 'name', scope: '' })).not.toThrowError();
  });
  it('`scope` is `https://example.com`, should not throw', () => {
    expect(() => validateOpts({ name: 'name', scope: 'https://example.com' })).not.toThrowError();
  });
  it('`scope` is `/`, should not throw', () => {
    expect(() => validateOpts({ name: 'name', scope: '/' })).not.toThrowError();
  });
  it('`scope` is `abc`, should not throw', () => {
    expect(() => validateOpts({ name: 'name', scope: 'abc' })).not.toThrowError();
  });
  it('`scope` is 1`, should throw', () => {
    expect(() => validateOpts({ name: 'name', scope: '1' })).toThrowError();
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
    expect(() => validateOpts({ name: 'name', display: undefined })).not.toThrowError();
  });
  it('`display` is `standalone`, should not throw', () => {
    expect(() => validateOpts({ name: 'name', display: 'standalone' })).not.toThrowError();
  });
  it('`display` is `abc`, should throw ', () => {
    const opts = { name: 'name', display: 'abc' };
    expect(() => validateOpts(opts as unknown as WebmanifestOptions)).toThrowError();
  });

  // display_override
  it('`display_override` is undefined, should not throw', () => {
    expect(() => validateOpts({ name: 'name', display_override: undefined })).not.toThrowError();
  });
  it('`display_override` is [], should not throw', () => {
    expect(() => validateOpts({ name: 'name', display_override: [] })).not.toThrowError();
  });
  it('`display_override` is [`standalone`], should not throw', () => {
    expect(() => validateOpts({ name: 'name', display_override: ['standalone'] })).not.toThrowError();
  });
  it('`display_override` is [`standalone`, `abc`], should throw ', () => {
    const opts = { name: 'name', display_override: ['standalone', 'abc'] };
    expect(() => validateOpts(opts as unknown as WebmanifestOptions)).toThrowError();
  });

  // orientation
  it('`orientation` is undefined, should not throw', () => {
    expect(() => validateOpts({ name: 'name', orientation: undefined })).not.toThrowError();
  });
  it('`orientation` is `standalone`, should not throw', () => {
    expect(() => validateOpts({ name: 'name', orientation: 'portrait' })).not.toThrowError();
  });
  it('`orientation` is `abc`, should not throw', () => {
    const opts = { name: 'name', orientation: 'abc' };
    expect(() => validateOpts(opts as unknown as WebmanifestOptions)).toThrowError();
  });

  // protocol_handlers
  it('`protocol_handlers` is undefined, should not throw', () => {
    expect(() => validateOpts({ name: 'name', protocol_handlers: undefined })).not.toThrowError();
  });
  it('`protocol_handlers` is [], should not throw', () => {
    expect(() => validateOpts({ name: 'name', protocol_handlers: [] })).not.toThrowError();
  });
  it('`protocol_handlers` is [{url:`/`, protocol:`p`], should not throw', () => {
    expect(() => validateOpts({ name: 'name', protocol_handlers: [{ url: '/', protocol: 'p' }] })).not.toThrowError();
  });
  it('`protocol_handlers` is [{url:`abc`, protocol:`p`], should not throw', () => {
    expect(() => validateOpts({ name: 'name', protocol_handlers: [{ url: 'abc', protocol: 'p' }] })).not.toThrowError();
  });
  it('`protocol_handlers` is [{url:``, protocol:`p`], should throw', () => {
    expect(() => validateOpts({ name: 'name', protocol_handlers: [{ url: '', protocol: 'p' }] })).toThrowError();
  });
  it('`protocol_handlers` is [{url:`https://example.com`, protocol:``], should throw', () => {
    expect(() => validateOpts({ name: 'name', protocol_handlers: [{ url: 'https://example.com', protocol: '' }] })).toThrowError();
  });

  // related_applications
  it('`related_applications` is undefined, should not throw', () => {
    expect(() => validateOpts({ name: 'name', related_applications: undefined })).not.toThrowError();
  });
  it('`related_applications` is [], should not throw', () => {
    expect(() => validateOpts({ name: 'name', related_applications: [] })).not.toThrowError();
  });
  it("`related_applications` is [{id: 'id', url: 'https://example.com', platform: 'ios'}]], should not throw", () => {
    expect(() =>
      validateOpts({ name: 'name', related_applications: [{ id: 'id', url: 'https://example.com', platform: 'ios' }] }),
    ).not.toThrowError();
  });
  it("`related_applications` is [{id: undefined, url: 'https://example.com', platform: 'ios'}]], should not throw", () => {
    expect(() =>
      validateOpts({ name: 'name', related_applications: [{ id: undefined, url: 'https://example.com', platform: 'ios' }] }),
    ).not.toThrowError();
  });
  it("`related_applications` is [{id: '', url: 'https://example.com', platform: 'ios'}]], should not throw", () => {
    expect(() =>
      validateOpts({ name: 'name', related_applications: [{ id: '', url: 'https://example.com', platform: 'ios' }] }),
    ).not.toThrowError();
  });
  it("`related_applications` is [{id: 'id', url: undefined, platform: 'ios'}]], should throw", () => {
    expect(() => validateOpts({ name: 'name', related_applications: [{ id: 'id', url: '', platform: 'ios' }] })).toThrowError();
  });
  it("`related_applications` is [{id: 'id', url: '', platform: 'ios'}]], should throw", () => {
    expect(() => validateOpts({ name: 'name', related_applications: [{ id: 'id', url: '', platform: 'ios' }] })).toThrowError();
  });
  it("`related_applications` is [{id: 'id', url: 'abc', platform: 'ios'}]], should throw", () => {
    expect(() => validateOpts({ name: 'name', related_applications: [{ id: 'id', url: 'abc', platform: 'ios' }] })).toThrowError();
  });

  // screenshots
  it('`screenshots` is undefined, should not throw', () => {
    expect(() => validateOpts({ name: 'name', screenshots: undefined })).not.toThrowError();
  });
  it('`screenshots` is [], should not throw', () => {
    expect(() => validateOpts({ name: 'name', screenshots: [] })).not.toThrowError();
  });
  it("`screenshots` is [{ src: 'a', sizes: '32x32', type: 'jpg' }], should not throw", () => {
    expect(() => validateOpts({ name: 'name', screenshots: [{ src: 'a', sizes: '32x32', type: 'jpg' }] })).not.toThrowError();
  });
  //src
  it("`screenshots` is [{ src: 'a' }], should not throw", () => {
    expect(() => validateOpts({ name: 'name', screenshots: [{ src: 'a' }] })).not.toThrowError();
  });
  it("`screenshots` is [{ src: '' }], should throw", () => {
    expect(() => validateOpts({ name: 'name', screenshots: [{ src: '' }] })).toThrowError();
  });
  it("`screenshots` is [{ src: 'a' }], should throw", () => {
    expect(() => validateOpts({ name: 'name', screenshots: [{ src: 'a', sizes: '100-200' }] })).toThrowError();
  });
  // sizes
  it("`screenshots` is [{ src: 'a', sizes: 'a-200' }], should throw", () => {
    expect(() => validateOpts({ name: 'name', screenshots: [{ src: 'a', sizes: 'a-200' }] })).toThrowError();
  });
  it("`screenshots` is [{ src: 'a', sizes: 'axb' }], should throw", () => {
    expect(() => validateOpts({ name: 'name', screenshots: [{ src: 'a', sizes: 'axb' }] })).toThrowError();
  });
  it("`screenshots` is [{ src: 'a', sizes: '200' }], should throw", () => {
    expect(() => validateOpts({ name: 'name', screenshots: [{ src: 'a', sizes: '200' }] })).toThrowError();
  });
  it("`screenshots` is [{ src: 'a', sizes: 200 }], should throw", () => {
    const opts = { name: 'name', screenshots: [{ src: 'a', sizes: 200 }] };
    expect(() => validateOpts(opts as unknown as WebmanifestOptions)).toThrowError();
  });
  it("`screenshots` is [{ src: 'a', sizes: '100x200' }], should not throw", () => {
    expect(() => validateOpts({ name: 'name', screenshots: [{ src: 'a', sizes: '100x200' }] })).not.toThrowError();
  });
  it("`screenshots` is [{ src: 'a', sizes: ' 100 x 200 ' }], should throw", () => {
    expect(() => validateOpts({ name: 'name', screenshots: [{ src: 'a', sizes: ' 100 x 200 ' }] })).toThrowError();
  });
  it("`screenshots` is [{ src: 'a', sizes: '' }], should not throw", () => {
    expect(() => validateOpts({ name: 'name', screenshots: [{ src: 'a', sizes: '' }] })).not.toThrowError();
  });
  // type
  it("`screenshots` is [{ src: 'a', type: '' }], should not throw", () => {
    expect(() => validateOpts({ name: 'name', screenshots: [{ src: 'a', type: '' }] })).not.toThrowError();
  });
  it("`screenshots` is [{ src: 'a', type: undefined }], should not throw", () => {
    expect(() => validateOpts({ name: 'name', screenshots: [{ src: 'a', type: undefined }] })).not.toThrowError();
  });

  // icons === screenshots + purpose
  it("`icons` is [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: 'maskable any'] }], should not throw", () => {
    expect(() =>
      validateOpts({ name: 'name', icons: [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: 'maskable any' }] }),
    ).not.toThrowError();
  });
  it("`icons` is [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: '' }], should not throw", () => {
    expect(() => validateOpts({ name: 'name', icons: [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: '' }] })).not.toThrowError();
  });
  it("`icons` is [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: undefined }], should not throw", () => {
    expect(() => validateOpts({ name: 'name', icons: [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: undefined }] })).not.toThrowError();
  });
  it("`icons` is [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: 'aa' }], should throw", () => {
    expect(() => validateOpts({ name: 'name', icons: [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: 'aa' }] })).toThrowError();
  });
  it("`icons` is [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: 1 }], should throw", () => {
    const opts = { name: 'name', icons: [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: 1 }] };
    expect(() => validateOpts(opts as unknown as WebmanifestOptions)).toThrowError();
  });
  it("`icons` is [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: 'any '] }], should not throw", () => {
    expect(() => validateOpts({ name: 'name', icons: [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: 'any ' }] })).toThrowError();
  });

  // shortcuts
  it('`shortcuts` is undefined, should not throw', () => {
    expect(() => validateOpts({ name: 'name', shortcuts: undefined })).not.toThrowError();
  });
  it('`shortcuts` is [], should not throw', () => {
    expect(() => validateOpts({ name: 'name', shortcuts: [] })).not.toThrowError();
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
    expect(() => validateOpts({ name: 'name', shortcuts: [shortcut] })).not.toThrowError();
  });
  it('`shortcuts` has only name & url, should not throw', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: 'https://test',
    };
    expect(() => validateOpts({ name: 'name', shortcuts: [shortcut] })).not.toThrowError();
  });
  it('`shortcuts` name is empty, should throw', () => {
    const shortcut: Shortcut = {
      name: '',
      url: 'https://test',
    };
    expect(() => validateOpts({ name: 'name', shortcuts: [shortcut] })).toThrowError();
  });
  it('`shortcuts` url is empty, should throw', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: '',
    };
    expect(() => validateOpts({ name: 'name', shortcuts: [shortcut] })).toThrowError();
  });
  it('`shortcuts` url is not valid, should not throw', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: 'abc',
    };
    expect(() => validateOpts({ name: 'name', shortcuts: [shortcut] })).not.toThrowError();
  });
  // fingerprints
  it('`shortcuts` fingerprints name is empty, should throw', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: 'https://test',
      fingerprints: [{ name: '', type: 'fpt' }],
    };
    expect(() => validateOpts({ name: 'name', shortcuts: [shortcut] })).toThrowError();
  });
  it('`shortcuts` fingerprints type is empty, should throw', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: 'https://test',
      fingerprints: [{ name: 'nn', type: '' }],
    };
    expect(() => validateOpts({ name: 'name', shortcuts: [shortcut] })).toThrowError();
  });
  // icons
  it('`shortcuts` icons is empty arr, should not throw', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: 'https://test',
      icons: [],
    };
    expect(() => validateOpts({ name: 'name', shortcuts: [shortcut] })).not.toThrowError();
  });
  it('`shortcuts` icons is completed, should not throw', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: 'https://test',
      icons: [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: 'maskable' }],
    };
    expect(() => validateOpts({ name: 'name', shortcuts: [shortcut] })).not.toThrowError();
  });
  it('`shortcuts` icons has only src, should not throw', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: 'https://test',
      icons: [{ src: 'a' }],
    };
    expect(() => validateOpts({ name: 'name', shortcuts: [shortcut] })).not.toThrowError();
  });
  it('`shortcuts` icons src is empty, should throw', () => {
    const shortcut: Shortcut = {
      name: 'n',
      url: 'https://test',
      icons: [{ src: '' }],
    };
    expect(() => validateOpts({ name: 'name', shortcuts: [shortcut] })).toThrowError();
  });

  // iconOptions.purpose
  it('`iconOptions.purpose` is [], should not throw', () => {
    expect(() => validateOpts({ name: 'name', config: { iconPurpose: [] } })).not.toThrowError();
  });
  it("`iconOptions.purpose` is ['any'], should not throw", () => {
    expect(() => validateOpts({ name: 'name', config: { iconPurpose: ['any'] } })).not.toThrowError();
  });
  it("`iconOptions.purpose` is ['abc'], should throw", () => {
    const opts = { name: 'name', config: { iconPurpose: ['abc'] } };
    expect(() => validateOpts(opts as unknown as WebmanifestOptions)).toThrowError();
  });
  it("`iconOptions.purpose` is 'abc', should throw", () => {
    const opts = { name: 'name', config: { iconPurpose: 'abc' } };
    expect(() => validateOpts(opts as unknown as WebmanifestOptions)).toThrowError();
  });
  it('`iconOptions.purpose` is 1, should throw', () => {
    const opts = { name: 'name', config: { iconPurpose: 1 } };
    expect(() => validateOpts(opts as unknown as WebmanifestOptions)).toThrowError();
  });

  // outfile
  it('`outfile` is `abc`, should not throw', () => {
    expect(() => validateOpts({ name: 'name', config: { outfile: 'abc' } })).not.toThrowError();
  });
  it('`outfile` is `/abc`, should throw', () => {
    expect(() => validateOpts({ name: 'name', config: { outfile: '/abc' } })).toThrowError();
  });
  it('`outfile` is ``, should throw', () => {
    expect(() => validateOpts({ name: 'name', config: { outfile: '' } })).toThrowError();
  });

  // crossOrigin
  it('`crossOrigin` is `use-credentials`, should not throw', () => {
    expect(() => validateOpts({ name: 'name', config: { crossOrigin: 'use-credentials' } })).not.toThrowError();
  });
  it('`crossOrigin` is ``, should not throw', () => {
    const opts = { name: 'name', config: { crossOrigin: '' } };
    expect(() => validateOpts(opts as unknown as WebmanifestOptions)).toThrowError();
  });
  it('`crossOrigin` is undefined, should not throw', () => {
    const opts = { name: 'name', config: { crossOrigin: undefined } };
    expect(() => validateOpts(opts as unknown as WebmanifestOptions)).not.toThrowError();
  });
  it('`crossOrigin` is `abc`, should throw', () => {
    const opts = { name: 'name', config: { crossOrigin: 'abc' } };
    expect(() => validateOpts(opts as unknown as WebmanifestOptions)).toThrowError();
  });
  it('`crossOrigin` is 1, should throw', () => {
    const opts = { name: 'name', config: { crossOrigin: 1 } };
    expect(() => validateOpts(opts as unknown as WebmanifestOptions)).toThrowError();
  });

  // locales
  it('`locales` is undefined, should not throw', () => {
    expect(() => validateOpts({ name: 'name', locales: undefined })).not.toThrowError();
  });
  it('`locales` is empty, should not throw', () => {
    expect(() => validateOpts({ name: 'name', locales: {} })).not.toThrowError();
  });
  it('`locales` is ok, should not throw', () => {
    expect(() => validateOpts({ name: 'name', locales: { fr: { name: 'fr' } } })).not.toThrowError();
  });
  it('`locales` is not ok, should throw', () => {
    expect(() => validateOpts({ name: 'name', locales: { fr: { name: '' } } })).toThrowError();
  });
});
