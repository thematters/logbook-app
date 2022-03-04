import Link from "next/link";
import classNames from "classnames";

import { IconLogo, Button, TextIcon, Nav } from "~/components";

import styles from "./styles.module.css";

const Header = () => {
  // const cls = classNames([styles.header, "l-col-full"]);

  return (
    <header className={styles.fixed}>
      <div className={styles.header}>
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

        <Nav />
      </div>
    </header>
  );
};

export default Header;
