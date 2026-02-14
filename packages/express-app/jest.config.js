const path = require('path');

module.exports = {
  displayName: 'express-app',
  clearMocks: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', path.join(__dirname, 'build')],
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  testEnvironment: 'node',
  testMatch: [path.join(__dirname, 'tests/**/*.test.ts')],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  // Map .js imports to .ts source files for nodenext module resolution compatibility
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  verbose: true,
};
