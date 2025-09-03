module.exports = {
    '*.{ts,tsx}': [
        () => 'tsc -p tsconfig.json --skipLibCheck --noEmit',
        'eslint --quiet',
        'prettier --write --ignore-unknown',
    ],
    '*.{css,scss}': ['stylelint --fix', 'prettier --write --ignore-unknown'],
};
