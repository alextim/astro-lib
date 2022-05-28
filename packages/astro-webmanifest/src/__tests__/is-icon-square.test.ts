import path from 'node:path';
import { isIconSquare } from '../helpers/is-icon-square';

describe('test isIconSquare', () => {
  it('icon is not square, should return false', async () => {
    expect(await isIconSquare(path.join(process.cwd(), 'src', '__tests__', 'images', 'logo-non-sq.png'))).toBeFalsy();
  });
  it('icon is square, should return true', async () => {
    expect(await isIconSquare(path.join(process.cwd(), 'src', '__tests__', 'images', 'logo-sq.png'))).toBeTruthy();
  });
});
