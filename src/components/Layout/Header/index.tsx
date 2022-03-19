import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";

import { IconLogo, IconChevronLeft, Button, TextIcon, Nav } from "~/components";
import { useResponsive } from "~/hooks";

import styles from "./styles.module.css";

const Header = () => {
  const isMediumUp = useResponsive("md-up");
  const router = useRouter();
  const HomepagePath = "/";
  const isHomepage = router.pathname === HomepagePath;
  const headerClasses = classNames({
    [styles.header]: true,
    [styles.flexEnd]: isHomepage && !isMediumUp,
  });
  return (
    <header className={styles.fixed}>
      <div className={headerClasses}>
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
        {!isHomepage && !isMediumUp && (
          <Button onClick={() => history.back()}>
            <TextIcon icon={<IconChevronLeft size="md" />}></TextIcon>
          </Button>
        )}
        <Nav />
      </div>
    </header>
  );
};

export default Header;
