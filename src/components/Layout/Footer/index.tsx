import classNames from "classnames";

import { IconTwitter, IconDiscord } from "~/components";

import styles from "./styles.module.css";

const Footer = () => (
  <footer className={classNames([styles.footer, "l-col-full"])}>
    <div>
      <IconTwitter size="md" />
    </div>
    <div>
      <IconDiscord size="md" />
    </div>
  </footer>
);

export default Footer;
