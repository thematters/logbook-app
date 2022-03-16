import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";

import { Head, Button, Spinner } from "~/components";
import { LOGBOOK_DETAIL } from "~/components/GQL";

import { Nav } from "./Nav";
import { EmptyBook } from "./EmptyBook";
import LogbookDetail from "./LogbookDetail";

import styles from "./styles.module.css";

const Logbook: React.FC = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const {
    loading,
    error,
    data: logbookDetail,
    // fetchMore,
  } = useQuery(LOGBOOK_DETAIL, {
    variables: {
      id,
    },
  });

  useEffect(() => {
    console.log("logbookDetail:", logbookDetail);
  }, [logbookDetail]);

  return (
    <>
      <Head title="Logbook" />

      {/* <h1>Logbook Detail</h1>
      <Button />

      <ul>
        <li>
          <Link href="/">Homepage</Link>
        </li>
        <li>
          <Link href="library">Library</Link>
        </li>
        <li>
          <Link href="bookcase">Bookcase</Link>
        </li>
      </ul> */}

      <section className={styles.maxWidth}>
        {router.query.testEditor && logbookDetail ? (
          <LogbookDetail
            id={logbookDetail.id}
            transferCount={logbookDetail.transferCount}
            content={logbookDetail.publications?.[0]?.log?.content}
          />
        ) : (
          <>
            <EmptyBook tokenID={id} />
            {loading && <Spinner />}
          </>
        )}
      </section>
    </>
  );
};

export default Logbook;
