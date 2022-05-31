import { isValidUrlEx } from '../is-valid-url-ex';

describe('test isValidUrlEx', () => {
  it('undefined, should return false', () => {
    expect(isValidUrlEx(undefined)).toBeFalsy();
  });
  it('"", should return false', () => {
    expect(isValidUrlEx('')).toBeFalsy();
  });
  it('url = 1, should return false', () => {
    expect(isValidUrlEx(1)).toBeFalsy();
  });
  it('url = 1, should return false', () => {
    expect(isValidUrlEx('1')).toBeFalsy();
  });
  it('file url, should return true', () => {
    expect(isValidUrlEx('file://test.abc')).toBeTruthy();
  });
  it('url = /, should return true', () => {
    expect(isValidUrlEx('/')).toBeTruthy();
  });
  it('url = abc, should return true', () => {
    expect(isValidUrlEx('abc')).toBeTruthy();
  });
  it('url = /abc, should return true', () => {
    expect(isValidUrlEx('/abc')).toBeTruthy();
  });
  it('url = /abc/, should return true', () => {
    expect(isValidUrlEx('/abc/')).toBeTruthy();
  });
  it('ftp url, should return true', () => {
    expect(isValidUrlEx('ftp://test.abc')).toBeTruthy();
  });
  it('http url, should return true', () => {
    expect(isValidUrlEx('http://test.abc')).toBeTruthy();
  });
});
