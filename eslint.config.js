import react from 'eslint-plugin-react';
import globals from 'globals';
import js from '@eslint/js';

export default [
    { languageOptions: { globals: globals.browser } },
    js.configs.recommended,
    {
        plugins: {
            react,
        },
        rules: {
            'react/prop-types': 'off',
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'react/react-in-jsx-scope': 'off',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
];
