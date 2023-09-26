module.exports = {
  ...require("./index.js"),
  // ignore all staged files and run package build
  "src/**/*.{ts,tsx}": () => "npm run build",
};
