import Link from "next/link";

import { IconLogo, IconMenu, Button, TextIcon } from "~/components";

import styles from "./styles.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <Button
            width="5.25rem"
            height="5.25rem"
            borderRadius="50%"
            bgColor="heavyMetal"
            bgActiveColor="heavyMetalHover"
          >
            <TextIcon icon={<IconLogo size="xl" />}></TextIcon>
          </Button>
        </a>
      </Link>

      <Link href="/">
        <a>
          <IconMenu size="xxl" />
        </a>
      </Link>
    </header>
  );
};

export default Header;
