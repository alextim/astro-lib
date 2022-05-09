import { isValidHttpUrl } from '../src/utils/isValidHttpUrl';

describe('test isValidHttpUrl', () => {
  it('undefined, should return false', () => {
    expect(isValidHttpUrl(undefined)).toBeFalsy();
  });
  it('"", should return false', () => {
    expect(isValidHttpUrl('')).toBeFalsy();
  });
  it('not url = 1, should return false', () => {
    expect(isValidHttpUrl(1)).toBeFalsy();
  });
  it('not url = abc, should return false', () => {
    expect(isValidHttpUrl('abc')).toBeFalsy();
  });
  it('file url, should return false', () => {
    expect(isValidHttpUrl('file://test.abc')).toBeFalsy();
  });
  it('ftp url, should return false', () => {
    expect(isValidHttpUrl('ftp://test.abc')).toBeFalsy();
  });
  it('http url, should return true', () => {
    expect(isValidHttpUrl('http://test.abc')).toBeTruthy();
  });
});
