import { formatCategoryName } from "./utils";

describe("Menu - utils", () => {
  describe("formatCategoryName()", () => {
    it("should capitalize the first character of the input", () => {
      const result = formatCategoryName("test");
      expect(result).toBe("Test");
    });

    it("should return an empty string if the input was empty", () => {
      const result = formatCategoryName("");
      expect(result).toBe("");
    });
  });
});
