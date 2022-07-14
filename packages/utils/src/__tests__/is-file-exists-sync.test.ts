import { describe, it, expect } from 'vitest';

import { isFileExistsSync } from '../is-file-exists-sync';

import path from 'node:path';

describe('test isFileExistsSync', () => {
  it("file doesn't exist, should return false", () => {
    expect(isFileExistsSync(path.join(process.cwd(), 'src', 'index1.ts'))).toBeFalsy();
  });
  it('dir exists, should return false', () => {
    expect(isFileExistsSync(path.join(process.cwd(), 'src'))).toBeFalsy();
  });
  it("dir doesn't exist, should return false", () => {
    expect(isFileExistsSync(path.join(process.cwd(), 'src1'))).toBeFalsy();
  });
  it('file exists, should return true', () => {
    expect(isFileExistsSync(path.join(process.cwd(), 'src', 'index.ts'))).toBeTruthy();
  });
});
