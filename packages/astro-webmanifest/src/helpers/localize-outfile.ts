const localizeOutfile = (outfile: string, locale: string) => {
  if (!locale) {
    return outfile;
  }
  const a = outfile.split('.');
  a[0] = `${a[0]}-${locale}`;
  return a.join('.');
};

export default localizeOutfile;
