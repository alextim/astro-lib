import fs from 'node:fs';
import type { AstroConfig } from 'astro';
import { Logger } from '@/at-utils';
import type { WebmanifestOptions } from '../index';
import onBuildDone from '../on-build-done';

vi.mock('@/at-utils');
vi.mock('sharp', () => {
  return {
    default: vi.fn(
      () =>
        new (class {
          resize() {
            return this;
          }
          toFile() {
            return Promise.resolve({ format: 'png' });
          }
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

const logger = new Logger('dummy-astro-webmanifest');

const dir = new URL('file:/');
const config = {
  build: {
    format: 'directory',
  },
};

describe('onBuildDone', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const fn = vi.fn();
  fs.writeFileSync = fn;

  it("options = { name: 'test' }, should not throw", () => {
    const opts: WebmanifestOptions = { name: 'test' };
    expect(async () => await onBuildDone(opts, config as AstroConfig, dir, [], logger)).not.toThrow();
  });
  it("options = { name: 'test' }, should call success", async () => {
    const opts: WebmanifestOptions = { name: 'test' };
    await onBuildDone(opts, config as AstroConfig, dir, [], logger);
    expect(logger.success).toBeCalled();
  });

  it('options = {}, should match snapshot', async () => {
    const opts: WebmanifestOptions = { name: 'test' };
    await onBuildDone(opts, config as AstroConfig, dir, [], logger);

    expect(fn.mock.calls[0][1]).toMatchSnapshot();
    expect(logger.success).toBeCalled();
  });

  it('options is complete, should match snapshot', async () => {
    const opts: WebmanifestOptions = {
      name: 'name',
      short_name: 'short name',
      description: 'description',
      categories: ['cat0', 'cat1'],
      lang: 'en-US',
      dir: 'auto',
      iarc_rating_id: 'e84b072d-71b3-4d3e-86ae-31a8ce4e53b7',

      id: 'id',
      start_url: 'https://example.com',
      scope: '/',

      theme_color: '#00000',
      background_color: '#00001',

      display: 'minimal-ui',
      display_override: ['browser', 'fullscreen'],

      orientation: 'portrait-primary',

      protocol_handlers: [
        {
          protocol: 'web+jngl',
          url: '/lookup?type=%s',
        },
        {
          protocol: 'web+jnglstore',
          url: '/shop?for=%s',
        },
      ],

      prefer_related_applications: true,
      related_applications: [
        {
          platform: 'play',
          url: 'https://play.google.com/store/apps/details?id=com.example.app1',
          id: 'com.example.app1',
        },
        {
          platform: 'itunes',
          url: 'https://itunes.apple.com/app/example-app1/id123456789',
        },
      ],

      screenshots: [
        {
          src: 'screenshot1.webp',
          sizes: '1280x720',
          type: 'image/webp',
          platform: 'wide',
          label: 'Homescreen of Awesome App',
        },
        {
          src: 'screenshot2.webp',
          sizes: '1280x720',
          type: 'image/webp',
          platform: 'wide',
          label: 'List of Awesome Resources available in Awesome App',
        },
      ],

      icons: [
        {
          src: 'icon/lowres.webp',
          sizes: '48x48',
          type: 'image/webp',
        },
        {
          src: 'icon/lowres',
          sizes: '48x48',
        },
        {
          src: 'icon/hd_hi.ico',
          sizes: '72x72 96x96 128x128 256x256',
        },
        {
          src: 'icon/hd_hi.svg',
          sizes: 'any',
        },
      ],
      shortcuts: [
        {
          name: "Today's agenda",
          url: '/today',
          description: 'List of events planned for today',
        },
        {
          name: 'New event',
          url: '/create/event',
        },
        {
          name: 'New reminder',
          url: '/create/reminder',
        },
      ],

      locales: {
        fr: {
          name: 'nom',
          lang: 'fr-FR',
        },
        de: {
          name: 'namen',
          lang: 'de-DE',
        },
      },
    };

    await onBuildDone(opts, config as AstroConfig, dir, [], logger);

    expect(fs.writeFileSync).toBeCalledTimes(3);
    expect(logger.success).toBeCalledTimes(3);
    expect(fn.mock.calls[0][0].pathname).toBe('/manifest.webmanifest');
    expect(fn.mock.calls[1][0].pathname).toBe('/manifest-fr.webmanifest');
    expect(fn.mock.calls[2][0].pathname).toBe('/manifest-de.webmanifest');

    expect(fn.mock.calls[1][1]).toMatchSnapshot();
  });
});
