module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-components': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'no-redeclare': 'off',
    'no-constant-condition': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-unused-components': 'off',
    'no-cond-assign': 'off',
    'no-unsafe-negation': 'off',
    'no-empty': 'off'
  }
}
