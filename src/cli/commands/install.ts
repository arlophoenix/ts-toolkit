import yargs from "yargs";

import { spawn } from "../../utils/spawn";

const configPathsDefault = [
  ".babelrc.js",
  ".circleci",
  ".dependabot",
  ".editorconfig",
  ".envrc",
  ".eslintrc.js",
  ".gitignore",
  ".huskyrc.js",
  ".npmignore",
  ".npmrc",
  ".nvmrc",
  ".vscode",
  "importsort.config.js",
  "jest.config.js",
  "lint-staged.config.js",
  "prettier.config.js",
  "tsconfig.json",
];

const overwriteFilesWithoutPromptingDefault = false;

// it would be nice to have the ability to check whether installed files have been modified for use in CI
export function install({
  force: overwriteFilesWithoutPrompting = overwriteFilesWithoutPromptingDefault,
  configPaths = configPathsDefault,
}: {
  force?: boolean;
  configPaths?: string[];
} = {}): void {
  const sourcePaths = configPaths.map(
    path => `node_modules/ts-toolkit/${path}`,
  );
  const sourceAndDestinationPaths = [...sourcePaths, "."];
  spawn(
    `cp -R${overwriteFilesWithoutPrompting ? "f" : "i"}`,
    {},
    ...sourceAndDestinationPaths,
  );
}

export function uninstall({
  force: overwriteFilesWithoutPrompting = overwriteFilesWithoutPromptingDefault,
  configPaths = configPathsDefault,
}: {
  force?: boolean;
  configPaths?: string[];
} = {}): void {
  spawn(
    `rm -R${overwriteFilesWithoutPrompting ? "f" : "i"}`,
    {},
    ...configPaths,
  );
}

export function addInstallCommands<T = {}>({
  to: builder,
}: {
  to: yargs.Argv<T>;
}): yargs.Argv<T> {
  return builder
    .command(
      "install [--force]",
      "adds configuration files to project",
      {
        force: {
          describe: "overwrite existing configuration files without prompting",
          type: "boolean",
          default: overwriteFilesWithoutPromptingDefault,
        },
      },
      install,
    )
    .command(
      "uninstall [--force]",
      "removes configuration files from project",
      {
        force: {
          describe: "remove existing configuration files without prompting",
          type: "boolean",
          default: overwriteFilesWithoutPromptingDefault,
        },
      },
      uninstall,
    );
}
