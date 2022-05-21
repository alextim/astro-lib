const base = require('./jest.config.base.cjs');

module.exports = {
  ...base,
  projects: [
    // '<rootDir>/packages/*',
    '<rootDir>/packages/*/jest.config.cjs',
  ],
};
