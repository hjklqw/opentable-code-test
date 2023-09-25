import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Menu } from "../common/models/menu";
import { MenuView } from "./view";

type CheckboxProps = { isChecked: boolean };
jest.mock("../common/components/checkbox", () => ({
  Checkbox: ({ isChecked }: CheckboxProps) => (isChecked ? "[x]" : "[]"),
}));

const menu: Menu = {
  starters: [
    { id: 0, name: "Starter A", price: 2 },
    { id: 1, name: "Starter B", price: 3 },
    { id: 2, name: "Starter C", price: 5 },
  ],
  mains: [
    { id: 3, name: "Main A", price: 10.5 },
    { id: 4, name: "Main B", price: 23.87 },
    { id: 5, name: "Main C", price: 15 },
  ],
  desserts: [
    { id: 6, name: "Dessert A", price: 7.8 },
    { id: 7, name: "Dessert B", price: 5 },
    { id: 8, name: "Dessert C", price: 8 },
  ],
};

const onToggleSelection = jest.fn();

describe("Menu", () => {
  it("should render out the entire menu with proper category names and their items", () => {
    render(
      <MenuView
        menu={menu}
        selectedItems={[]}
        onToggleSelection={onToggleSelection}
      />
    );

    const categories = screen.getAllByRole("heading");
    const items = screen.getAllByRole("list");

    expect(categories[0]).toHaveTextContent("Starters");
    expect(items[0]).toHaveTextContent("Starter A - $2");
    expect(items[0]).toHaveTextContent("Starter B - $3");
    expect(items[0]).toHaveTextContent("Starter C - $5");

    expect(categories[1]).toHaveTextContent("Mains");
    expect(items[1]).toHaveTextContent("Main A - $10.50");
    expect(items[1]).toHaveTextContent("Main B - $23.87");
    expect(items[1]).toHaveTextContent("Main C - $15");

    expect(categories[2]).toHaveTextContent("Desserts");
    expect(items[2]).toHaveTextContent("Dessert A - $7.80");
    expect(items[2]).toHaveTextContent("Dessert B - $5");
    expect(items[2]).toHaveTextContent("Dessert C - $8");
  });

  it("should render selected items as selected", () => {
    const selectedItems = [menu.starters[1], menu.mains[2], menu.desserts[0]];

    render(
      <MenuView
        menu={menu}
        selectedItems={selectedItems}
        onToggleSelection={onToggleSelection}
      />
    );

    const items = screen.getAllByRole("listitem");

    // Starters
    expect(items[0]).toHaveTextContent("[]");
    expect(items[1]).toHaveTextContent("[x]");
    expect(items[2]).toHaveTextContent("[]");

    // Mains
    expect(items[3]).toHaveTextContent("[]");
    expect(items[4]).toHaveTextContent("[]");
    expect(items[5]).toHaveTextContent("[x]");

    // Desserts
    expect(items[6]).toHaveTextContent("[x]");
    expect(items[7]).toHaveTextContent("[]");
    expect(items[8]).toHaveTextContent("[]");
  });

  it("should pass the correct arguments to onToggleSelection()", () => {
    const selectedItems = [menu.starters[1], menu.mains[2], menu.desserts[0]];

    render(
      <MenuView
        menu={menu}
        selectedItems={selectedItems}
        onToggleSelection={onToggleSelection}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");

    userEvent.click(checkboxes[0]);
    expect(onToggleSelection).toHaveBeenCalledWith(
      menu.starters[0],
      "starters",
      false
    );

    userEvent.click(checkboxes[1]);
    expect(onToggleSelection).toHaveBeenCalledWith(
      menu.starters[1],
      "starters",
      true
    );

    userEvent.click(checkboxes[4]);
    expect(onToggleSelection).toHaveBeenCalledWith(
      menu.mains[1],
      "mains",
      false
    );

    userEvent.click(checkboxes[5]);
    expect(onToggleSelection).toHaveBeenCalledWith(
      menu.mains[2],
      "mains",
      true
    );

    userEvent.click(checkboxes[6]);
    expect(onToggleSelection).toHaveBeenCalledWith(
      menu.desserts[0],
      "desserts",
      true
    );

    userEvent.click(checkboxes[7]);
    expect(onToggleSelection).toHaveBeenCalledWith(
      menu.desserts[1],
      "desserts",
      false
    );
  });
});
