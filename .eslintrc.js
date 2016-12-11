module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'standard',
  'rules': {
    'arrow-parens': 0,
    'comma-dangle': [1, 'never'],
    'semi': ['warn', 'always'],
    'space-before-function-paren': 0
  }
}
