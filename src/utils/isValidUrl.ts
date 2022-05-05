export const isValidUrl = (s: any) => {
  if (typeof s !== 'string') {
    return false;
  }
  if (!s) {
    return false;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dummy = new URL(s);
    return true;
  } catch {
    return false;
  }
};
