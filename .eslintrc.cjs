/** @type {import("@types/eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    node: true,
    'jest/globals': true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'jest', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: [2, 'single', { avoidEscape: true }],
    'jsx-quotes': [2, 'prefer-double'],
    semi: ['error', 'always'],
    'linebreak-style': ['error', 'unix'],
    'no-console': ['error', { allow: ['warn', 'error'] }],

    'prettier/prettier': 'error',
  },
  ignorePatterns: ['.prettierrc.cjs', '.eslintrc.cjs', 'astro.config.mjs'],
};
