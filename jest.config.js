/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
    clearMocks: true,
    coverageDirectory: 'coverage',
    moduleDirectories: [
      'node_modules',
      '<rootDir>',
      '<rootDir>/src',
    ],
    moduleFileExtensions: [
      'js',
      'jsx',
    ],
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
      '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    },
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  };
  