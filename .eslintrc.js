module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    indent: ['error', 2],
    'react/prop-types': 0,
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': ['error', 'never'],
    'object-shorthand': ['error', 'always'],
    camelcase: 0,
    'generator-star-spacing': ['error', 'neither'],
    'react/display-name': 0,
    'no-loss-of-precision': 0,
  },
}
