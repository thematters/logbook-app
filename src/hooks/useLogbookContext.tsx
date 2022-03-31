import React from "react";

interface Account {
  __typename: "Account";
  id: string;
}

interface Log {
  __typename: "Log";
  id: string;
  createdAt: string;
  content: string;
  author: Account;
  txHash: string;
}

export interface Publication {
  __typename: "Publication";
  log: Log;
  txHash: string;
}

export type Logbook = {
  id: string;
  owner?: Account;
  title?: string;
  description?: string;
  transferCount?: number;
  publications: [Publication];
  updatePublications: (newPublications: [Publication]) => void;
  // methods, refetch from thegraph
  refetch: () => void;
};

export const LogbookContext = React.createContext({} as Logbook);
