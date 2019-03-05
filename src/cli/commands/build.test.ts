import * as spawnModule from "../../utils/spawn";
import { build, transpile } from "./build";
import * as cleanModule from "./clean";

jest.mock("../../utils/spawn");
jest.mock("./clean");

describe("build module", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("build command", () => {
    it("calls clean if shouldClean is true", () => {
      build({ clean: true });
      expect(cleanModule.clean).toHaveBeenCalled();
    });

    it("does not call clean if shouldClean is false", () => {
      build({ clean: false });
      expect(cleanModule.clean).not.toHaveBeenCalled();
    });

    it("defaults shouldClean to true", () => {
      build();
      expect(cleanModule.clean).toHaveBeenCalled();
    });
  });

  describe("transpile command", () => {
    it("spawns babel", () => {
      transpile();
      expect(spawnModule.spawn).toHaveBeenCalledWith(
        "yarn babel src --out-dir dist --copy-files --extensions .js,.ts",
      );
    });
  });
});
