import React, { useState } from "react";
import classNames from "classnames";

import { useResponsive, useDialogSwitch } from "~/hooks";

import { Header } from "./Header";
import ItemList from "./ItemList";

import styles from "./styles.module.css";

export const Nav = () => {
  const { show, setShow, closeDialog } = useDialogSwitch(false);
  const isSmallUp = useResponsive("sm-up");
  const cls = classNames({
    [styles.navWrapper]: true,
    [styles.show]: show,
  });

  if (isSmallUp) {
    return (
      <div className={styles.nav}>
        <div className={styles.navWrapper}>
          <Header show={show} onClick={() => setShow(!show)} />
          <ItemList show={show} onClick={closeDialog} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.nav}>
      <div className={cls}>
        <Header show={show} onClick={() => setShow(!show)} />
        {show ? <ItemList show={show} onClick={closeDialog} /> : <></>}
      </div>
    </div>
  );
};
