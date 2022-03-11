import React from "react";
import classNames from "classnames";

import styles from "./styles.module.css";

type CardSpacing = 0 | "xtight" | "tight" | "base" | "loose";

interface Props {
  spacing?: [CardSpacing, CardSpacing];
  bgColor?: "white" | "none";
  htmlHref?: string;
  htmlTarget?: "_blank";
  onClick?: () => any;
}

export const Card: React.FC<Props> = ({
  spacing = ["tight", "tight"],
  bgColor = "white",
  htmlHref,
  htmlTarget,
  onClick,
  children,
}) => {
  const cardClasses = classNames({
    [styles.card]: true,
    [styles[`spacing-y-${spacing[0]}`]]: !!spacing[0],
    [styles[`spacing-x-${spacing[1]}`]]: !!spacing[1],
    [styles.bgWhite]: bgColor === "white",
  });

  const handler = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest("button") && onClick) {
      onClick?.();
    }

    if (htmlHref) {
      window.open(htmlHref, htmlTarget);
    }
  };

  return (
    <section className={cardClasses} onClick={handler}>
      {children}
    </section>
  );
};
