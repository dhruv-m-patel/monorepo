const path = require('path');
const JestConfig = require('../jest.config');

const { projects: _projects, ...baseConfig } = JestConfig;

module.exports = {
  ...baseConfig,
  displayName: 'starter-app',
  rootDir: './src',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    NODE_ENV: 'test',
  },
  clearMocks: true,
  verbose: true,
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    path.join(__dirname, 'build'),
    path.join(__dirname, 'build-static'),
  ],
  testMatch: [
    path.join(__dirname, 'src/**/*.test.ts'),
    path.join(__dirname, 'src/**/*.test.tsx'),
  ],
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
};
