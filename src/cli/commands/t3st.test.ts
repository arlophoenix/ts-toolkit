import * as spawnModule from "../../utils/spawn";
import { tdd, testJest, todos } from "./t3st";

jest.mock("../../utils/spawn");

describe("lint module", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("tdd command", () => {
    it("spawns jest", () => {
      tdd();
      expect(spawnModule.spawn).toHaveBeenCalledWith("yarn jest --watch");
    });
  });

  describe("testJest command", () => {
    it("spawns jest", () => {
      testJest();
      expect(spawnModule.spawn).toHaveBeenCalledWith("yarn jest --coverage");
    });
  });

  describe("todos command", () => {
    it("spawns leasot with default glob", () => {
      todos();
      expect(spawnModule.spawn).toHaveBeenCalledWith(
        "yarn leasot --ignore='node_modules/**','dist/**','.git/**'",
        {},
        "**/*.{js,ts}",
      );
    });

    it("uses custom glob in spawned leasot", () => {
      todos({ glob: "*.foo" });
      expect(spawnModule.spawn).toHaveBeenCalledWith(
        "yarn leasot --ignore='node_modules/**','dist/**','.git/**'",
        {},
        "*.foo",
      );
    });
  });
});
