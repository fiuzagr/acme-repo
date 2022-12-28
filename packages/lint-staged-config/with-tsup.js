module.exports = {
  ...require('./index.js'),
  'src/**/*.{ts,tsx}': () => 'npm run build',
};
