import { describe, it, expect } from 'vitest';

import { isObjectEmpty } from '../is-object-empty';

describe('test isObjectEmpty', () => {
  it('undefined, should return true', () => {
    expect(isObjectEmpty(undefined)).toBeTruthy();
  });
  it('null, should return true', () => {
    expect(isObjectEmpty(null)).toBeTruthy();
  });
  it('{}, should return true', () => {
    expect(isObjectEmpty({})).toBeTruthy();
  });
  it('"", should return true', () => {
    expect(isObjectEmpty('')).toBeTruthy();
  });
  it('0, should return true', () => {
    expect(isObjectEmpty(0)).toBeTruthy();
  });
  it('false, should return true', () => {
    expect(isObjectEmpty(false)).toBeTruthy();
  });
  it('[], should return true', () => {
    expect(isObjectEmpty([])).toBeTruthy();
  });
  it('[1], should return false', () => {
    expect(isObjectEmpty([1])).toBeFalsy();
  });
  it('{a:1}, should return false', () => {
    expect(isObjectEmpty({ a: 1 })).toBeFalsy();
  });
  it('"a", should return false', () => {
    expect(isObjectEmpty('a')).toBeFalsy();
  });
  it('1, should return false', () => {
    expect(isObjectEmpty(1)).toBeFalsy();
  });
  it('true, should return false', () => {
    expect(isObjectEmpty(true)).toBeFalsy();
  });
  it('new Date(), should return false', () => {
    expect(isObjectEmpty(new Date())).toBeFalsy();
  });
});
