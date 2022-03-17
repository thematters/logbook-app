import { useContext, useRef } from "react";

import {
  Button,
  CopyToClipboard,
  IconCopy,
  // LanguageContext,
} from "~/components";

import styles from "./styles.module.css";

const Copy = ({ link }: { link: string }) => {
  const inputRef: React.RefObject<any> | null = useRef(null);

  return (
    <section className={styles.copy}>
      <CopyToClipboard text={link}>
        <Button width="2rem" height="2rem" borderRadius="50%" bgColor="white">
          <IconCopy color="grey" />
        </Button>
      </CopyToClipboard>

      <CopyToClipboard text={link}>
        <input ref={inputRef} type="text" value={link} readOnly />
      </CopyToClipboard>
    </section>
  );
};

export default Copy;
