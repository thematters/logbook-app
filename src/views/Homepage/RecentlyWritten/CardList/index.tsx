import React from "react";
import useEmblaCarousel from "embla-carousel-react";
// import SLIDE_CURSOR from "@/static/images/cursor.svg";

import { LogbookCard } from "~/components";

import styles from "./styles.module.css";

export const CardList = () => {
  const [emblaRef] = useEmblaCarousel();
  let data = new Array(10);
  data.fill({});
  const listItems = data.map((d, index) => (
    // TODO: use token id for key ?
    <li key={index}>
      <LogbookCard padding="loose" borderHover shadow />
    </li>
  ));

  return (
    <div className={styles.container} ref={emblaRef}>
      <ul className={styles.cardList}>{listItems}</ul>
      {/* <style global jsx>
        {`
          .container {
            cursor: url(${SLIDE_CURSOR}), auto;
          }
        `}
      </style> */}
    </div>
  );
};
