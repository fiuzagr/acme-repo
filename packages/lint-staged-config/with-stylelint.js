module.exports = {
  ...require('./index.js'),
  'src/**/*.{html,css,js,jsx,ts,tsx}': 'stylelint --fix',
};
