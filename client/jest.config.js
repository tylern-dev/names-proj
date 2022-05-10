module.exports = {
  // roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  // transform: {
  //   '^.+\\.(ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  // },
  // transformIgnorePatterns: [
  //   '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
  // ],

  // moduleDirectories: ['node_modules'],
  // resetMocks: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
  // extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
  resolver: '<rootDir>/jest-resolver.js',
}
