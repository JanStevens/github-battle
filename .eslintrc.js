const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
  parser: 'babel-eslint',
  plugins: ['react', 'react-hooks'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    browser: true,
    amd: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    'no-extra-semi': OFF,
    'no-console': OFF,
    'react/prop-types': OFF,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': [
      WARN,
      {
        args: 'all',
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
  },
  settings: {
    react: {
      version: '16.8.5',
    },
  },
}
