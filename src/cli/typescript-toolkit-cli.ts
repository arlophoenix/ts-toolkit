import yargs from "yargs";

import { addBuildCommands } from "./commands/build";
import { addCleanCommands } from "./commands/clean";
import { addFileCommands } from "./commands/file";
import { addFormatCommands } from "./commands/format";
import { addInstallCommands } from "./commands/install";
import { addLintCommands } from "./commands/lint";
import { addTestCommands } from "./commands/t3st";

export class TypescriptToolkitCLI {
  protected parser: yargs.Argv<{}>;

  public constructor() {
    const builder = yargs;

    addBuildCommands({ to: builder });
    addCleanCommands({ to: builder });
    addFormatCommands({ to: builder });
    addInstallCommands({ to: builder });
    addLintCommands({ to: builder });
    addTestCommands({ to: builder });
    addFileCommands({ to: builder });

    builder.demandCommand().version();

    this.parser = builder;
  }

  public run(): void {
    this.parser.parse();
  }
}
