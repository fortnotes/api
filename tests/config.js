// https://jestjs.io/docs/configuration

export default {
    verbose: true,
    testMatch: ['**/tests/specs/db.js'],
    globalSetup: '<rootDir>/setup.js',
    globalTeardown: '<rootDir>/teardown.js',
    transform: {},
    displayName: {
        name: 'API',
        color: 'blue'
    }
};
