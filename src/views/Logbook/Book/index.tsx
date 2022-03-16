import React, { useContext, useEffect } from "react";
import classNames from "classnames";
import { Button, IconEmptyBook, TextIcon } from "~/components";
import { Nav } from "../Nav";
import { Transfer } from "../Transfer";
import { ButtonGroup } from "../ButtonGroup";
import { LogList } from "../LogList";

import styles from "./styles.module.css";

import { useResponsive, LogbookContext } from "~/hooks";
import type { Logbook } from "~/hooks";

export interface BookProps {
  id: string;
  isOwn: boolean;
  onEdit: () => any;
}

export const Book: React.FC<BookProps> = ({
  id,
  // publications,
  isOwn,
  onEdit,
}) => {
  const emptyBookStyle = { width: "12.5rem", height: "12.5rem" };
  const isSmallUp = useResponsive("sm-up");
  let buttonWidth = "19.4375rem";
  if (isSmallUp) {
    buttonWidth = "12.5rem";
  }

  const logbook = useContext(LogbookContext);

  useEffect(() => {
    console.log("title&summary: ", logbook);
  }, [logbook]);

  if (!logbook) return <></>;

  const titleClasses = classNames({
    [styles.title]: true,
    [styles.placeholderTitle]: !logbook.title,
  });

  const buttonGroupClasses = classNames({
    [styles.bottomButton]:
      !logbook.description && !logbook.publications?.length,
  });

  return (
    <div className={styles.container}>
      <section className={styles.nav}>
        <Nav id={id} />
      </section>
      <section className={titleClasses}>
        {logbook.title || "Edit title in setting page"}
      </section>
      <section className={styles.transfer}>
        <Transfer transferCount={logbook.transferCount} />
        {isSmallUp ? <ButtonGroup id={id} onEdit={onEdit} isOwn={isOwn} /> : ""}
      </section>
      {logbook.description && (
        <section className={classNames([styles.articleBody, styles.flexStart])}>
          {logbook.description}
        </section>
      )}
      {logbook.publications.length > 0 ? (
        <LogList />
      ) : (
        <>
          <section className={styles.articleTitle}>
            {isOwn
              ? "Be the first to create stories on this Logbook."
              : "Get Traveloggers to create stories"}
          </section>
          <section className={styles.articleBody}>
            You can also transfer this book to your friends.
          </section>
          <section className={styles.emptyBook}>
            <IconEmptyBook style={emptyBookStyle} />
          </section>
          <section>
            {isOwn ? (
              <Button
                width={buttonWidth}
                height="3rem"
                bgColor="blueGreen"
                borderRadius="6.25rem"
                shadow
                onClick={onEdit}
              >
                <TextIcon color="white" weight="medium">
                  Get started
                </TextIcon>
              </Button>
            ) : (
              <Button
                width={isSmallUp ? "15.25rem" : buttonWidth}
                height="3rem"
                bgColor="blueGreen"
                borderRadius="6.25rem"
                shadow
                htmlHref="https://opensea.io/collection/traveloggers"
                htmlTarget="_blank"
              >
                <TextIcon color="white" weight="medium">
                  Get one from OpenSea
                </TextIcon>
              </Button>
            )}
          </section>
        </>
      )}
      {!isSmallUp ? (
        <section className={buttonGroupClasses}>
          <ButtonGroup id={id} onEdit={onEdit} isOwn={isOwn} />
        </section>
      ) : (
        ""
      )}
    </div>
  );
};
