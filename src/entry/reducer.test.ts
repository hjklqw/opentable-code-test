import { AppAction } from "../common/models/action";
import { MenuItem } from "../common/models/menu";

import { reducer } from "./reducer";

const testItem: MenuItem & { category: string } = {
  id: 0,
  name: "",
  price: 1,
  category: "",
};

describe("Entry - reducer", () => {
  it("Action ADD_SELECTION adds the payload's item to the correct diner", () => {
    const initialState = { 0: [testItem, testItem], 1: [testItem] };
    const newItem = { ...testItem, name: "New item" };

    const newState = reducer(initialState, {
      type: AppAction.ADD_SELECTION,
      payload: {
        dinerIndex: 1,
        item: newItem,
      },
    });

    expect(newState[0]).toBe(initialState[0]);
    expect(newState[1]).toEqual([...initialState[1], newItem]);
  });

  it("Action REMOVE_SELECTION removes the payload's item from the correct diner", () => {
    const initialState = {
      0: [testItem, { ...testItem, id: 5 }, testItem],
      1: [testItem],
    };

    const newState = reducer(initialState, {
      type: AppAction.REMOVE_SELECTION,
      payload: {
        dinerIndex: 0,
        itemId: 5,
      },
    });

    expect(newState[0]).toEqual([testItem, testItem]);
    expect(newState[1]).toBe(initialState[1]);
  });
});
