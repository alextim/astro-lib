import { isFileExists } from '../is-file-exists';

import path from 'node:path';

describe('test isFileExists', () => {
  it('file is not exists, should return false', async () => {
    expect(await isFileExists(path.join(process.cwd(), 'src', 'index1.ts'))).toBeFalsy();
  });
  it('existing dir, should return false', async () => {
    expect(await isFileExists(path.join(process.cwd(), 'src'))).toBeFalsy();
  });
  it('non existing dir, should return false', async () => {
    expect(await isFileExists(path.join(process.cwd(), 'src1'))).toBeFalsy();
  });
  it('file is not exists, should return true', async () => {
    expect(await isFileExists(path.join(process.cwd(), 'src', 'index.ts'))).toBeTruthy();
  });
});
