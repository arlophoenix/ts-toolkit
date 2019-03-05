import * as spawnModule from "../../utils/spawn";
import { clean } from "./clean";

jest.mock("../../utils/spawn");

describe("clean module", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("clean command", () => {
    it("spawns rm", () => {
      clean();
      expect(spawnModule.spawn).toHaveBeenCalledWith(
        "rm -rf dist coverage reports .eslintcache yarn-error.log",
      );
    });
  });
});
