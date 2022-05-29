import { getManifest } from '../get-manifest';

describe('test getManifest', () => {
  it('`purpose` from string to string', () => {
    const opts = {
      name: 'n',
      icons: [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: 'maskable any' }],
    };
    const manifest = getManifest(opts);
    const result = manifest.icons ? manifest.icons[0]?.purpose : '';
    expect(result).toBe('maskable any');
  });
  it('`add `iconOptions.purpose` to non empty purpose, unique result', () => {
    const opts = {
      name: 'n',
      iconOptions: {
        purpose: ['any', 'maskable', 'monochrome'],
      },
      icons: [{ src: 'a', sizes: '32x32', type: 'jpg', purpose: 'maskable badge' }],
    };
    const manifest = getManifest(opts);
    const result = manifest.icons ? manifest.icons[0]?.purpose : '';
    expect(result).toBe('any maskable monochrome badge');
  });
  it('add `iconOptions.purpose` to empty purpose', () => {
    const opts = {
      name: 'n',
      iconOptions: {
        purpose: ['any'],
      },
      icons: [{ src: 'a', sizes: '32x32', type: 'jpg' }],
    };
    const manifest = getManifest(opts);
    const result = manifest.icons ? manifest.icons[0]?.purpose : '';
    expect(result).toBe('any');
  });
});