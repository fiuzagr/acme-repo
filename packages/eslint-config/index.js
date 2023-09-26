const OFF = 0;

module.exports = {
  extends: [
    "prettier",
    "eslint:recommended",
    "turbo",
    "plugin:@typescript-eslint/recommended",
    "plugin:sonarjs/recommended",
  ],
  env: {
    es6: true,
  },
  ignorePatterns: ["node_modules", "dist", "build", "!.*.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["prettier", "sonarjs"],
  rules: {
    "prettier/prettier": "error",
  },
  overrides: [
    {
      // config files can be use CommonJS module
      files: ["./*.js"],
      env: {
        node: true,
      },
      rules: {
        "@typescript-eslint/no-var-requires": OFF,
      },
    },
  ],
};
