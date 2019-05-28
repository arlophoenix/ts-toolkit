// Generated by ts-toolkit, to update run `yarn tsk install`
// Inspired by https://github.com/iamturns/create-exposed-app/blob/master/lint-staged.config.js
module.exports = {
  linters: {
    "package.json": ["yarn tsk format:package", "git add"],
    ".editorconfig": ["yarn tsk format:prettier", "git add"],
    "**/*.{json,md,yaml,yml}": ["yarn tsk format:prettier", "git add"],
    "**/*.{js,ts}": [
      "yarn tsk format:import",
      "yarn tsk format:eslint",
      "yarn tsk test:jest --onlyChanged",
      "git add",
    ],
  },
  // The formatting tools are ordered to run sequentially
  concurrent: false,
};
