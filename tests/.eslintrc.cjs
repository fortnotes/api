module.exports = {
    'extends': [
        require.resolve('../.eslintrc.cjs'),

        // https://github.com/jest-community/eslint-plugin-jest
        'plugin:jest/all'
    ],
    env: {
        jest: true
    },

    rules: {
        'quote-props': ['error', 'as-needed', {keywords: true, unnecessary: false}],
        'no-shadow': ['error', {allow: ['done']}],
        'max-lines-per-function': ['error', {max: 300}],
        'no-unused-expressions': ['off'],
        'strict': ['off'],

        'jest/prefer-expect-assertions': ['off']
    }
};
