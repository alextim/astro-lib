import { isDirExists } from '../is-dir-exists';

import path from 'node:path';

describe('test isFileExists', () => {
  it('dir is not exists, should return false', async () => {
    expect(await isDirExists(path.join(process.cwd(), 'src1'))).toBeFalsy();
  });
  it('existing dir, should return true', async () => {
    expect(await isDirExists(path.join(process.cwd(), 'src'))).toBeTruthy();
  });
});
