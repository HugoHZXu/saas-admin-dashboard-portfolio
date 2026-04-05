/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.jest.json',
      },
    ],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@formatjs|intl-messageformat|react-intl)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/test/styleMock.js',
  },
  testPathIgnorePatterns: ['<rootDir>/src/utils/testUtils.tsx'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/Date/**',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/types/**',
    '!<rootDir>/src/utils/testUtils.tsx',
  ],
};
