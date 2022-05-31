import { describe, it, expect, vi } from 'vitest';
import { generateIcon } from '../helpers/generate-icon';

const srcIcon = 'src/__tests__/images/logo-sq.png';
const icon = {
  src: 'favicon-32x32.png',
  sizes: '32x32',
  type: 'image/png',
};

vi.mock('fs', () => ({
  promises: {
    writeFile: vi.fn().mockResolvedValue(0),
    stat: vi.fn().mockResolvedValue({ isDirectory: () => true }),
  },
}));

vi.mock('sharp', () => {
  return {
    default: vi.fn(
      () =>
        new (class {
          resize() {
            return this;
          }
          /*
          toFile() {
            return Promise.resolve({ format: 'png' });
          }
          */
          toBuffer() {
            return Promise.resolve({ data: '', info: { format: 'png' } });
          }
          metadata() {
            return {
              width: 128,
              height: 128,
              format: 'png',
            };
          }
        })(),
    ),
  };
});

const dir = new URL('https://abc');

describe('test generateIcon', () => {
  it('`sizes` is empty, should return undefined', async () => {
    const result = await generateIcon({ ...icon, sizes: '' }, srcIcon, dir);
    expect(result).toBeUndefined();
  });
  it('`sizes` is any, should return undefined', async () => {
    const result = await generateIcon({ ...icon, sizes: 'any' }, srcIcon, dir);
    expect(result).toBeUndefined();
  });
  it('`sizes` contains more then one entry, should return undefined', async () => {
    const result = await generateIcon({ ...icon, sizes: '1x2 3x4' }, srcIcon, dir);
    expect(result).toBeUndefined();
  });
  it('all are ok, should return OutputInfo', async () => {
    const result = await generateIcon(icon, srcIcon, dir);
    expect(result?.format).toBe('png');
  });
});
