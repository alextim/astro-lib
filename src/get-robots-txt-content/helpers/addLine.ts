const capitaliseFirstLetter = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const addLine = (name: string, rule: string | string[] | number) => {
  if (rule && Array.isArray(rule) && rule.length > 0) {
    let contents = '';
    rule.forEach((item) => {
      contents += addLine(name, item);
    });
    return contents;
  }

  const ruleContent = name === 'Allow' || name === 'Disallow' ? encodeURI(rule.toString()) : rule.toString();

  return `${capitaliseFirstLetter(name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase())}:${
    ruleContent.length > 0 ? ` ${ruleContent}` : ''
  }\n`;
};

export default addLine;
