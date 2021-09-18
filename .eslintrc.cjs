module.exports = {
    extends: [
        // https://www.npmjs.com/package/eslint-config-airbnb-base
        'airbnb-base',

        // https://github.com/import-js/eslint-plugin-import
        'plugin:import/recommended'
    ],

    parserOptions: {
        ecmaVersion: 2020
    },

    rules: {
        // base
        'arrow-parens': ['warn', 'as-needed'],
        'comma-dangle': ['error', 'never'],
        'max-len': ['warn', {code: 120}],
        'no-console': 'off',
        'no-multiple-empty-lines': ['error', {max: 2, maxEOF: 0, maxBOF: 0}],
        'no-shadow': ['error', {builtinGlobals: false, hoist: 'all', allow: ['error']}],
        'no-unused-expressions': ['error', {allowShortCircuit: true}],
        'object-curly-spacing': ['error', 'never'],
        'space-before-function-paren': ['error', {anonymous: 'always', named: 'always'}],
        'space-in-parens': 'off',
        'spaced-comment': 'off',
        indent: ['error', 4, {SwitchCase: 1}],

        // plugins
        'import/extensions': ['warn', 'ignorePackages'],
        'import/no-extraneous-dependencies': ['error', {devDependencies: true}]
    }
};
