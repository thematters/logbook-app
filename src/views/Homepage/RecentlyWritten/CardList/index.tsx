import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import classNames from "classnames";
import { ethers } from "ethers";

import SLIDE_CURSOR from "/public/images/recently-written-cursor.svg";

import { LogbookCard, LogbookCardProps } from "~/components";

import styles from "./styles.module.css";

export const CardList = () => {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    draggable: true,
    loop: false,
    containScroll: "trimSnaps",
  });
  const cardProps: LogbookCardProps = {
    title:
      "Purus facilisis netus velit pellentesque facilisis os josmlfks Purus facilisis netus velit pellentesque facilisis os josmlfks Purus facilisis netus velit pellentesque facilisis os josmlfks",
    content: `
      Diam dolor iaculis proin in etiam leo varius. Adipiscing lacus pretium a
      in cras nisl. Lectus rhoncus non sagittis nibh arcu pretium dictum lectus.
      Nunc interdum sit Diam dolor iaculis proin in etiam leo varius. Adipiscing lacus pretium a
      in cras nisl. Lectus rhoncus non sagittis nibh arcu pretium dictum lectus.
      Nunc interdum sit`,
    forkCount: ethers.BigNumber.from("5"),
    transferCount: ethers.BigNumber.from("10"),
    // tokenID: "0x12",
    txHash: "0xb4034922182a9111aa114aacc2975a4c0b570925",
    footerHash: true,
  };

  let data = new Array(10);
  data.fill({});
  const listItems = data.map((d, index) => (
    // TODO: use token id for key ?
    <li key={index}>
      <LogbookCard padding="loose" borderHover shadow {...cardProps}/>
    </li>
  ));



  const cls = classNames([styles.container, "cardListContainer"]);

  return (
    <div className={cls} ref={emblaRef}>
      <ul className={styles.cardList}>{listItems}</ul>
      <style global jsx>
        {`
          .cardListContainer {
            cursor: url(${SLIDE_CURSOR}), auto;
          }
        `}
      </style>
    </div>
  );
};
