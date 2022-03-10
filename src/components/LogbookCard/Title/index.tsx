import React from "react";

import { TextIcon, IconGiftSign } from "~/components";
import classNames from "classnames";

import styles from "./styles.module.css";

export interface TitleProps {
  title: string;
  date?: Date;
  giftSign?: boolean;
  fixedHeight?: boolean;
}

const betweenDays = function (date1: Date, date2: Date) {
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const differenceMs = Math.abs(date1.getTime() - date2.getTime());
  return Math.round(differenceMs / ONE_DAY);
};

const lessThan3Days = function (date: Date) {
  let nowDate = new Date(Date.now());
  let bd = betweenDays(nowDate, date);
  return bd < 3;
};

export const Title: React.FC<TitleProps> = ({
  title,
  date,
  giftSign,
  fixedHeight,
}) => {
  let hasGiftSign = false;
  console.log({ fixedHeight });
  const containerClasses = classNames({
    [styles.titleContainer]: true,
    [styles.fixedHeight]: !!fixedHeight,
  });
  const contentClasses = classNames({
    [styles.content]: true,
    [styles.fixedHeight]: !!fixedHeight,
  });
  if (giftSign && !!date && lessThan3Days(date)) {
    hasGiftSign = true;
  }
  if (hasGiftSign) {
    return (
      <section className={containerClasses}>
        <IconGiftSign size="xxs" className={styles.giftSign} />
        <p className={contentClasses}>{title}</p>
      </section>
    );
  }
  return (
    <section className={containerClasses}>
      <p className={contentClasses}>{title}</p>
    </section>
  );
};
