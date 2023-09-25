import React from "react";

import { ReactSvgComponent } from "../../models/svg";

import styles from "./styles.module.scss";
import { ReactComponent as SuccessIcon } from "./success-icon.svg";
import { ReactComponent as ErrorIcon } from "./error-icon.svg";

import { AlertType } from "./models";

type Props = {
  type: AlertType;
  message: string;
  className?: string;
  testId?: string;
};

const iconMap: { [type in AlertType]: ReactSvgComponent } = {
  [AlertType.SUCCESS]: SuccessIcon,
  [AlertType.ERROR]: ErrorIcon,
};

export const Alert = ({ type, message, className, testId }: Props) => {
  const Icon = iconMap[type];
  return (
    <aside
      className={`${styles.alert} ${styles[type]} ${className || ""}`}
      data-testid={testId}
    >
      <Icon />
      <span className={styles.message}>{message}</span>
    </aside>
  );
};
