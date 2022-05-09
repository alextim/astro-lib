import { isValidUrl } from '../src/utils/isValidUrl';

describe('test isValidUrl', () => {
  it('undefined, should return false', () => {
    expect(isValidUrl(undefined)).toBeFalsy();
  });
  it('"", should return false', () => {
    expect(isValidUrl('')).toBeFalsy();
  });
  it('not url = 1, should return false', () => {
    expect(isValidUrl(1)).toBeFalsy();
  });
  it('not url = abc, should return false', () => {
    expect(isValidUrl('abc')).toBeFalsy();
  });
  it('file url, should return true', () => {
    expect(isValidUrl('file://test.abc')).toBeTruthy();
  });
  it('ftp url, should return true', () => {
    expect(isValidUrl('ftp://test.abc')).toBeTruthy();
  });
  it('http url, should return true', () => {
    expect(isValidUrl('http://test.abc')).toBeTruthy();
  });
});
