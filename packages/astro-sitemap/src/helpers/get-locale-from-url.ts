export const getLocaleFromUrl = (url: string, defaultLocale: string, localeCodes: string[], base: string) => {
  if (!url || !defaultLocale || localeCodes.length === 0 || localeCodes.some((key) => !key) || !base) {
    throw new Error('getLocaleFromUrl: some parameters are empty');
  }
  if (url.indexOf(base) !== 0) {
    return undefined;
  }
  const s = url.replace(base, '');
  if (!s || s === '/') {
    return defaultLocale;
  }
  const index = s.startsWith('/') ? 1 : 0;
  const a = s.split('/');
  const locale = a[index];
  if (localeCodes.some((key) => key === locale)) {
    return locale;
  }
  return defaultLocale;
};
