module.exports = {
  '*.{js,jsx,ts,tsx,cjs,mjs}': 'eslint --fix',
  '**/*.ts?(x)': () => 'pnpm run typecheck',
  '*.{js,jsx,ts,tsx,cjs,mjs,md}': 'prettier --ignore-unknown --write',
};
