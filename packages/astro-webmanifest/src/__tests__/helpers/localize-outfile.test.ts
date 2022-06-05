import localizeOutfile from '../../helpers/localize-outfile';

const outfile = 'site.webmanifest';

describe('test localizeOutfile', () => {
  it('`locale` is empty, should return `site.webmanifest`', async () => {
    expect(localizeOutfile(outfile, '')).toBe(outfile);
  });
  it('`locale` is fr, should return `site-fr.webmanifest`', async () => {
    expect(localizeOutfile(outfile, 'fr')).toBe('site-fr.webmanifest');
  });
});
