import { SpawnSyncOptions, SpawnSyncReturns } from "child_process";

import crossSpawn from "cross-spawn";
import shellQuote from "shell-quote";

export function spawn(
  commandAndArgs: string,
  {
    commandOptions = { stdio: "inherit" },
    exitOnError = true,
    verbose = true,
  }: {
    commandOptions?: SpawnSyncOptions;
    exitOnError?: boolean;
    verbose?: boolean;
  } = {},
  ...additionalArgs: string[]
): SpawnSyncReturns<Buffer> {
  const [command, ...parsedArgs] = shellQuote.parse(commandAndArgs) as string[];
  const args = parsedArgs.concat(additionalArgs);
  if (verbose) {
    // eslint-disable-next-line no-console
    console.log(command, args);
  }
  const response = crossSpawn.sync(command, args, commandOptions);

  if (exitOnError && response.status !== 0) {
    process.exit(response.status); // eslint-disable-line unicorn/no-process-exit
  }

  return response;
}
