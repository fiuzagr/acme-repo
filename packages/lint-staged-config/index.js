//// NOTICE
// The "lint-staged" package is installed in the root, because this package is
// related with the repository. However, packages must be configured by
// themselves to make Turborepo caches and allow linters to run inside the
// package directory.
//
// This file is used as base config.
module.exports = {
  "src/**/*.{ts,tsx}": "tsc --noEmit",
  "src/**/*.{js,jsx,ts,tsx}": "eslint --fix",
};
