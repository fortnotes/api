module.exports = {
    // base rules
    // extends: require.resolve('cjs-eslint'),
    extends: 'airbnb-base',

    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },

    rules: {
        indent: ['error', 4, {SwitchCase: 1}],
        'comma-dangle': ['error', 'never'],
        'object-curly-spacing': ['error', 'never'],
        'spaced-comment': 'off',
        'arrow-parens': ['warn', 'as-needed'],
        'no-console': 'off',
        'space-in-parens': 'off',
        'no-shadow': ['error', {builtinGlobals: false, hoist: 'all', allow: ['error']}],
        'no-multiple-empty-lines': ['error', {max: 2, maxEOF: 0, maxBOF: 0}],
        'space-before-function-paren': ['error', {anonymous: 'always', named: 'always'}],
        'no-unused-expressions': ['error', {allowShortCircuit: true}],
        'import/extensions': ['warn', 'ignorePackages'],
        'max-len': ['warn', {code: 120}]
        //'require-await': 0
    }
};
