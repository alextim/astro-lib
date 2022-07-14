import fs from 'node:fs';
import type { AstroConfig } from 'astro';
import { Logger } from '@/at-utils';
import type { WebmanifestOptions } from '../index';
import onBuildDone from '../on-build-done';

vi.mock('@/at-utils');
vi.mock('sharp', () => {
  return {
    default: vi.fn(
      () =>
        new (class {
          resize() {
            return this;
          }
          toFile() {
            return Promise.resolve({ format: 'png' });
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

const logger = new Logger('dummy-astro-webmanifest');

const dir = new URL('file:/');
const config = {
  build: {
    format: 'directory',
  },
};

describe('onBuildDone', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const fn = vi.fn();
  fs.writeFileSync = fn;

  it("options = { name: 'test' }, should not throw", () => {
    const opts: WebmanifestOptions = { name: 'test' };
    expect(async () => await onBuildDone(opts, config as AstroConfig, dir, [], logger)).not.toThrow();
  });
  it("options = { name: 'test' }, should call success", async () => {
    const opts: WebmanifestOptions = { name: 'test' };
    await onBuildDone(opts, config as AstroConfig, dir, [], logger);
    expect(logger.success).toBeCalled();
  });

  it('options = {}, should match snapshot', async () => {
    const opts: WebmanifestOptions = { name: 'test' };
    await onBuildDone(opts, config as AstroConfig, dir, [], logger);

    expect(fn.mock.calls[0][1]).toMatchSnapshot();
    expect(logger.success).toBeCalled();
  });
});
