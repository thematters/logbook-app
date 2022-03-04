// import classNames from "classnames";

import {
  TextIcon,
  IconLogo,
  IconMatters,
  IconOpenSea,
  IconInstagram,
  IconFacebook,
  IconTwitter,
  IconDiscord,
} from "~/components";

import { useResponsive } from "~/hooks";

import styles from "./styles.module.css";

const Footer = () => {
  const isSmallUp = useResponsive("sm-up");

  return (
    <footer className={styles.footer}>
      {!isSmallUp && (
        <div className={styles.iconlinks}>
          <a href="https://matters.news">
            <TextIcon icon={<IconMatters size="mdS" />} />
          </a>
          <TextIcon icon={<IconOpenSea size="mdS" />} />
          <TextIcon icon={<IconInstagram size="mdS" />} />
          <TextIcon icon={<IconFacebook size="mdS" />} />
          <TextIcon icon={<IconTwitter size="mdS" />} />
          <TextIcon icon={<IconDiscord size="mdS" />} />
        </div>
      )}

      <div className={styles.designerlogo}>
        <div>2022, Designed by Matters.</div>
      </div>

      {isSmallUp && (
        <div className={styles.links}>
          <div>
            <a href="https://matters.news">Matters</a>
          </div>
          <div>Opensea</div>
          <div>Instagram</div>
          <div>Facebook</div>
          <div>Twitter</div>
          <div>Discord</div>
          <div>Telegram</div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
