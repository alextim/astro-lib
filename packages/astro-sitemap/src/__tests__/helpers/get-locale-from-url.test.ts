import { getLocaleFromUrl } from '../../helpers/get-locale-from-url';

const localeCodes = ['en', 'fr', 'es'];
const defaultLocale = 'en';
const base = 'http://example.com';

describe('test getLocaleFromUrl', () => {
  it('smoke, should throw', () => {
    expect(() => getLocaleFromUrl('', defaultLocale, localeCodes, base)).toThrow();
    expect(() => getLocaleFromUrl('a', '', localeCodes, base)).toThrow();
    expect(() => getLocaleFromUrl('a', defaultLocale, [], base)).toThrow();
    expect(() => getLocaleFromUrl('a', defaultLocale, [''], base)).toThrow();
    expect(() => getLocaleFromUrl('a', defaultLocale, localeCodes, '')).toThrow();
  });

  it('not our url, should be undefined', () => {
    expect(getLocaleFromUrl('http://dummy.com', defaultLocale, localeCodes, base)).toBeUndefined();
  });

  it('default root, should be defaultLocale', () => {
    expect(getLocaleFromUrl(base, defaultLocale, localeCodes, base)).toBe(defaultLocale);
  });
  it('default root/, should be defaultLocale', () => {
    expect(getLocaleFromUrl(base + '/', defaultLocale, localeCodes, base)).toBe(defaultLocale);
  });

  it('our url `/fr`, should be `fr`', () => {
    expect(getLocaleFromUrl(base + '/fr', defaultLocale, localeCodes, base)).toBe('fr');
  });
  it('our url `/fr/`, should be `fr`', () => {
    expect(getLocaleFromUrl(base + '/fr/', defaultLocale, localeCodes, base)).toBe('fr');
  });
  it('our url `/fr/abc`, should be `fr`', () => {
    expect(getLocaleFromUrl(base + '/fr/abc', defaultLocale, localeCodes, base)).toBe('fr');
  });
  it('our url `/fr/abc/`, should be `fr`', () => {
    expect(getLocaleFromUrl(base + '/fr/abc/', defaultLocale, localeCodes, base)).toBe('fr');
  });

  it('our url `/cn`, should be defaultLocale', () => {
    expect(getLocaleFromUrl(base + '/cn', defaultLocale, localeCodes, base)).toBe(defaultLocale);
  });
  it('our url `/cn/`, should be defaultLocale', () => {
    expect(getLocaleFromUrl(base + '/cn/', defaultLocale, localeCodes, base)).toBe(defaultLocale);
  });
  it('our url `/cn/abc`, should be defaultLocale', () => {
    expect(getLocaleFromUrl(base + '/cn/abc', defaultLocale, localeCodes, base)).toBe(defaultLocale);
  });
  it('our url `/cn/abc/`, should be defaultLocale', () => {
    expect(getLocaleFromUrl(base + '/cn/abc/', defaultLocale, localeCodes, base)).toBe(defaultLocale);
  });
});
