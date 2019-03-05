import yargs from "yargs";

import { spawn } from "../../utils/spawn";

export function clean(): void {
  spawn("rm -rf dist coverage reports .eslintcache yarn-error.log");
}

export function addCleanCommands<T = {}>({
  to: builder,
}: {
  to: yargs.Argv<T>;
}): yargs.Argv<T> {
  return builder.command(
    "clean",
    "delete cached, non-tracked files",
    {},
    clean,
  );
}
