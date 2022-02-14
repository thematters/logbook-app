import Link from "next/link";

import { IconLogo, IconMenu } from "~/components";

import * as styles from "./styles.module.css";

const Header = () => {
  return (
    <header>
      <Link href="/">
        <a>
          <IconLogo size="xxl" />
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
