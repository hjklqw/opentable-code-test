import React from "react";

import { MenuItem } from "../common/models/menu";
import { Checkbox } from "../common/components/checkbox";
import { formatPrice } from "../common/utils/currency";

import styles from "./styles.module.scss";

type Props = {
  model: MenuItem;
  isSelected: boolean;
  onToggleSelection: (isSelected: boolean) => void;
};

export const MenuItemView = ({
  model,
  isSelected,
  onToggleSelection,
}: Props) => (
  <div
    className={styles.menuItem}
    onClick={() => onToggleSelection(isSelected)}
    role="checkbox"
    aria-checked={isSelected}
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter") onToggleSelection(isSelected);
    }}
  >
    <span>
      {model.name} - {formatPrice(model.price)}
    </span>
    <Checkbox isChecked={isSelected} />
  </div>
);
