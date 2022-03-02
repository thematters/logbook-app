/* eslint-disable react/display-name */
import React, { forwardRef, useState } from "react";
import Link from "next/link";

import { TextIcon, Button, TextIconProps } from "~/components";
import { useResponsive } from "~/hooks";

import styles from "./styles.module.css";

type ItemProps = {
  text: string;
  icon: React.ReactNode;
  href?: string;
  replace?: boolean;
  onClick?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any;
};

const Item: React.FC<ItemProps> = ({
  text,
  icon,
  href,
  replace,
  ...restProps
}) => {
  const isSmallUp = useResponsive("sm-up");

  let textIconProps: TextIconProps = {
    textPlacement: "right",
    spacing: "base",
  };
  let buttonSize = "3rem";

  if (isSmallUp) {
    textIconProps = {
      textPlacement: "left",
      spacing: "loose",
    };
    buttonSize = "3.625rem";
  }

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (restProps.onClick) {
      restProps.onClick(event);
    }
  };

  const containerProps = {
    ...restProps,
    onClick,
    className: styles.item,
  };

  let element = (
    <TextIcon
      size="mdS"
      color="blueGreen"
      weight="bold"
      {...textIconProps}
      icon={
        <Button
          width={buttonSize}
          height={buttonSize}
          bgColor="navBtn"
          borderRadius="50%"
          className={styles.itemButton}
        >
          {icon}
        </Button>
      }
    >
      {text}
    </TextIcon>
  );

  if (href) {
    return (
      <li {...containerProps}>
        <Link href={href} replace={replace}>
          <a>{element}</a>
        </Link>
      </li>
    );
  }
  return <li {...containerProps}>{element}</li>;
};

export default Item;
