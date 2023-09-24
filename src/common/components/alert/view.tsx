import React from "react";

import { AlertType } from "./models";
import styles from "./styles.module.scss";

import { ReactComponent as SuccessIcon } from "./success-icon.svg";
import { ReactComponent as ErrorIcon } from "./error-icon.svg";
import { ReactSvgComponent } from "../../models/svg";

type Props = {
  type: AlertType;
  message: string;
  className?: string;
};

const iconMap: { [type in AlertType]: ReactSvgComponent } = {
  [AlertType.SUCCESS]: SuccessIcon,
  [AlertType.ERROR]: ErrorIcon,
};

export const Alert = ({ type, message, className }: Props) => {
  const Icon = iconMap[type];
  return (
    <aside className={`${styles.alert} ${styles[type]} ${className || ""}`}>
      <Icon />
      <span className={styles.message}>{message}</span>
    </aside>
  );
};
