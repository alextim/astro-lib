import { loadConfig } from '../../load-config';

describe('test loadConfig', () => {
  const base = new URL('.', import.meta.url);
  it('empty name, should return undefined', async () => {
    const config = await loadConfig('', base);
    expect(config).toBeNull();
  });
  it('config not found, should return undefined', async () => {
    const config = await loadConfig('not-found', base);
    expect(config).toBeNull();
  });
  it('config found, should return "test"', async () => {
    const config = await loadConfig('found', base);
    expect(config.a).toBe('test');
  });
  it('should throw error', async () => {
    const name = 'found-no-default';
    await expect(loadConfig(name, base)).rejects.toThrowError(/doesn't have default export/);
  });
});
