import type { NextPage } from "next";
import { Head } from "~/components";

import styles from "./styles.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <Head title="Homepage"></Head>

      <h1 className={styles.title}>Homepage</h1>
    </div>
  );
};

export default Home;
