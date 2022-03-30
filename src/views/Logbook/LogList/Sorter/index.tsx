import classNames from "classnames";
import React from "react";
import { SORT_ASC, SORT_DESC, SORT_TYPE } from "~/enums";

import {
  Button,
  Card,
  IconFilter,
  TextIcon,
  DropdownDialog,
} from "~/components";

import styles from "./styles.module.css";

export type sortType = typeof SORT_ASC | typeof SORT_DESC;

const DropdownMenu: React.FC<{
  updateSort: (sort: sortType) => any;
}> = ({ updateSort }) => (
  <ul
    role="menu"
    className={classNames(["reset", styles.menu])}
    data-clickable="true"
  >
    <li role="menu-item">
      <Card
        onClick={() => {
          updateSort(SORT_ASC);
        }}
      >
        <span className={styles.item}>Oldest to Newest</span>
      </Card>
    </li>
    <li role="menu-item">
      <Card
        onClick={() => {
          updateSort(SORT_DESC);
        }}
      >
        <span className={styles.item}>Newest to Oldest</span>
      </Card>
    </li>
  </ul>
);
interface Props {
  sort: sortType;
  updateSort: (sort: sortType) => any;
}

export const Sorter: React.FC<Props> = ({ sort, updateSort }) => {
  return (
    <section className={styles.container} data-clickable>
      <DropdownDialog
        dropdown={{
          content: <DropdownMenu updateSort={(state) => updateSort(state)} />,
          placement: "bottom-start",
        }}
        dialog={{
          title: "Order",
          content: <DropdownMenu updateSort={(state) => updateSort(state)} />,
        }}
      >
        {({ openDialog, ref }) => (
          <Button ref={ref} onClick={openDialog}>
            <TextIcon icon={<IconFilter />} color="grey" spacing="xTight">
              Sort {sort === SORT_ASC ? "Oldest to Newest" : "Newest to Oldest"}
            </TextIcon>
          </Button>
        )}
      </DropdownDialog>
    </section>
  );
};
