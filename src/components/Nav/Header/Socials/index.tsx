import { IconDiscord, IconTwitter } from "~/components";

import styles from "./styles.module.css";

const Socials = () => {
  return (
    <section className={styles.socials}>
      <a
        href={process.env.NEXT_PUBLIC_TWITTER_LINK}
        target="_blank"
        rel="noreferrer"
      >
        <IconTwitter size="md" />
      </a>

      <a
        href={process.env.NEXT_PUBLIC_DISCORD_LINK}
        target="_blank"
        rel="noreferrer"
      >
        <IconDiscord size="md" />
      </a>
    </section>
  );
};

export default Socials;
