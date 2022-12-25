module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: [
    'stylelint-prettier',
    'stylelint-order',
    'stylelint-use-logical-spec',
    'stylelint-high-performance-animation',
  ],
  rules: {
    'prettier/prettier': true,
    'order/properties-alphabetical-order': true,
    'liberty/use-logical-spec': true,
    'plugin/no-low-performance-animation-properties': true,
  },
  overrides: [
    {
      files: ['{**/*,*}.{js,ts,jsx,tsx}'],
      ignoreFiles: ['node_modules', 'dist', 'build'],
      customSyntax: '@stylelint/postcss-css-in-js',
    },
  ],
};
