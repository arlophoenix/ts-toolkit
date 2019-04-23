import fs from "fs";
import path from "path";

import yargs from "yargs";

import { spawn } from "../../utils/spawn";

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

  let extension = path.extname(filePath);
  let dirname;
  let fileName;
  if (extension.length > 0) {
    dirname = path.dirname(filePath);
    fileName = path.basename(filePath, extension);
  } else {
    dirname = filePath;
    fileName = "index";
    extension = ".ts";
  }
  const file = `${dirname}/${fileName}${extension}`;
  const testFile = `${dirname}/${fileName}.test${extension}`;
  fs.mkdirSync(dirname, { recursive: true });
  [file, testFile].forEach(f => {
    fs.writeFileSync(f, "");
    spawn("open", {}, f);
  });
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
