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
        'jest/no-commented-out-tests': ['warn'],
        'jest/no-disabled-tests': ['warn'],
        'jest/no-hooks': ['off'],
        'jest/prefer-expect-assertions': ['off']
    }
};
