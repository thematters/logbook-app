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
          <a
            href={process.env.NEXT_PUBLIC_MATTERS_LINK}
            target="_blank"
            rel="noreferrer"
          >
            <TextIcon icon={<IconMatters size="mdS" />} />
          </a>
          <a
            href={process.env.NEXT_PUBLIC_LOGBOOK_OPENSEA_LINK}
            target="_blank"
            rel="noreferrer"
          >
            <TextIcon icon={<IconOpenSea size="mdS" />} />
          </a>
          <a
            href={process.env.NEXT_PUBLIC_DISCORD_LINK}
            target="_blank"
            rel="noreferrer"
          >
            <TextIcon icon={<IconDiscord size="mdS" />} />
          </a>
          <a
            href={process.env.NEXT_PUBLIC_TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >
            <TextIcon icon={<IconTwitter size="mdS" />} />
          </a>
          <a
            href={process.env.NEXT_PUBLIC_FACEBOOK_LINK}
            target="_blank"
            rel="noreferrer"
          >
            <TextIcon icon={<IconFacebook size="mdS" />} />
          </a>
          <a
            href={process.env.NEXT_PUBLIC_INSTAGRAM_LINK}
            target="_blank"
            rel="noreferrer"
          >
            <TextIcon icon={<IconInstagram size="mdS" />} />
          </a>
        </div>
      )}

      <div className={styles.designerlogo}>
        <div>2022, Designed by Matters Lab.</div>
      </div>

      {isSmallUp && (
        <div className={styles.links}>
          <a
            href={process.env.NEXT_PUBLIC_MATTERS_LINK}
            target="_blank"
            rel="noreferrer"
          >
            <div>Matters.News</div>
          </a>
          <a
            href={process.env.NEXT_PUBLIC_LOGBOOK_OPENSEA_LINK}
            target="_blank"
            rel="noreferrer"
          >
            <div>Opensea</div>
          </a>
          <a
            href={process.env.NEXT_PUBLIC_DISCORD_LINK}
            target="_blank"
            rel="noreferrer"
          >
            <div>Discord</div>
          </a>
          <a
            href={process.env.NEXT_PUBLIC_TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >
            <div>Twitter</div>
          </a>
          <a
            href={process.env.NEXT_PUBLIC_FACEBOOK_LINK}
            target="_blank"
            rel="noreferrer"
          >
            <div>Facebook</div>
          </a>
          <a
            href={process.env.NEXT_PUBLIC_TELEGRAM_LINK}
            target="_blank"
            rel="noreferrer"
          >
            <div>Telegram</div>
          </a>
          <a
            href={process.env.NEXT_PUBLIC_INSTAGRAM_LINK}
            target="_blank"
            rel="noreferrer"
          >
            <div>Instagram</div>
          </a>
        </div>
      )}
    </footer>
  );
};

export default Footer;
