import { Argv } from "yargs";

import { defaultCodeGlob, defaultPrettierGlob } from "../../utils/globs";
import { spawn } from "../../utils/spawn";
import { addPositionalGlob } from "../../utils/yargs";

const lintEslintDefaultGlob = defaultCodeGlob;
const createReportDefault = false;
export function lintEslint({
  glob = lintEslintDefaultGlob,
  report: createReport = createReportDefault,
}: {
  glob?: string;
  report?: boolean;
} = {}): void {
  const additionalArguments = [glob];
  if (createReport) {
    "--format junit --output-file reports/junit/lint.xml"
      .split(" ")
      .forEach(argument => additionalArguments.push(argument));
  }
  spawn(
    "yarn eslint --cache --format=pretty --max-warnings=0",
    {},
    ...additionalArguments,
  );
}

const lintImportDefaultGlob = defaultCodeGlob;
export function lintImport({
  glob = lintImportDefaultGlob,
}: {
  glob?: string;
} = {}): void {
  spawn("yarn import-sort --list-different", {}, glob);
}

export function lintPackage(): void {
  spawn("yarn prettier-package-json --list-different");
}

const lintPrettierDefaultGlob = defaultPrettierGlob;
export function lintPrettier({
  glob = lintPrettierDefaultGlob,
}: {
  glob?: string;
} = {}): void {
  spawn("yarn prettier --list-different", {}, glob);
}

export function lint({
  report: createReport = createReportDefault,
}: {
  report?: boolean;
} = {}): void {
  lintPackage();
  lintPrettier();
  lintImport();
  lintEslint({ report: createReport });
}

export function addLintCommands<T = {}>({
  to: builder,
}: {
  to: Argv<T>;
}): Argv<T> {
  return builder
    .command(
      "lint [--report]",
      "checks file compliance with styleguide",
      {
        report: {
          describe:
            "if true creates a junit xml file containing the output of the linter. Intended for use in CI",
          type: "boolean",
          default: createReportDefault,
        },
      },
      lint,
    )
    .command(
      "lint:eslint [--report] [glob]",
      "checks code file compliance with styleguide",
      b =>
        addPositionalGlob(lintEslintDefaultGlob, { to: b }).option("report", {
          describe:
            "if true creates a junit xml file containing the output of the linter. Intended for use in CI",
          type: "boolean",
          default: createReportDefault,
        }),
      lintEslint,
    )
    .command(
      "lint:import [glob]",
      "checks imports within code files compliance with styleguide",
      b => addPositionalGlob(lintImportDefaultGlob, { to: b }),
      lintImport,
    )
    .command(
      "lint:prettier [glob]",
      "checks non-code file compliance with styleguide",
      b => addPositionalGlob(lintPrettierDefaultGlob, { to: b }),
      lintPrettier,
    );
}
