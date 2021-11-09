module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    
  ],

  env: {
    node: true,
    es6: true,
    serviceworker: true,
    browser: true,
  },
  globals: {
    describe: true,
    before: true,
    after: true,
    beforeEach: true,
    it: true,
    workbox: false,
    
  },

  rules: {
    //"security/detect-non-literal-require": 0,
 
    'prefer-const': 0,
    // Typescript rules
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    //'@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-this-alias': 0,
    '@typescript-eslint/no-shadow': 1,
    '@typescript-eslint/triple-slash-reference': [
      0,
      {
        path: 'always',
        types: 'prefer-import',
        lib: 'prefer-import',
      },
    ],
    // @typescript-eslint/explicit-function-return-type": 0,

    //  eslint-disable @typescript-eslint/no-unused-vars
    //  eslint-disable @typescript-eslint/explicit-function-return-type
  },
}
