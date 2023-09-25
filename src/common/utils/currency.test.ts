import { formatPrice } from "./currency";

describe("Common - Utils - currency", () => {
  describe("formatPrice()", () => {
    it("properly formats an integer input", () => {
      const result = formatPrice(3);
      expect(result).toBe("$3");
    });

    it("properly formats a float input", () => {
      const result = formatPrice(3.5);
      expect(result).toBe("$3.50");
    });
  });
});
