module.exports = {
    'extends': [
        require.resolve('../.eslintrc.cjs'),
        //'plugin:chai-friendly/recommended',
        //'plugin:cypress/recommended'
    ],
    env: {
        //es6: true,
        mocha: true
    },

    rules: {
        'quote-props': ['error', 'as-needed', {keywords: true, unnecessary: false}],
        'no-shadow': ['error', {allow: ['done']}],
        'max-lines-per-function': ['error', {max: 300}],
        'no-unused-expressions': ['off'],
        'strict': ['off']
    }
};
