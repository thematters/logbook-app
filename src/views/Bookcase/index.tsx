import Link from "next/link";
import { Button, Head } from "~/components";

import { Stranger } from "./Stranger";
import { BookList } from "./BookList";

import styles from "./styles.module.css";

const Bookcase: React.FC = () => {
  return (
    <section className={styles.container}>
      <Head title="Bookcase" />
      {/* <Stranger /> */}
      <BookList />
    </section>
  );
};

export default Bookcase;
