import classNames from "classnames";

import styles from "./styles.module.css";

import { useSafari } from "~/hooks/useSafari";

export type TextIconColor =
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
  | "heavyMetal"
  | "heavyMetalHover";

export interface TextIconProps {
  icon?: React.ReactNode;

  color?: TextIconColor;
  size?: "xs" | "sm" | "smS" | "mdS" | "md" | "xm" | "lg" | "xl";
  spacing?: 0 | "xxxTight" | "xxTight" | "xTight" | "tight" | "base" | "loose";
  weight?: "light" | "normal" | "medium" | "bold";

  textPlacement?: "bottom" | "left" | "right";
  underline?: boolean;

  onClick?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any;
}

/**
 * `<TextIcon>` component that combines text and `<Icon>` to render as left-right/top-bottom layout.
 *
 * Usage:
 *
 * ```jsx
 * <TextIcon
 *   icon={<Icon id={ICON_MAT_GOLD.id}
 *   viewBox={ICON_MAT_GOLD.viewBox}
 * >
 *  123
 * </TextIcon>} />
 * ```
 */

export const TextIcon: React.FC<TextIconProps> = ({
  icon,

  color,
  size,
  spacing,
  weight,

  textPlacement = "right",
  underline,

  children,
  ...rest
}) => {
  const textIconClasses = classNames({
    [styles.textIcon]: true,
    [styles.color]: !!color,
    ...(color ? { [styles[color]]: true } : {}),
    [styles.placement]: true,
    [styles[textPlacement]]: true,
    [styles.underline]: !!underline,
    [styles.size]: !!size,
    ...(size ? { [styles[size]]: true } : {}),
    [styles.spacing]: !!spacing,
    ...(spacing ? { [styles[spacing]]: true } : {}),
    [styles.weight]: !!weight,
    ...(weight ? { [styles[weight]]: true } : {}),
    [styles.hasIcon]: !!icon,
    [styles.textIconSafari]: useSafari(),
  });
  const textClasses = classNames({
    [styles.text]: true,
    [styles.textSafari]: useSafari(),
  });

  if (textPlacement === "left") {
    return (
      <span className={textIconClasses} {...rest}>
        {children && <span className={textClasses}>{children}</span>}

        {icon}
      </span>
    );
  }

  return (
    <span className={textIconClasses} {...rest}>
      {icon}

      {children && <span className={textClasses}>{children}</span>}
    </span>
  );
};
