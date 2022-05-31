import { isValidUrl } from '../is-valid-url';

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
  it('url = /, should return false', () => {
    expect(isValidUrl('/')).toBeFalsy();
  });
  it('url = /abc, should return false', () => {
    expect(isValidUrl('/abc')).toBeFalsy();
  });
  it('url = /abc/, should return false', () => {
    expect(isValidUrl('/abc/')).toBeFalsy();
  });
  it('ftp url, should return true', () => {
    expect(isValidUrl('ftp://test.abc')).toBeTruthy();
  });
  it('http url, should return true', () => {
    expect(isValidUrl('http://test.abc')).toBeTruthy();
  });
});
