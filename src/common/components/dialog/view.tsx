import React, { useState } from "react";

import styles from "./styles.module.scss";

type Props = {
  message: string | JSX.Element;
  className?: string;
  testId?: string;
};

/** A dialog that is open by default, and has a close button. */
export const Dialog = ({ message, className, testId }: Props) => {
  const [isOpen, setOpen] = useState<boolean>(true);

  if (!isOpen) {
    return null;
  }

  return (
    <dialog
      className={`${styles.wrapper} ${className || ""}`}
      data-testid={testId}
    >
      <button onClick={() => setOpen(false)} title="Close">
        ✕
      </button>
      <div className={styles.message}>{message}</div>
    </dialog>
  );
};
