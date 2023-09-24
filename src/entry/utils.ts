import { State } from "./reducer";

const MAIN_CATEGORY_NAME = "mains";
const CHEESECAKE_ITEM_NAME = "Cheesecake";
const UNORDERABLE_ITEM_COUPLE = ["Prawn cocktail", "Salmon fillet"];

/** Goes through the selections made and returns all errors that need fixing. */
export function checkErrors(state: State) {
  const errors: string[] = [];
  let isCheesecakeSelected = false;

  Object.entries(state).forEach(([diner, items]) => {
    const prefixTag = `[Diner ${parseInt(diner) + 1}]`;

    if (items.length < 2) {
      const numItemsMissing = 2 - items.length;
      errors.push(
        `${prefixTag} Each diner must select from at least two courses. Please add ${numItemsMissing} more ${
          numItemsMissing > 1 ? "items" : "item"
        }.`
      );
    }
    if (items.filter((x) => x.category === MAIN_CATEGORY_NAME).length === 0) {
      errors.push(`${prefixTag} Please select at least one main item.`);
    }

    const categories = items.map((item) => item.category);
    if (categories.some((c, i) => categories.includes(c, i + 1))) {
      errors.push(
        `${prefixTag} Only one item within each course may be selected.`
      );
    }

    const isCheesecakeInItems = items.find(
      (item) => item.name === CHEESECAKE_ITEM_NAME
    );
    if (isCheesecakeInItems) {
      if (!isCheesecakeSelected) {
        isCheesecakeSelected = true;
      } else {
        errors.push(
          "There is only one piece of cheesecake left. One diner must deselect it."
        );
      }
    }

    const itemNames = items.map((item) => item.name);
    if (
      itemNames.includes(UNORDERABLE_ITEM_COUPLE[0]) &&
      itemNames.includes(UNORDERABLE_ITEM_COUPLE[1])
    ) {
      errors.push(
        `${prefixTag} You may not order ${UNORDERABLE_ITEM_COUPLE[0]} and ${UNORDERABLE_ITEM_COUPLE[1]} in the same meal for no discernible reason. Please deselect one of them.`
      );
    }
  });

  return errors.length ? errors : undefined;
}
