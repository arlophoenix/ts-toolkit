import { Argv } from "yargs";

import { defaultCodeGlob } from "../../utils/globs";
import { spawn } from "../../utils/spawn";
import { addPositionalGlob } from "../../utils/yargs";
import { lint } from "./lint";

export function tdd(): void {
  spawn("yarn jest --watch");
}

export function testJest({
  report: createReport = false,
}: {
  report?: boolean;
} = {}): void {
  const baseJest = "yarn jest --coverage";
  if (createReport) {
    spawn(
      `${baseJest} --ci --maxWorkers=2 --reporters=default --reporters=jest-junit`,
      {
        commandOptions: {
          env: { ...process.env, JEST_JUNIT_OUTPUT: "reports/junit/tests.xml" },
        },
      },
    );
  } else {
    spawn(baseJest);
  }
}

const todosDefaultGlob = defaultCodeGlob;
export function todos({
  glob = todosDefaultGlob,
}: {
  glob?: string;
} = {}): void {
  spawn("yarn leasot --ignore='node_modules/**','dist/**','.git/**'", {}, glob);
}

export function test(): void {
  todos();
  lint();
  testJest();
}

export function addTestCommands<T = {}>({
  to: builder,
}: {
  to: Argv<T>;
}): Argv<T> {
  return builder
    .command("tdd", "run tests on file changes", {}, tdd)
    .command(
      "test",
      "validates code conforms to styleguide and works as expected",
      {},
      test,
    )
    .command(
      "test:jest [report]",
      "run tests",
      {
        report: {
          describe:
            "if true creates a junit xml file containing the output of the tests. Intended for use in CI",
          type: "boolean",
          default: false,
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
