const isValidSize = (size: any) => {
  if (!size || size === 'any') {
    return true;
  }
  const arrSpace = size.split(' ');
  for (const item of arrSpace) {
    const arr = item.split(/[xX]/);
    if (arr.length !== 2) {
      return false;
    }
    for (const el of arr) {
      if (isNaN(el)) {
        return false;
      }
    }
  }
  return true;
};

export default isValidSize;
