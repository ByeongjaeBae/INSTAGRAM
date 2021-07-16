module.exports = {
  env: {
    browser: true,
    commonjs: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    /** 함수의 명시적 타입 리턴을 명시적으로 써주지 않아도 되도록 하는 옵션. 이건 off 하는게 맞을까? */
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prettier/prettier': 'error',
  },
};
