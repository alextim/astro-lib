export const isValidHostname = (value: string) => {
  if (typeof value !== 'string') {
    return false;
  }

  const validHostnameChars = /^[a-zA-Z0-9-.]{1,253}\.?$/g;
  if (!validHostnameChars.test(value)) {
    return false;
  }

  if (value.endsWith('.')) {
    // eslint-disable-next-line no-param-reassign
    value = value.slice(0, value.length - 1);
  }

  if (value.length > 253) {
    return false;
  }

  return value
    .split('.')
    .every((label) => /^([a-zA-Z0-9-]+)$/g.test(label) && label.length < 64 && !label.startsWith('-') && !label.endsWith('-'));
};
