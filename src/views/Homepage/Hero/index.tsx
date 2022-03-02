import Image from "next/image";
import styles from "./styles.module.css";

export const Hero = () => (
  <section className={styles.hero}>
    <section>
      <h2>Deliver value and share benefits</h2>
    </section>
    <section className={styles.right}>
      <Image
        src="/images/logbook-intro.png"
        alt="intro"
        width="640"
        height="700"
      />
    </section>
  </section>
);
