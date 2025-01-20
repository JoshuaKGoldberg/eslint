import js from '@eslint/js';

/** @type {import('eslint-remote-tester').Config} */
const config = {
    repositories: ['mui-org/material-ui', 'reach/reach-ui'],
    extensions: ['js', 'jsx', 'ts', 'tsx'],
    eslintConfig: [js.configs.recommended],
    pathIgnorePattern: `(${[
        'node_modules',
        '\\/\\.', // Any file or directory starting with dot, e.g. ".git"
        'test-results',
        'docs',
    ].join('|')})`,
};

export default config;
