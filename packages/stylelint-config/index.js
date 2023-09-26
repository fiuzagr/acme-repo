module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-prettier/recommended",
    "stylelint-config-standard-scss",
  ],
  plugins: [
    "stylelint-order",
    "stylelint-use-logical-spec",
    "stylelint-high-performance-animation",
  ],
  rules: {
    "order/properties-alphabetical-order": true,
    "liberty/use-logical-spec": true,
    "plugin/no-low-performance-animation-properties": true,
  },
  overrides: [
    {
      files: ["*.html", "**/*.html"],
      customSyntax: "postcss-html",
    },
  ],
};
