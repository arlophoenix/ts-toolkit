import yargs from "yargs";

import { spawn } from "../../utils/spawn";
import { clean } from "./clean";

export function transpile(): void {
  spawn("yarn babel src --out-dir dist --copy-files --extensions .js,.ts");
}

const shouldCleanDefault = true;

export function build({
  clean: shouldClean = shouldCleanDefault,
}: {
  clean?: boolean;
} = {}): void {
  if (shouldClean) {
    clean();
  }
  transpile();
}

export function addBuildCommands<T = {}>({
  to: builder,
}: {
  to: yargs.Argv<T>;
}): yargs.Argv<T> {
  return builder.command(
    "build [--clean]",
    "clean and then transpile TS to JS",
    {
      clean: {
        describe: "optionally delete cached files before building",
        type: "boolean",
        default: shouldCleanDefault,
      },
    },
    build,
  );
}
