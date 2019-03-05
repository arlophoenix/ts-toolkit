import { Argv } from "yargs";

export function addPositionalGlob<T = {}, U = {}>(
  glob: string,
  {
    to: builder,
  }: {
    to: Argv<T>;
  },
): Argv<
  T & {
    glob: string;
  }
> {
  return builder.positional("glob", {
    describe: "determines which files are affected",
    type: "string",
    default: glob,
  });
}
