import classNames from "classnames";
import React, { useContext } from "react";
import { SORT_TYPE } from "~/enums";
import { useLogListSorter } from "../../../../hooks/useLogListSorter";

import {
  Button,
  Card,
  IconFilter,
  TextIcon,
  DropdownDialog,
} from "~/components";

import styles from "./styles.module.css";
import { LogbookContext } from "~/hooks";
import { useRouter } from "next/router";

const DropdownMenu: React.FC = ({}) => {
  const [, updateSortState] = useLogListSorter();
  const router = useRouter();
  const logbook = useContext(LogbookContext);

  const updateUrl = (order: string) => {
    router.replace(`/logbook/?id=${parseInt(logbook.id, 16)}&sort=${order}`);
  };

  const updateSort = (order: string) => {
    updateSortState(order);
    updateUrl(order);
  };

  return (
    <ul
      role="menu"
      className={classNames(["reset", styles.menu])}
      data-clickable="true"
    >
      <li role="menu-item">
        <Card
          onClick={() => {
            updateSort(SORT_TYPE.asc);
          }}
        >
          <span className={styles.item}>Oldest to Newest</span>
        </Card>
      </li>
      <li role="menu-item">
        <Card
          onClick={() => {
            updateSort(SORT_TYPE.desc);
          }}
        >
          <span className={styles.item}>Newest to Oldest</span>
        </Card>
      </li>
    </ul>
  );
};

export const Sorter: React.FC = ({}) => {
  const [sort] = useLogListSorter();
  return (
    <section className={styles.container} data-clickable>
      <DropdownDialog
        dropdown={{
          content: <DropdownMenu />,
          placement: "bottom-start",
        }}
        dialog={{
          title: "Order",
          content: <DropdownMenu />,
        }}
      >
        {({ openDialog, ref }) => (
          <Button ref={ref} onClick={openDialog}>
            <TextIcon icon={<IconFilter />} color="grey" spacing="xTight">
              {sort === SORT_TYPE.asc ? "Oldest to Newest" : "Newest to Oldest"}
            </TextIcon>
          </Button>
        )}
      </DropdownDialog>
    </section>
  );
};
