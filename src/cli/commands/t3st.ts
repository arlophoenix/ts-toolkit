import { Argv } from "yargs";

import { defaultCodeGlob } from "../../utils/globs";
import { spawn } from "../../utils/spawn";
import { addPositionalGlob } from "../../utils/yargs";
import { lint } from "./lint";

export function tdd(): void {
  spawn("yarn jest --watch");
}

const createReportDefault = false;
const onlyChangedDefault = false;
export function testJest({
  report: createReport = createReportDefault,
  onlyChanged = onlyChangedDefault,
}: {
  report?: boolean;
  onlyChanged?: boolean;
} = {}): void {
  let baseJest = "yarn jest --coverage";
  if (onlyChanged) {
    baseJest += " --onlyChanged";
  }
  if (createReport) {
    spawn(
      `${baseJest} --ci --maxWorkers=2 --reporters=default --reporters=jest-junit`,
      {
        commandOptions: {
          // eslint-disable-next-line unicorn/prevent-abbreviations
          env: { ...process.env, JEST_JUNIT_OUTPUT: "reports/junit/tests.xml" },
        },
      },
    );
    return;
  }

  spawn(baseJest);
}

const todosDefaultGlob = defaultCodeGlob;
export function todos({
  glob = todosDefaultGlob,
}: {
  glob?: string;
} = {}): void {
  spawn("yarn leasot --ignore='node_modules/**','dist/**','.git/**'", {}, glob);
}

export function test({
  report: createReport = createReportDefault,
}: {
  report?: boolean;
} = {}): void {
  todos();
  lint({ report: createReport });
  testJest({ report: createReport });
}

export function addTestCommands<T = {}>({
  to: builder,
}: {
  to: Argv<T>;
}): Argv<T> {
  return builder
    .command("tdd", "run tests on file changes", {}, tdd)
    .command(
      "test [--report]",
      "validates code conforms to styleguide and works as expected",
      {
        report: {
          describe:
            "if true creates a junit xml file containing the output of the tests. Intended for use in CI",
          type: "boolean",
          default: createReportDefault,
        },
      },
      test,
    )
    .command(
      "test:jest [--report] [--onlyChanged]",
      "run tests",
      {
        report: {
          describe:
            "if true creates a junit xml file containing the output of the tests. Intended for use in CI",
          type: "boolean",
          default: createReportDefault,
        },
        onlyChanged: {
          describe: "if true only runs tests against changed files",
          type: "boolean",
          default: onlyChangedDefault,
        },
      },
      testJest,
    )
    .command(
      "todos [glob]",
      "checks files for presence of todo. Great while writing code but should become explanatory comments or tracked as future work before sharing.",
      b => addPositionalGlob(todosDefaultGlob, { to: b }),
      todos,
    );
}
