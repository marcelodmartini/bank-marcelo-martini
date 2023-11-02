/**
 * Jest configuration for testing TypeScript files.
 *
 * @see {@link https://jestjs.io/docs/configuration|Jest Configuration Documentation}
 */

module.exports = {
  // Use 'ts-jest' preset to handle TypeScript with Jest.
  preset: 'ts-jest',

  // Define the test environment to be 'node'. This means tests will run in a Node environment.
  testEnvironment: 'node',

  // List of file extensions that Jest should use for importing and running tests.
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  // Define how to transform source files before running the tests.
  // Use 'ts-jest' to transform TypeScript files.
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json', // Specify the path to the TypeScript configuration file.
    }],
  },

  // Specify patterns to find test files.
  // Matches any files with `.test` or `.spec` in their names, and with extensions `.ts`, `.tsx`, `.js`, or `.jsx`.
  testMatch: ['**/*.(test|spec).(ts|tsx|js|jsx)'],
};
