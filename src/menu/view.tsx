import React from "react";
import { Menu, MenuItem } from "../common/models/menu";

import { MenuItemView } from "./item";
import { formatCategoryName } from "./utils";
import styles from "./styles.module.scss";

type Props = {
  menu: Menu;
  selectedItems: MenuItem[];
  onToggleSelection: (
    item: MenuItem,
    category: string,
    isSelected: boolean
  ) => void;
};

export const MenuView = ({ menu, selectedItems, onToggleSelection }: Props) => (
  <div className={styles.wrapper}>
    {Object.entries(menu).map(([category, items]) => (
      <section key={category} className={styles.menuSection}>
        <h2>{formatCategoryName(category)}</h2>
        <ul className={styles.itemList}>
          {items.map((item) => (
            <li key={item.id}>
              <MenuItemView
                model={item}
                isSelected={selectedItems.some(
                  (selection) => selection.id === item.id
                )}
                onToggleSelection={(isSelected) =>
                  onToggleSelection(item, category, isSelected)
                }
              />
            </li>
          ))}
        </ul>
      </section>
    ))}
  </div>
);
