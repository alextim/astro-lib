import { describe, it, expect } from 'vitest';

import { isDirExists } from '../is-dir-exists';

import path from 'node:path';

describe('test isDirExists', () => {
  it("dir doesn't exist, should return false", async () => {
    expect(await isDirExists(path.join(process.cwd(), 'src1'))).toBeFalsy();
  });
  it('dir exists, should return true', async () => {
    expect(await isDirExists(path.join(process.cwd(), 'src'))).toBeTruthy();
  });
  it("file doesn't exist, should return false", async () => {
    expect(await isDirExists(path.join(process.cwd(), 'src', 'index1.ts'))).toBeFalsy();
  });
  it('file exists, should return false', async () => {
    expect(await isDirExists(path.join(process.cwd(), 'src', 'index.ts'))).toBeFalsy();
  });
});
