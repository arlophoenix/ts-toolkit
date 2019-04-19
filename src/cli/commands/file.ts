import fs from "fs";
import path from "path";

import yargs from "yargs";

/* eslint-disable no-console */
export function newFile({ path: filePath }: { path?: string } = {}): void {
  if (!filePath || filePath.length === 0) {
    console.error("path is required");
    return;
  }
  if (fs.existsSync(filePath)) {
    console.error("file already exists");
    return;
  }

  const extension = path.extname(filePath);
  if (extension.length > 0) {
    const dirname = path.dirname(filePath);
    const fileName = path.basename(filePath, extension);
    fs.mkdirSync(dirname, { recursive: true });
    fs.writeFileSync(`${dirname}/${fileName}${extension}`, "");
    fs.writeFileSync(`${dirname}/${fileName}.test${extension}`, "");
  } else {
    fs.mkdirSync(filePath, { recursive: true });
    fs.writeFileSync(`${filePath}/index.ts`, "");
    fs.writeFileSync(`${filePath}/index.test.ts`, "");
  }
}
/* eslint-enable no-console */

export function addFileCommands<T = {}>({
  to: builder,
}: {
  to: yargs.Argv<T>;
}): yargs.Argv<T> {
  return builder.command(
    "newFile <path>",
    "create file and test partner at path",
    b =>
      b.positional("path", {
        describe: "path (directory or file) at which the file will be created",
        type: "string",
      }),
    newFile,
  );
}
