module.exports = {
  extends: [
    'prettier',
    'eslint:recommended',
    'turbo',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
  ],
  ignorePatterns: ['node_modules', 'dist', 'build', '!.*.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['prettier', 'sonarjs'],
  rules: {
    'prettier/prettier': 'error',
  },
};
