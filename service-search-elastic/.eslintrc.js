module.exports = {
    env: {
        node: true,
        commonjs: false,
        es2021: true,
    },

    extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:security/recommended-legacy'],
    plugins: ['prettier', 'import', 'security', 'promise'],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': ['error'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'import/order': [
            'error',
            {
                groups: [['builtin', 'external'], 'internal', ['sibling', 'parent'], 'index', 'unknown'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
                pathGroups: [
                    {
                        pattern: '@/**',
                        group: 'internal',
                        position: 'after',
                    },
                ],
                pathGroupsExcludedImportTypes: ['builtin'],
            },
        ],

        'no-console': [
            'error',
            {
                allow: ['info', 'warn', 'error', 'time', 'timeEnd'],
            },
        ],
        'prefer-const': 'warn',
        'max-len': ['error', 200],
        'array-bracket-newline': 'warn',
        'consistent-return': 'error',
        eqeqeq: 'error',
        'no-unused-expressions': ['error', { allowTernary: true }],
        'no-unused-vars': [
            'error',
            {
                varsIgnorePattern: '^_',
                argsIgnorePattern: '^_',
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: false,
            },
        ],

        'operator-linebreak': [
            'error',
            'after',
            { overrides: { '?': 'before', ':': 'before', '&&': 'before', '||': 'before' } },
        ],

        'linebreak-style': ['error', process.platform === 'win64' && 'win32' ? 'windows' : 'unix'],

        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

        'arrow-parens': ['error', 'always'],

        'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],

        'no-extra-parens': 'error',
        'no-return-await': 'error',
        'no-duplicate-imports': 'error',

        'no-undef': 'off',

        'security/detect-non-literal-fs-filename': 'error',
        'security/detect-object-injection': 'error',

        'promise/always-return': 'error',
        'promise/no-return-wrap': 'error',
        'promise/param-names': 'error',
        'promise/catch-or-return': 'error',
        'promise/no-native': 'off',
        'promise/no-nesting': 'warn',
        'promise/no-promise-in-callback': 'warn',
        'promise/no-callback-in-promise': 'warn',
        'promise/avoid-new': 'warn',
        'promise/no-new-statics': 'error',
        'promise/no-return-in-finally': 'warn',
        'promise/valid-params': 'warn',
    },
};
