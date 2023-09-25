import { MenuItem } from "../common/models/menu";
import { checkErrors } from "./utils";

const testItem: MenuItem & { category: string } = {
  id: 0,
  name: "",
  price: 1,
  category: "",
};

describe("Entry - utils", () => {
  describe("checkErrors() returns the correct errors for each affected diner when:", () => {
    it("less than two courses were selected", () => {
      const errors = checkErrors({
        0: [{ ...testItem, category: "mains" }],
        1: [],
      });
      expect(errors).toEqual([
        "[Diner 1] Each diner must select from at least two courses. Please add 1 more item.",
        "[Diner 2] Each diner must select from at least two courses. Please add 2 more items.",
        "[Diner 2] Please select one main item.",
      ]);
    });

    it("a main course was not selected", () => {
      const errors = checkErrors({
        0: [
          { ...testItem, category: "a" },
          { ...testItem, category: "mains" },
        ],
        1: [
          { ...testItem, category: "a" },
          { ...testItem, category: "b" },
        ],
      });
      expect(errors).toEqual(["[Diner 2] Please select one main item."]);
    });

    it("more than one item from the same course was selected", () => {
      const errors = checkErrors({
        0: [
          { ...testItem, category: "mains" },
          { ...testItem, category: "mains" },
        ],
        1: [
          { ...testItem, category: "a" },
          { ...testItem, category: "a" },
          { ...testItem, category: "mains" },
        ],
      });
      expect(errors).toEqual([
        "[Diner 1] Only one item within each course may be selected.",
        "[Diner 2] Only one item within each course may be selected.",
      ]);
    });

    it("more than one diner selects cheesecake", () => {
      const errors = checkErrors({
        0: [
          { ...testItem, name: "Cheesecake" },
          { ...testItem, category: "mains" },
        ],
        1: [
          { ...testItem, name: "Cheesecake" },
          { ...testItem, category: "mains" },
        ],
      });
      expect(errors).toEqual([
        "There is only one piece of cheesecake left. One diner must deselect it.",
      ]);
    });

    it("Prawn cocktail and Salmon fillet are ordered by the same diner", () => {
      const errors = checkErrors({
        0: [
          { ...testItem, name: "Prawn cocktail" },
          { ...testItem, name: "Salmon fillet", category: "mains" },
        ],
        1: [
          { ...testItem, name: "Cheesecake" },
          { ...testItem, category: "mains" },
        ],
      });
      expect(errors).toEqual([
        "[Diner 1] You may not order Prawn cocktail and Salmon fillet in the same meal for no discernible reason. Please deselect one of them.",
      ]);
    });
  });
});
