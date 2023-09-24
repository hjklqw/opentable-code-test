import { AppAction } from "../common/models/action";
import { MenuItem } from "../common/models/menu";

type MenuItemWithCategory = MenuItem & { category: string };

export type State = {
  [dinerIndex: number]: MenuItemWithCategory[];
};

export const initialState: State = { 0: [], 1: [] };

type Action = {
  type: AppAction;
  payload: {
    dinerIndex: number;
    item: MenuItemWithCategory;
  };
};

export function reducer(state: State, action: Action) {
  const dinerIndex = action.payload.dinerIndex;
  const dinerSelections = state[dinerIndex] || [];

  if (action.type === AppAction.ADD_SELECTION) {
    return {
      ...state,
      [dinerIndex]: [...dinerSelections, action.payload.item],
    };
  } else if (action.type === AppAction.REMOVE_SELECTION) {
    const itemIndex = dinerSelections.findIndex(
      (selection) => selection.id === action.payload.item.id
    );
    return {
      ...state,
      [dinerIndex]: [
        ...dinerSelections.slice(0, itemIndex),
        ...dinerSelections.slice(itemIndex + 1),
      ],
    };
  }
  return state;
}
