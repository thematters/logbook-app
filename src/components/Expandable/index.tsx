import classNames from "classnames";
import React from "react";

import { IconMinus, IconPlus } from "~/components";

import * as styles from "./styles.module.css";

interface ExpandableProps {
  customStyles?: React.CSSProperties;
  title?: React.ReactNode;
  content?: React.ReactNode;
  hasBorder?: boolean;
}

export const Expandable = ({
  customStyles,
  title,
  content,
  hasBorder,
}: ExpandableProps) => {
  const [opened, setOpened] = React.useState<boolean>(false);

  const itemClasses = classNames({
    [styles.item]: true,
    [styles.hasBorder]: hasBorder,
  });

  return (
    <section className={styles.container} style={customStyles}>
      <section
        className={itemClasses}
        onClick={() => {
          // TODO: add analytics
          setOpened(!opened);
        }}
      >
        <section className={styles.title}>{title}</section>
        <section>
          {opened ? <IconMinus size="lg" /> : <IconPlus size="lg" />}
        </section>
      </section>
      {opened && <section className={styles.content}>{content}</section>}
    </section>
  );
};
