import React from "react";

import { ReactComponent as BaseIcon } from "./base-icon.svg";
import { ReactComponent as CheckedIcon } from "./checked-icon.svg";
import styles from "./styles.module.scss";

type Props = {
  isChecked: boolean;
};

/**
 * A custom checkbox where state is handled outside of it.
 * Because it is not responsible for events, a real input is not used,
 * to avoid it capturing click events (even though it would otherwise be
 * more semantically correct to use an invisible HTML checkbox with a <label>).
 */
export const Checkbox = ({ isChecked }: Props) => (
  <div className={`${styles.wrapper} ${isChecked ? styles.checked : ""}`}>
    {isChecked ? <CheckedIcon /> : <BaseIcon />}
  </div>
);
