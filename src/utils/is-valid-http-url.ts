export const isValidHttpUrl = (s: any) => {
  if (typeof s !== 'string' || !s) {
    return false;
  }
  try {
    const { protocol } = new URL(s);
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
};
