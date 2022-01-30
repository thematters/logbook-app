import type { NextPage } from "next";
import Link from "next/link";
import { Head } from "~/components";

import styles from "./styles.module.css";

const Homepage: NextPage = () => {
  return (
    <>
      <Head title="Homepage" />

      <h1 className={styles.title}>Homepage</h1>

      <ul>
        <li>
          <Link href="logbook">Logbook Detail</Link>
        </li>
        <li>
          <Link href="bookcase">Bookcase</Link>
        </li>
        <li>
          <Link href="library">Library</Link>
        </li>
      </ul>
    </>
  );
};

export default Homepage;
