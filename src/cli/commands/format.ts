import { Argv } from "yargs";

import { defaultCodeGlob, defaultPrettierGlob } from "../../utils/globs";
import { spawn } from "../../utils/spawn";
import { addPositionalGlob } from "../../utils/yargs";

const formatEslintDefaultGlob = defaultCodeGlob;
export function formatEslint({
  glob = formatEslintDefaultGlob,
}: { glob?: string } = {}): void {
  spawn("yarn eslint --cache --format=pretty --fix", {}, glob);
}

const formatImportDefaultGlob = defaultCodeGlob;
export function formatImport({
  glob = formatImportDefaultGlob,
}: {
  glob?: string;
} = {}): void {
  spawn("yarn import-sort --write", {}, glob);
}

export function formatPackage(): void {
  spawn("yarn prettier-package-json --write");
}

const formatPrettierDefaultGlob = defaultPrettierGlob;
export function formatPrettier({
  glob = formatPrettierDefaultGlob,
}: {
  glob?: string;
} = {}): void {
  spawn("yarn prettier --write", {}, glob);
}

export function format(): void {
  formatPackage();
  formatPrettier();
  formatImport();
  formatEslint();
}

export function addFormatCommands<T = {}>({
  to: builder,
}: {
  to: Argv<T>;
}): Argv<T> {
  return builder
    .command("format", "update files to conform to styleguide", {}, format)
    .command(
      "format:eslint [glob]",
      "update code files to conform with styleguide",
      b => addPositionalGlob(formatEslintDefaultGlob, { to: b }),
      formatEslint,
    )
    .command(
      "format:import [glob]",
      "order imports within code files to conform with styleguide",
      b => addPositionalGlob(formatImportDefaultGlob, { to: b }),
      formatImport,
    )
    .command(
      "format:package",
      "update package.json to comply with styleguide",
      {},
      formatPackage,
    )
    .command(
      "format:prettier [glob]",
      "update non-code files to conform with styleguide",
      b => addPositionalGlob(formatPrettierDefaultGlob, { to: b }),
      formatPrettier,
    );
}
