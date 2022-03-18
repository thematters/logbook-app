import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

import { IconClear, IconSearch, Button } from "~/components";

import { useResponsive } from "~/hooks";

import styles from "./styles.module.css";

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
  [key: string]: any;
};

const MIN_TOKEN_ID = 1;
const MAX_TOKEN_ID = 1500;

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm] = useDebounce(searchTerm, 300);
  const isSmallUp = useResponsive("sm-up");
  let placeholder = "ID number";
  if (isSmallUp) {
    placeholder = "Enter Logbook’s ID number";
  }

  useEffect(() => {
    if (debouncedTerm === "") {
      onSearch(debouncedTerm);
      return;
    }

    const tokenId = parseInt(debouncedTerm);
    if (!tokenId) {
      return;
    }

    onSearch(debouncedTerm);
  }, [debouncedTerm, onSearch]);

  return (
    <section className={styles.searchBar}>
      <input
        id="search-bar"
        ref={searchInputRef}
        type="number"
        placeholder={placeholder}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <button
        className={styles.search}
        onClick={() => {
          searchInputRef.current?.focus();
        }}
      >
        <IconSearch color="black" />
      </button>

      {searchTerm.length > 0 && (
        <Button
          className={styles.clear}
          width="0.875rem"
          height="0.875rem"
          borderRadius="50%"
          bgColor="grey"
          bgActiveColor="greyDarker"
          onClick={() => {
            if (searchInputRef.current) searchInputRef.current.value = "";
            setSearchTerm("");
            searchInputRef.current?.focus();
          }}
        >
          <IconClear size="xxs" color="white" />
        </Button>
      )}
    </section>
  );
};
