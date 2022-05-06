export const isValidHttpUrl = (s: any) => {
  if (typeof s !== 'string' || !s) {
    return false;
  }
  try {
    const url = new URL(s);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};
