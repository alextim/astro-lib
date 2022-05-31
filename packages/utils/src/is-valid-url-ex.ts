import { isNumber } from './is-number';
// @internal
export const isValidUrlEx = (s: any) => {
  if (typeof s !== 'string' || !s) {
    return false;
  }
  if (isNumber(s)) {
    return false;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dummy = new URL(s, 'http://a');
    return true;
  } catch {
    return false;
  }
};
