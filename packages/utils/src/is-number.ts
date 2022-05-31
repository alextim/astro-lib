export function isNumber(num: any) {
  return typeof num === 'number' || !isNaN(num);
}
