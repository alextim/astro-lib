/** @type {import("@types/eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // requireConfigFile: false,
    // experimentalObjectRestSpread: true,
    sourceType: 'module',
    ecmaFeatures: {
      // globalReturn: false,
      // jsx: true,
    },
    // tsconfigRootDir: './',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', /* 'import', */ 'prettier'],
  extends: [
    // 'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-base',
    'airbnb-typescript/base',
    // 'plugin:import/recommended',
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
    'no-plusplus': 'off',
    'no-restricted-exports': 'off',

    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-unresolved': 'error',
    'import/prefer-default-export': 0,

    '@typescript-eslint/no-empty-interface': [
      'warn',
      {
        allowSingleExtends: false,
      },
    ],
    '@typescript-eslint/no-var-requires': 0,
    'prettier/prettier': 'error',
  },
  ignorePatterns: ['.prettierrc.cjs', '.eslintrc.cjs', 'astro.config.mjs'],
};
