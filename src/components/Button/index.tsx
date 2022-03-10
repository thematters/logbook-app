/* eslint-disable react/display-name */
import classNames from "classnames";
import Link from "next/link";
import { forwardRef, RefObject, useRef } from "react";
import { capitalizeFirstLetter } from "~/utils";

import styles from "./styles.module.css";

export type ButtonSize = string;

export type ButtonRadius = string;

export type ButtonSpacingY = 0 | "xxTight" | "xTight" | "tight" | "base";

export type ButtonSpacingX =
  | 0
  | "xxTight"
  | "xTight"
  | "tight"
  | "base"
  | "loose";

type ButtonColor =
  | "gold"
  | "red"
  | "black"
  | "greyDarker"
  | "greyDark"
  | "grey"
  | "greyLight"
  | "greyLighter"
  | "greenLighter"
  | "white"
  | "noir"
  | "blueGreen"
  | "blueGreenDarker"
  | "lightMetal"
  | "lightMetalHover"
  | "heavyMetal"
  | "heavyMetalHover"
  | "navBtn";

export type ButtonBgColor = Extract<
  ButtonColor,
  | "greyDarker"
  | "grey"
  | "greyLighter"
  | "greenLighter"
  | "gold"
  | "red"
  | "white"
  | "black"
  | "blueGreen"
  | "blueGreenDarker"
  | "lightMetal"
  | "lightMetalHover"
  | "heavyMetal"
  | "heavyMetalHover"
  | "navBtn"
>;

export type ButtonProps = {
  width?: ButtonSize;
  height?: ButtonSize;
  spacing?: [ButtonSpacingY, ButtonSpacingX];

  bgColor?: ButtonBgColor;
  bgActiveColor?: ButtonBgColor;

  borderRadius?: ButtonRadius;
  shadow?: boolean;

  href?: string;
  replace?: boolean;

  is?: "span";

  ref?: RefObject<any> | ((instance: any) => void) | null | undefined;

  // navtive props
  htmlHref?: string;
  htmlTarget?: "_blank";
  type?: "button" | "submit";
  onClick?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any;
  onMouseEnter?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any;
  onMouseLeave?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any;
  [key: string]: any;
};

/**
 * `<Button>` is an inline-block element with centered children.
 *
 * Usage:
 *
 * ```jsx
 *  // with custom spacing
 *  <Button
 *    spacing={['xtight', 'xtight']}
 *    onClick={onClick}
 *  >
 *    <IconBookmarked16 />
 *  </Button>
 *
 *  // with custom size, border, hover background
 *  <Button
 *    width='4rem'
 *    height='1.5rem'
 *    bgActiveColor="green"
 *    borderColor="green"
 *    onClick={onClick}
 *  >
 *    <TextIcon weight="md" size="xs">
 *      <Translate id="follow" />
 *    </TextIcon>
 *  </Button>
 *
 *  // with custom text
 *  <Button
 *    width='4rem'
 *    height='1.5rem'
 *    bgActiveColor="green"
 *    borderColor="green"
 *    onClick={onClick}
 *  >
 *    <TextIcon color="blueGreen">
 *        text
 *    </TextIcon>
 *  </Button>
 * ```
 */

export const Button: React.FC<ButtonProps> = forwardRef(
  (
    {
      spacing = [0, 0],
      width,
      height,

      bgColor = "",
      bgActiveColor = "",

      borderRadius,
      shadow,

      href,
      replace,

      is,

      htmlHref,
      htmlTarget,
      type = "button",

      children,
      className,
      ...restProps
    },
    ref
  ) => {
    const fallbackRef = useRef(null);
    const buttonRef = (ref || fallbackRef) as React.RefObject<any> | null;
    const isTransparent = !bgColor;
    const [spacingY, spacingX] = spacing;

    // container
    const containerClasses = classNames(
      {
        container: true,
        isTransparent,
        [styles.centeringX]: width && isTransparent,
        [styles.centeringY]: height && isTransparent,
        [styles.spacingY]: !!spacingY,
        [styles[spacingY]]: !!spacingY,
        [styles.spacingX]: !!spacingX,
        [styles[spacingX]]: !!spacingX,
        [styles[`bg${capitalizeFirstLetter(bgColor)}`]]: bgColor !== "",
        [styles[`bgActive${capitalizeFirstLetter(bgActiveColor)}`]]:
          bgActiveColor !== "",
        [styles.shadow]: !!shadow,
      },
      className
    );

    // handle click
    const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (restProps.onClick) {
        restProps.onClick(event);
      }

      // blur on click
      if (buttonRef?.current) {
        buttonRef.current.blur();
      }
    };

    const containerProps = {
      ...restProps,
      onClick,
      ref: buttonRef as React.RefObject<any>,
      className: containerClasses,
      style: {
        borderRadius,
      }
    };

    // content
    const contentStyle = {
      width: (!isTransparent && width) || undefined,
      height: (!isTransparent && height) || undefined,
    };

    // hotarea
    const hotAreaStyle = {
      width: width || undefined,
      height: height || undefined,
      borderRadius,
    };

    // span
    if (is === "span") {
      return (
        <span {...containerProps}>
          <div className={styles.content} style={contentStyle}>
            <div className={styles.hotarea} style={hotAreaStyle} />
            {children}
          </div>
        </span>
      );
    }

    // anchor
    if (htmlHref) {
      return (
        <a href={htmlHref} target={htmlTarget} {...containerProps}>
          <div className={styles.content} style={contentStyle}>
            <div className={styles.hotarea} style={hotAreaStyle} />
            {children}
          </div>
        </a>
      );
    }

    // link
    if (href) {
      return (
        <Link href={href} replace={replace}>
          <a {...containerProps}>
            <div className={styles.content} style={contentStyle}>
              <div className={styles.hotarea} style={hotAreaStyle} />
              {children}
            </div>
          </a>
        </Link>
      );
    }

    // button
    return (
      <button {...containerProps} type={type}>
        <div className={styles.content} style={contentStyle}>
          <div className={styles.hotarea} style={hotAreaStyle} />
          {children}
        </div>
      </button>
    );
  }
);
