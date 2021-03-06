/* eslint-disable react/display-name */
import React, { forwardRef, useState } from "react";
import Link from "next/link";
import classNames from "classnames";

import { TextIcon, Button, TextIconProps } from "~/components";
import { useResponsive } from "~/hooks";

import styles from "./styles.module.css";

type ItemProps = {
  text: string;
  icon: React.ReactNode;
  href?: string;
  replace?: boolean;
  onClick?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any;
  [key: string]: any;
};

const Item: React.FC<ItemProps> = ({
  text,
  icon,
  href,
  replace,
  className,
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

  const containerClasses = classNames(
    {
      [styles.item]: true,
    },
    className
  );

  const containerProps = {
    ...restProps,
    onClick,
    className: containerClasses,
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
      <section {...containerProps}>
        <Link href={href} replace={replace}>
          <a>{element}</a>
        </Link>
      </section>
    );
  }
  return <li {...containerProps}>{element}</li>;
};

export default Item;
