import * as spawnModule from "../../utils/spawn";
import {
  formatEslint,
  formatImport,
  formatPackage,
  formatPrettier,
} from "./format";

jest.mock("../../utils/spawn");

describe("format module", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("formatEslint command", () => {
    it("spawns eslint with default glob", () => {
      formatEslint();
      expect(spawnModule.spawn).toHaveBeenCalledWith(
        "yarn eslint --cache --format=pretty --fix",
        {},
        "**/*.{js,ts}",
      );
    });

    it("uses custom glob in spawned eslint", () => {
      formatEslint({ glob: "*.foo" });
      expect(spawnModule.spawn).toHaveBeenCalledWith(
        "yarn eslint --cache --format=pretty --fix",
        {},
        "*.foo",
      );
    });
  });

  describe("formatImport command", () => {
    it("spawns import-sort with default glob", () => {
      formatImport();
      expect(spawnModule.spawn).toHaveBeenCalledWith(
        "yarn import-sort --write",
        {},
        "**/*.{js,ts}",
      );
    });

    it("uses custom glob in spawned import-sort", () => {
      formatImport({ glob: "*.foo" });
      expect(spawnModule.spawn).toHaveBeenCalledWith(
        "yarn import-sort --write",
        {},
        "*.foo",
      );
    });
  });

  describe("formatPackage command", () => {
    it("spawns prettier-package-json", () => {
      formatPackage();
      expect(spawnModule.spawn).toHaveBeenCalledWith(
        "yarn prettier-package-json --write",
      );
    });
  });

  describe("formatPrettier command", () => {
    it("spawns prettier with default glob", () => {
      formatPrettier();
      expect(spawnModule.spawn).toHaveBeenCalledWith(
        "yarn prettier --ignore-path .eslintignore --write",
        {},
        "**/*.{json,md,yaml,yml}",
      );
    });

    it("uses custom glob in spawned prettier", () => {
      formatPrettier({ glob: "*.foo" });
      expect(spawnModule.spawn).toHaveBeenCalledWith(
        "yarn prettier --ignore-path .eslintignore --write",
        {},
        "*.foo",
      );
    });
  });
});
