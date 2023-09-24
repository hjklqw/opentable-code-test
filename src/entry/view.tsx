import React, { useEffect, useReducer, useState } from "react";

import { Menu, MenuItem } from "../common/models/menu";
import { AppAction } from "../common/models/action";
import { formatPrice } from "../common/utils/currency";
import { Alert, AlertType } from "../common/components/alert/";
import { Dialog } from "../common/components/dialog";
import { RESTAURANT_NAME } from "../common/utils/data";

import { MenuView } from "../menu";

import styles from "./styles.module.scss";
import { reducer, initialState } from "./reducer";
import { checkErrors } from "./utils";

const CANNOT_CHANGE_DINERS_MESSAGE =
  "This is a fixed party; the amount of diners cannot be modified.";

export const Entry = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currDinerIndex, setCurrDinerIndex] = useState<number>(0);
  const [errors, setErrors] = useState<string[]>();
  const [isSuccessful, setSuccessful] = useState<boolean>(false);
  const [menu, setMenu] = useState<Menu>();

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  if (!menu) {
    return <p>Loading...</p>;
  }

  function onToggleSelection(
    item: MenuItem,
    category: string,
    isSelected: boolean
  ) {
    const payload = { dinerIndex: currDinerIndex, item: { ...item, category } };
    if (isSelected) {
      dispatch({
        type: AppAction.REMOVE_SELECTION,
        payload,
      });
    } else {
      dispatch({
        type: AppAction.ADD_SELECTION,
        payload,
      });
    }
  }

  function onAddOrRemoveDiner() {
    if (errors?.includes(CANNOT_CHANGE_DINERS_MESSAGE)) return;
    setErrors(
      errors
        ? [CANNOT_CHANGE_DINERS_MESSAGE, ...errors]
        : [CANNOT_CHANGE_DINERS_MESSAGE]
    );
  }

  const total = Object.values(state).reduce(
    (result, items) =>
      result + items.reduce((dinerTotal, item) => dinerTotal + item.price, 0),
    0
  );

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>{RESTAURANT_NAME}</h1>

        <section className={styles.dinerControls}>
          <label>Diners</label>
          <div className={styles.buttonContainer}>
            <button onClick={onAddOrRemoveDiner}>-</button>
            <button onClick={onAddOrRemoveDiner}>+</button>
          </div>
        </section>

        <section className={styles.dinerSelector}>
          {Object.keys(state).map((dinerIndex) => {
            const index = parseInt(dinerIndex);
            return (
              <button
                key={dinerIndex}
                onClick={() => setCurrDinerIndex(index)}
                className={currDinerIndex === index ? styles.active : undefined}
              >
                Diner {index + 1}
              </button>
            );
          })}
        </section>
      </header>

      <main className={styles.main}>
        <section className={styles.menuContainer}>
          <MenuView
            menu={menu}
            selectedItems={state[currDinerIndex]}
            onToggleSelection={onToggleSelection}
          />
        </section>

        <section className={styles.dialogContainer}>
          <Dialog
            className={styles.welcomeDialog}
            message={
              <>
                <p>Hello,</p>
                <p>
                  Welcome to {RESTAURANT_NAME}! We're delighted to serve you
                  today. Should you need any assistance, do not hesitate to call
                  our wonderful server, Pierre.
                </p>
                <p>bon appétit</p>
              </>
            }
          />

          {errors &&
            errors.map((e) => (
              <Alert
                key={e}
                type={AlertType.ERROR}
                message={e}
                className={styles.errorAlert}
              />
            ))}

          {isSuccessful && (
            <Alert
              type={AlertType.SUCCESS}
              message="Success! Your order has been placed."
            />
          )}
        </section>
      </main>

      {total > 0 && (
        <footer className={styles.totalSection}>
          <span>Total: {formatPrice(total)}</span>
          <button
            className={styles.submitButton}
            disabled={isSuccessful}
            onClick={() => {
              const errors = checkErrors(state);
              if (errors) {
                setErrors(errors);
              } else {
                setErrors(undefined);
                setSuccessful(true);
              }
            }}
          >
            Submit
          </button>
        </footer>
      )}
    </div>
  );
};
