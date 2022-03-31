import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";

import { Head, Spinner } from "~/components";
import { LOGBOOK_DETAIL } from "~/components/GQL";
import { LogbookContext, Publication } from "~/hooks";

import { Book } from "./Book";
import { Editing } from "./Editing";
import { useSorter } from "./useSorter";

import styles from "./styles.module.css";

const Logbook: React.FC = () => {
  const [isEditing, enableEditing] = useState(false);
  const [{ data: accountData }] = useAccount();
  const router = useRouter();
  const id = router.query.id as string;
  const tokenID = `0x${Number(id).toString(16)}`;

  const [sortState] = useSorter();

  const {
    loading,
    error,
    data: logbookDetail,
    refetch,
    // fetchMore,
  } = useQuery(LOGBOOK_DETAIL, {
    variables: {
      id: tokenID,
      order: sortState,
    },
  });

  const [initialContent, setContent] = useState<string>("");

  const owner = logbookDetail?.logbook?.owner;
  const [publications, updatePublicationsState] = useState(
    logbookDetail?.logbook?.publications
  );

  useEffect(() => {
    updatePublicationsState(logbookDetail?.logbook?.publications);
  }, [logbookDetail, loading]);

  const updatePublications = (newPublications: [Publication]) => {
    updatePublicationsState(newPublications);
  };

  return (
    <>
      <Head title="Logbook" />

      {loading || !logbookDetail?.logbook ? (
        <Spinner />
      ) : (
        <>
          <Head
            title={logbookDetail.logbook.title}
            description={logbookDetail.logbook.description}
          />
          <LogbookContext.Provider
            value={{
              id: logbookDetail.logbook.id,
              title: logbookDetail.logbook.title,
              owner: logbookDetail.logbook.owner,
              description: logbookDetail.logbook.description,
              transferCount: logbookDetail.logbook.transferCount,
              publications,
              updatePublications,
              refetch,
            }}
          >
            <section className={styles.maxWidth}>
              {accountData &&
              accountData?.address.toLowerCase() === owner?.id.toLowerCase() &&
              isEditing ? (
                <Editing
                  id={id}
                  content={initialContent}
                  setContent={setContent}
                  onLeave={() => enableEditing(false)}
                />
              ) : (
                <Book
                  id={id}
                  isOwn={
                    accountData?.address.toLowerCase() ===
                    owner?.id.toLowerCase()
                  }
                  onEdit={() => enableEditing(true)}
                />
              )}
            </section>
          </LogbookContext.Provider>
        </>
      )}
    </>
  );
};

export default Logbook;
