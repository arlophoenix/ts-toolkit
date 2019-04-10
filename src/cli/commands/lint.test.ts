import * as spawnModule from "../../utils/spawn";
import { lintEslint, lintImport, lintPackage, lintPrettier } from "./lint";

jest.mock("../../utils/spawn");

describe("lint module", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("lintEslint command", () => {
    it("spawns eslint with default glob", () => {
      lintEslint();
      expect(spawnModule.spawn).toHaveBeenCalledWith(
        "yarn eslint --cache --format=pretty --max-warnings=0",
        {},
        "**/*.{js,ts}",
      );
    });

    it("uses custom glob in spawned eslint", () => {
      lintEslint({ glob: "*.foo" });
      expect(spawnModule.spawn).toHaveBeenCalledWith(
        "yarn eslint --cache --format=pretty --max-warnings=0",
        {},
        "*.foo",
      );
    });

    it("adds junit args to spawned eslint, when report is true", () => {
      lintEslint({ report: true });
      expect(spawnModule.spawn).toHaveBeenCalledWith(
        "yarn eslint --cache --format=pretty --max-warnings=0",
        {},
        "**/*.{js,ts}",
        "--format",
        "junit",
        "--output-file",
        "reports/junit/lint.xml",
      );
    });
  });

  describe("lintImport command", () => {
    it("spawns import-sort with default glob", () => {
      lintImport();
      expect(spawnModule.spawn).toHaveBeenCalledWith(
        "yarn import-sort --list-different",
        {},
        "**/*.{js,ts}",
      );
    });

    it("uses custom glob in spawned import-sort", () => {
      lintImport({ glob: "*.foo" });
      expect(spawnModule.spawn).toHaveBeenCalledWith(
        "yarn import-sort --list-different",
        {},
        "*.foo",
      );
    });
  });

  describe("lintPackage command", () => {
    it("spawns prettier-package-json", () => {
      lintPackage();
      expect(spawnModule.spawn).toHaveBeenCalledWith(
        "yarn prettier-package-json --list-different",
      );
    });
  });

  describe("lintPrettier command", () => {
    it("spawns prettier with default glob", () => {
      lintPrettier();
      expect(spawnModule.spawn).toHaveBeenCalledWith(
        "yarn prettier --list-different",
        {},
        "**/*.{json,md,yaml,yml}",
      );
    });

    it("uses custom glob in spawned prettier", () => {
      lintPrettier({ glob: "*.foo" });
      expect(spawnModule.spawn).toHaveBeenCalledWith(
        "yarn prettier --list-different",
        {},
        "*.foo",
      );
    });
  });
});
