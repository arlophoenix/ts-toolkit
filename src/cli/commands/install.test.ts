import * as spawnModule from "../../utils/spawn";
import { install, uninstall } from "./install";

jest.mock("../../utils/spawn");

describe("install module", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("install command", () => {
    it("when force is true the cp includes the interactive flag", () => {
      install({ force: true, configPaths: ["foo"] });
      expect((spawnModule.spawn as jest.Mock).mock.calls[0][0]).toEqual(
        "cp -Rf",
      );
    });

    it("when force is false the cp includes the interactive flag", () => {
      install({ force: false, configPaths: ["foo"] });
      expect((spawnModule.spawn as jest.Mock).mock.calls[0][0]).toEqual(
        "cp -Ri",
      );
    });

    it("the cp includes the config paths and destination", () => {
      install({ configPaths: ["foo"] });
      expect(spawnModule.spawn).toHaveBeenCalledWith(
        "cp -Ri",
        {},
        "node_modules/ts-toolkit/foo",
        ".",
      );
    });
  });

  describe("uninstall command", () => {
    it("when force is true the rm includes the interactive flag", () => {
      uninstall({ force: true, configPaths: ["foo"] });
      expect((spawnModule.spawn as jest.Mock).mock.calls[0][0]).toEqual(
        "rm -Rf",
      );
    });

    it("when force is false the rm includes the interactive flag", () => {
      uninstall({ force: false, configPaths: ["foo"] });
      expect((spawnModule.spawn as jest.Mock).mock.calls[0][0]).toEqual(
        "rm -Ri",
      );
    });

    it("the rm includes the config paths", () => {
      uninstall({ configPaths: ["foo"] });
      expect(spawnModule.spawn).toHaveBeenCalledWith("rm -Ri", {}, "foo");
    });
  });
});
