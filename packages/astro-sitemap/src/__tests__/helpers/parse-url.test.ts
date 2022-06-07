import { parseUrl } from '../../helpers/parse-url';

const localeCodes = ['en', 'fr', 'es'];
const defaultLocale = 'en';
const base = 'http://example.com';

describe('test parseUrl', () => {
  it('smoke, should throw', () => {
    expect(() => parseUrl('', defaultLocale, localeCodes, base)).toThrow();
    expect(() => parseUrl('a', '', localeCodes, base)).toThrow();
    expect(() => parseUrl('a', defaultLocale, [], base)).toThrow();
    expect(() => parseUrl('a', defaultLocale, [''], base)).toThrow();
    expect(() => parseUrl('a', defaultLocale, localeCodes, '')).toThrow();
  });

  it('not our url, should be undefined', () => {
    expect(parseUrl('http://dummy.com', defaultLocale, localeCodes, base)).toBeUndefined();
  });

  it('default root, should be defaultLocale', () => {
    const result = parseUrl(base, defaultLocale, localeCodes, base);
    expect(result?.locale).toBe(defaultLocale);
    expect(result?.path).toBe('/');
  });
  it('default root/, should be defaultLocale', () => {
    const result = parseUrl(base + '/', defaultLocale, localeCodes, base);
    expect(result?.locale).toBe(defaultLocale);
    expect(result?.path).toBe('/');
  });

  it('our url `/fr`, should be `fr`', () => {
    const result = parseUrl(base + '/fr', defaultLocale, localeCodes, base);
    expect(result?.locale).toBe('fr');
    expect(result?.path).toBe('/');
  });
  it('our url `/fr/`, should be `fr`', () => {
    const result = parseUrl(base + '/fr/', defaultLocale, localeCodes, base);
    expect(result?.locale).toBe('fr');
    expect(result?.path).toBe('/');
  });
  it('our url `/fr/abc`, should be `fr`', () => {
    const result = parseUrl(base + '/fr/abc', defaultLocale, localeCodes, base);
    expect(result?.locale).toBe('fr');
    expect(result?.path).toBe('/abc');
  });
  it('our url `/fr/abc/`, should be `fr`', () => {
    const result = parseUrl(base + '/fr/abc/', defaultLocale, localeCodes, base);
    expect(result?.locale).toBe('fr');
    expect(result?.path).toBe('/abc/');
  });

  it('our url `/cn`, should be defaultLocale', () => {
    const result = parseUrl(base + '/cn', defaultLocale, localeCodes, base);
    expect(result?.locale).toBe(defaultLocale);
    expect(result?.path).toBe('/cn');
  });
  it('our url `/cn/`, should be defaultLocale', () => {
    const result = parseUrl(base + '/cn/', defaultLocale, localeCodes, base);
    expect(result?.locale).toBe(defaultLocale);
    expect(result?.path).toBe('/cn/');
  });
  it('our url `/cn/abc`, should be defaultLocale', () => {
    const result = parseUrl(base + '/cn/abc', defaultLocale, localeCodes, base);
    expect(result?.locale).toBe(defaultLocale);
    expect(result?.path).toBe('/cn/abc');
  });
  it('our url `/cn/abc/`, should be defaultLocale', () => {
    const result = parseUrl(base + '/cn/abc/', defaultLocale, localeCodes, base);
    expect(result?.locale).toBe(defaultLocale);
    expect(result?.path).toBe('/cn/abc/');
  });
});
