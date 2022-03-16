import React from "react";
import classNames from "classnames";
import { Button, IconEmptyBook, TextIcon } from "~/components";
import { Nav } from "../Nav";
import { Transfer } from "../Transfer";
import { ButtonGroup } from "../ButtonGroup";
import { LogList, Publication } from "../LogList";

import styles from "./styles.module.css";

import { useResponsive } from "~/hooks";

export interface BookProps {
  tokenID: string;
  title: string;
  transferCount: number;
  description: string;
  publications: Array<Publication>;
  isOwn: boolean;
  onEdit: () => any;
}

export const Book: React.FC<BookProps> = ({
  tokenID,
  title,
  transferCount,
  description,
  publications,
  isOwn,
  onEdit,
}) => {
  const emptyBookStyle = { width: "12.5rem", height: "12.5rem" };
  const isSmallUp = useResponsive("sm-up");
  let buttonWidth = "19.4375rem";
  if (isSmallUp) {
    buttonWidth = "12.5rem";
  }

  const titleClasses = classNames({
    [styles.title]: true,
    [styles.placeholderTitle]: !title,
  });

  const buttonGroupClasses = classNames({
    [styles.bottomButton]: !description && publications.length == 0,
  });

  return (
    <div className={styles.container}>
      <section className={styles.nav}>
        <Nav tokenID={tokenID} />
      </section>
      <section className={titleClasses}>
        {title ? title : "Edit title in setting page"}
      </section>
      <section className={styles.transfer}>
        <Transfer transferCount={transferCount} />
        {isSmallUp ? (
          <ButtonGroup id={tokenID} onEdit={onEdit} isOwn={isOwn} />
        ) : (
          ""
        )}
      </section>
      {description && (
        <section className={`${styles.articleBody} ${styles.flexStart}`}>
          {description}
        </section>
      )}
      {publications.length > 0 && (
        <>
          <LogList publications={publications} />
        </>
      )}
      {!description && publications.length == 0 && (
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
          <ButtonGroup id={tokenID} onEdit={onEdit} isOwn={isOwn} />
        </section>
      ) : (
        ""
      )}
    </div>
  );
};
