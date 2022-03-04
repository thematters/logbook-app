import Link from "next/link";
import classNames from "classnames";

import { IconLogo, Button, TextIcon, Nav } from "~/components";
import { useResponsive } from "~/hooks";

import styles from "./styles.module.css";

const Header = () => {
  // const cls = classNames([styles.header, "l-col-full"]);
  const isMediumUp = useResponsive("md-up");

  return (
    <header className={styles.fixed}>
      <div className={styles.header}>
        {isMediumUp && (
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
        )}

        <Nav />
      </div>
    </header>
  );
};

export default Header;
