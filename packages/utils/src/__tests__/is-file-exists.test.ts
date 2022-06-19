import { isFileExists } from '../is-file-exists';

import path from 'node:path';

describe('test isFileExists', () => {
  it("file doen't exist, should return false", async () => {
    expect(await isFileExists(path.join(process.cwd(), 'src', 'index1.ts'))).toBeFalsy();
  });
  it('dir exists, should return false', async () => {
    expect(await isFileExists(path.join(process.cwd(), 'src'))).toBeFalsy();
  });
  it("dir doesn't exist, should return false", async () => {
    expect(await isFileExists(path.join(process.cwd(), 'src1'))).toBeFalsy();
  });
  it('file exists, should return true', async () => {
    expect(await isFileExists(path.join(process.cwd(), 'src', 'index.ts'))).toBeTruthy();
  });
});
