/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const base = require('../../jest.config.base.cjs');
const pkg = require('./package.json');

module.exports = {
  ...base,
  displayName: pkg.name,
};
