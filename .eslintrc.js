// Generated by ts-toolkit, to update run `yarn tsk install`
// Inspired by https://github.com/iamturns/create-exposed-app/blob/master/.eslintrc.js
module.exports = {
  plugins: [
    "@typescript-eslint",
    "eslint-comments",
    "jest",
    "promise",
    "unicorn",
    "prettier",
  ],
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:jest/recommended",
    "plugin:promise/recommended",
    "plugin:unicorn/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  env: {
    node: true,
  },
  root: true,
  rules: {
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
  },
  overrides: [
    {
      files: ["src/**/*.test.ts"],
      env: {
        jest: true,
      },
    },
    {
      files: ["**/*.*"],
      rules: {
        // allow missing return type on arrow functions
        "@typescript-eslint/explicit-function-return-type": [
          "error",
          { allowExpressions: true },
        ],
        // allow names like arg
        "unicorn/prevent-abbreviations": "off",
        // conflicts with airbnb no-for-of-loop
        "unicorn/no-for-loop": "off",
      },
    },
  ],
};
