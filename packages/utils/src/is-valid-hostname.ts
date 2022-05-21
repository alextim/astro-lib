// @internal
export const isValidHostname = (x: any) => {
  if (typeof x !== 'string') {
    return false;
  }
  let value = x.toString();

  const validHostnameChars = /^[a-zA-Z0-9-.]{1,253}\.?$/g;
  if (!validHostnameChars.test(value)) {
    return false;
  }

  if (value.endsWith('.')) {
    value = value.slice(0, value.length - 1);
  }

  if (value.length > 253) {
    return false;
  }

  return value
    .split('.')
    .every((label) => /^([a-zA-Z0-9-]+)$/g.test(label) && label.length < 64 && !label.startsWith('-') && !label.endsWith('-'));
};
