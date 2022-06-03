
module.exports = {
  extends: 'standard-with-typescript',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    warnOnUnsupportedTypeScriptVersion: false
  },
  rules: {
    'no-new': 'off',
    'no-useless-catch': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/prefer-readonly': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-invalid-void-type': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/prefer-function-type': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    'prefer-regex-literals': 'off',
    'no-control-regex': 'off'
  },
  ignorePatterns: ['lib/*']
}
