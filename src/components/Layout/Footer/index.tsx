import classNames from "classnames";

import { IconTwitter, IconDiscord, TextIcon } from "~/components";

import styles from "./styles.module.css";

const Footer = () => (
  <footer className={classNames([styles.footer, "l-col-full"])}>
    <a
      href={process.env.NEXT_PUBLIC_TWITTER_LINK}
      target="_blank"
      rel="noreferrer"
    >
      <TextIcon icon={<IconTwitter size="md" />} />
    </a>
    <a
      href={process.env.NEXT_PUBLIC_DISCORD_LINK}
      target="_blank"
      rel="noreferrer"
    >
      <TextIcon icon={<IconDiscord size="md" />} />
    </a>
  </footer>
);

export default Footer;
