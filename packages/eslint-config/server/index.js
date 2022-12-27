module.exports = {
  extends: ['../index.js'],
  env: {
    node: true,
  },
  overrides: [
    {
      files: ['**/__tests__/**/*'],
      env: {
        jest: true,
      },
    },
  ],
};
