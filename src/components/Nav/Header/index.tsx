/* eslint-disable react/display-name */
import React, { forwardRef } from "react";

import { IconMenu, IconClear, Button, TextIcon } from "~/components";

import { useResponsive } from "~/hooks";

import Socials from "./Socials";

import styles from "./styles.module.css";

export type HeaderProps = {
  show: boolean;
  onClick: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any;
};

export const Header: React.FC<HeaderProps> = forwardRef(
  ({ show, onClick }, ref) => {
    const isSmallUp = useResponsive("sm-up");
    let iconStyle = { width: 26, height: 22.5 };
    if (isSmallUp) {
      iconStyle = { width: 45, height: 40 };
    }
    return (
      <div className={styles.header}>
        {show && !isSmallUp ? <Socials /> : <></>}
        <span className={styles.button}>
          <Button onClick={onClick} ref={ref}>
            <TextIcon>
              {show ? (
                <IconClear
                  style={iconStyle}
                  className={styles.close}
                ></IconClear>
              ) : (
                <IconMenu style={iconStyle} className={styles.menu} />
              )}
            </TextIcon>
          </Button>
        </span>
      </div>
    );
  }
);
