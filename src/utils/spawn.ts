import { SpawnSyncOptions, SpawnSyncReturns } from "child_process";

import crossSpawn from "cross-spawn";
import shellQuote from "shell-quote";

export function spawn(
  commandAndArguments: string,
  {
    commandOptions = { stdio: "inherit" },
    exitOnError = true,
    verbose = false,
  }: {
    commandOptions?: SpawnSyncOptions;
    exitOnError?: boolean;
    verbose?: boolean;
  } = {},
  ...additionalArguments: string[]
): SpawnSyncReturns<Buffer> {
  const [command, ...parsedArguments] = shellQuote.parse(
    commandAndArguments,
  ) as string[];
  const allArguments = parsedArguments.concat(additionalArguments);
  if (verbose) {
    // eslint-disable-next-line no-console
    console.log(command, allArguments);
  }
  const response = crossSpawn.sync(command, allArguments, commandOptions);

  if (exitOnError && response.status !== 0) {
    process.exit(response.status); // eslint-disable-line unicorn/no-process-exit
  }

  return response;
}
