import Link from "next/link";
import React, { forwardRef, RefObject, useRef } from "react";

import * as styles from "./styles.module.css";

type SelectButtonProps = {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;

  leftIcon?: React.ReactNode;
  right?: React.ReactNode;

  href?: string;

  ref?: RefObject<any> | ((instance: any) => void) | null | undefined;

  // navtive props
  htmlHref?: string;
  htmlTarget?: "_blank";
  type?: "button" | "submit";
  disabled?: boolean;
  form?: string;
  rel?: string;
  onClick?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any;
  onMouseEnter?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any;
  onMouseLeave?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any;
};

export const SelectButton: React.FC<SelectButtonProps> = forwardRef(
  (
    {
      title,
      subtitle,
      leftIcon,
      right,

      href,

      htmlHref,
      htmlTarget,

      ...restProps
    },
    ref
  ) => {
    const fallbackRef = useRef(null);
    const buttonRef = (ref || fallbackRef) as React.RefObject<any> | null;

    const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (restProps.onClick) {
        restProps.onClick(event);
      }

      // blur on click
      if (buttonRef?.current) {
        buttonRef.current.blur();
      }
    };

    const buttonProps = {
      ...restProps,
      onClick,
      ref: buttonRef as React.RefObject<any>,
      className: styles.selectButton,
    };

    const Content = () => (
      <section className={styles.content}>
        <section className={styles.left}>
          {leftIcon && <section className={styles.icon}>{leftIcon}</section>}

          <section className={styles.title}>
            <h5>{title}</h5>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </section>
        </section>

        {right && <section className={styles.right}>{right}</section>}
      </section>
    );

    // external link
    if (htmlHref) {
      return (
        <a href={htmlHref} target={htmlTarget} {...buttonProps}>
          <Content />
        </a>
      );
    }

    // internal link
    if (href) {
      return (
        <Link href={href}>
          <a {...buttonProps}>
            <Content />
          </a>
        </Link>
      );
    }

    // button
    return (
      <button {...buttonProps} type="button">
        <Content />
      </button>
    );
  }
);
