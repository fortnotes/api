module.exports = {
    extends: [
        require.resolve('../.eslintrc.cjs'),

        // https://github.com/jest-community/eslint-plugin-jest
        'plugin:jest/all'
    ],

    env: {
        jest: true
    },

    rules: {
        // base
        'max-lines-per-function': ['error', {max: 300}],

        // plugins
        'jest/prefer-expect-assertions': ['off'],
        'jest/no-disabled-tests': ['warn'],
        'jest/no-commented-out-tests': ['warn']
    }
};
