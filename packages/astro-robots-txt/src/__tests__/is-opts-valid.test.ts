import { describe, it, expect, vi } from 'vitest';
import { Logger } from '@at-utils';

import type { RobotsTxtOptions } from '../index';
import { isOptsValid } from '../is-opts-valid';

const logger = new Logger('dummy-astro-robots-txt');

const site = 'https://example.com';

describe('test isOptsValid', () => {
  it('site = undefined, should return false', () => {
    expect(isOptsValid(undefined, {}, logger)).toBeFalsy();
  });

  it('site = "", should return false', () => {
    expect(isOptsValid('', {}, logger)).toBeFalsy();
  });

  /**
   * sitemap
   */
  it('sitemap = true, should return true', () => {
    expect(isOptsValid(site, { sitemap: true }, logger)).toBeTruthy();
  });
  it('sitemap = false, should return true', () => {
    expect(isOptsValid(site, { sitemap: false }, logger)).toBeTruthy();
  });
  it('sitemap = "", should return false', () => {
    expect(isOptsValid(site, { sitemap: '' }, logger)).toBeTruthy();
  });
  it('sitemap = "aa", should return false', () => {
    expect(isOptsValid(site, { sitemap: 'aa' }, logger)).toBeFalsy();
  });
  it('sitemap = "ftp://aa", should return false', () => {
    expect(isOptsValid(site, { sitemap: 'ftp://aa' }, logger)).toBeFalsy();
  });
  it('sitemap = "http://aa", should return true', () => {
    expect(isOptsValid(site, { sitemap: 'http://aa' }, logger)).toBeTruthy();
  });
  it('sitemap = "[]", should return true', () => {
    expect(isOptsValid(site, { sitemap: [] }, logger)).toBeTruthy();
  });
  it('sitemap = "[``]", should return false', () => {
    expect(isOptsValid(site, { sitemap: [''] }, logger)).toBeFalsy();
  });
  it('sitemap = "[`aa`]", should return false', () => {
    expect(isOptsValid(site, { sitemap: ['aa'] }, logger)).toBeFalsy();
  });
  it('sitemap = "[`ftp://aa`]", should return false', () => {
    expect(isOptsValid(site, { sitemap: ['ftp://aa'] }, logger)).toBeFalsy();
  });
  it('sitemap = "[`http://aa`]", should return false', () => {
    expect(isOptsValid(site, { sitemap: ['http://aa'] }, logger)).toBeTruthy();
  });

  /**
   * host
   */
  it('host is not valid, should return false', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      host: 'abc:1',
    };
    expect(isOptsValid(site, options, logger)).toBeFalsy();
  });
  it('host is empty, should return false', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      host: '',
    };
    expect(isOptsValid(site, options, logger)).toBeTruthy();
  });

  /**
   * policy
   */
  it('policy = [], should return false', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [],
    };
    expect(isOptsValid(site, options, logger)).toBeFalsy();
  });
  it('userAgent is empty, should return false', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ allow: '/', userAgent: '' }],
    };
    expect(isOptsValid(site, options, logger)).toBeFalsy();
  });
});
