import { describe, it, expect } from 'vitest';

import isValidSize from '../../helpers/is-valid-size';

describe('test isValidSize', () => {
  it('empty, should return true', () => {
    expect(isValidSize(undefined)).toBeTruthy();
    expect(isValidSize('')).toBeTruthy();
  });
  it('any, should return true', () => {
    expect(isValidSize('any')).toBeTruthy();
  });
  it('11x22, should return true', () => {
    expect(isValidSize('11x22')).toBeTruthy();
  });
  it('11x22 33x44, should return true', () => {
    expect(isValidSize('11x22 33x44')).toBeTruthy();
  });
  it('11X22, should return true', () => {
    expect(isValidSize('11X22')).toBeTruthy();
  });
  it('11, should return false', () => {
    expect(isValidSize('11')).toBeFalsy();
  });
  it('aчb, should return false', () => {
    expect(isValidSize('axb')).toBeFalsy();
  });
  it('11xb, should return false', () => {
    expect(isValidSize('11xb')).toBeFalsy();
  });
});
