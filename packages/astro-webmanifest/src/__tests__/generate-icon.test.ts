// import fs from 'node:fs';
// import os from 'node:os';
// import sharp from 'sharp';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import sharp from 'sharp';
import { generateIcon } from '../utils/generate-icon';

const srcIcon = 'src/__tests__/images/logo-sq.png';
const icon = {
  src: 'favicon-32x32.png',
  sizes: '32x32',
  type: 'image/png',
};

vi.mock('sharp', () => {
  return {
    default: vi.fn(
      () =>
        new (class {
          resize() {
            return this;
          }
          toFile() {
            return Promise.resolve();
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

/*
vi.mock('sharp', () => {
  const sharp = vi.fn(
    () =>
      new (class {
        resize() {
          return this;
        }
        toFile() {
          return Promise.resolve();
        }
        metadata() {
          return {
            width: 128,
            height: 128,
            format: 'png',
          };
        }
      })()
  );

  // sharp.simd = vi.fn();
  // sharp.concurrency = vi.fn();

  return sharp;
});
*/

const dir = new URL('https://abc');
describe('test generateIcon', () => {
  beforeEach(() => {
    //sharp.mockClear();
  });
  /*
  it('`sizes` is empty, should return undefined', async () => {
    const result = await generateIcon({ ...icon, sizes: '' }, srcIcon, dir);
    expect(result).toBeUndefined();
  });
*/
  it('all are ok, should return OutputInfo', async () => {
    const result = await generateIcon(icon, srcIcon, dir);
    // expect(result?.format).toBe('png');
    expect(sharp().toFile).toBeCalled();
  });
});
