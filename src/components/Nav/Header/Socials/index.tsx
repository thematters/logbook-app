import { IconDiscord, IconTwitter } from "~/components";

import styles from "./styles.module.css";

const Socials = () => {
  // TODO: fill url
  const [twitter, discord] = ["", ""];
  return (
    <section className={styles.socials}>
      <a href={twitter} target="_blank" rel="noreferrer">
        <IconTwitter size="md" />
      </a>

      <a href={discord} target="_blank" rel="noreferrer">
        <IconDiscord size="md" />
      </a>
    </section>
  );
};

export default Socials;
