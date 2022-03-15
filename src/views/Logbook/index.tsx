import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";

import { Head, Spinner } from "~/components";
import { LOGBOOK_DETAIL } from "~/components/GQL";

import { Book } from "./Book";
import Editor from "./Editor";

import styles from "./styles.module.css";

const Logbook: React.FC = () => {
  const [isEditing, enableEditing] = useState(false);
  const [{ data: accountData }] = useAccount();
  const router = useRouter();
  const id = router.query.id as string;
  const tokenID = `0x${Number(id).toString(16)}`;

  const {
    loading,
    error,
    data: logbookDetail,
    // fetchMore,
  } = useQuery(LOGBOOK_DETAIL, {
    variables: {
      id: tokenID,
    },
  });

  useEffect(() => {
    console.log("logbookDetail:", { logbookDetail, accountData });
  }, [logbookDetail, accountData]);

  if (loading) {
    return <Spinner />;
  }

  if (!logbookDetail?.logbook) {
    return <></>;
  }

  const {
    logbook: { title, transferCount, description, publications, owner },
  } = logbookDetail;

  return (
    <>
      <Head title="Logbook" />
      <section className={styles.maxWidth}>
        {accountData &&
        accountData?.address.toLowerCase() === owner?.id.toLowerCase() &&
        isEditing ? (
          <Editor
            id={tokenID}
            transferCount={transferCount}
            content={publications?.[0]?.log?.content}
            onLeave={() => enableEditing(false)}
          ></Editor>
        ) : (
          <Book
            tokenID={id}
            title={title}
            transferCount={transferCount}
            description={description}
            publications={publications}
            isOwn={
              accountData?.address.toLowerCase() === owner?.id.toLowerCase()
            }
            onEdit={() => enableEditing(true)}
          />
        )}
      </section>
    </>
  );
};

export default Logbook;
