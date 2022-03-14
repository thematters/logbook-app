import React from "react";

import {
  Button,
  IconEdit,
  IconGift,
  IconMore,
  IconEmptyBook,
  TextIcon,
} from "~/components";
import { Nav } from "../Nav";
import { Transfer } from "../Transfer";

import styles from "./styles.module.css";

import { useResponsive } from "~/hooks";

export interface EmptyBookProps {
  tokenID: String;
}

export const EmptyBook: React.FC<EmptyBookProps> = ({ tokenID }) => {
  const emptyBookStyle = { width: "12.5rem", height: "12.5rem" };
  const editIconStyle = { width: "5rem", height: "5rem" };
  const isSmallUp = useResponsive("sm-up");
  let buttonWidth = "19.4375rem";
  if (isSmallUp) {
    buttonWidth = "12.5rem";
  }

  const buttonGroup = (
    <>
      <IconEdit style={editIconStyle} />
      <IconGift style={editIconStyle} />
      <IconMore style={editIconStyle} />
    </>
  );

  return (
    <div className={styles.container}>
      <section className={styles.nav}>
        <Nav tokenID={tokenID} />
      </section>
      <section className={styles.title}>Edit title in setting page</section>
      <section className={styles.transfer}>
        <Transfer transferCount={0} />
        {isSmallUp ? <section>{buttonGroup}</section> : ""}
      </section>
      <section className={styles.articleTitle}>
        Be the first to create stories on this Logbook.
      </section>
      <section className={styles.articleBody}>
        You can also transfer this book to your friends.
      </section>
      <section className={styles.emptyBook}>
        <IconEmptyBook style={emptyBookStyle} />
      </section>
      {/* TODO: link to edit page */}
      <section>
        <Button
          width={buttonWidth}
          height="3rem"
          bgColor="blueGreen"
          borderRadius="6.25rem"
          shadow
        >
          <TextIcon color="white" weight="medium">
            Get started
          </TextIcon>
        </Button>
      </section>
      {!isSmallUp ? (
        <section className={styles.bottomButton}>{buttonGroup}</section>
      ) : (
        ""
      )}
    </div>
  );
};
