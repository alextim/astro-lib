import { isFileExistsSync } from '../is-file-exists-sync';

import path from 'node:path';

describe('test isFileExistsSync', () => {
  it('file is not exists, should return false', () => {
    expect(isFileExistsSync(path.join(process.cwd(), 'src', 'index1.ts'))).toBeFalsy();
  });
  it('existing dir, should return false', () => {
    expect(isFileExistsSync(path.join(process.cwd(), 'src'))).toBeFalsy();
  });
  it('non existing dir, should return false', () => {
    expect(isFileExistsSync(path.join(process.cwd(), 'src1'))).toBeFalsy();
  });
  it('file is not exists, should return true', () => {
    expect(isFileExistsSync(path.join(process.cwd(), 'src', 'index.ts'))).toBeTruthy();
  });
});
