import { Button, Head } from "~/components";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

import { Stranger } from "./Stranger";
import { BookList } from "./BookList";

import styles from "./styles.module.css";

const Bookcase: React.FC = () => {
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });
  const router = useRouter();
  const { address } = router.query;
  // console.log({address})
  if (!accountData && !address) {
    return (
      <section className={styles.container}>
        <Head title="Bookcase" />
        <Stranger />
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <Head title="Bookcase" />
      <BookList
        address={
          address ? (address as string) : (accountData?.address as string)
        }
      />
    </section>
  );
};

export default Bookcase;
