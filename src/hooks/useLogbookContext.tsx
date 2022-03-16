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
}

export interface Publication {
  __typename: "Publication";
  log: Log;
}

export type Logbook = {
  id: string;
  title?: string;
  description?: string;
  transferCount?: number;
  publications: [Publication];
};

export const LogbookContext = React.createContext({} as Logbook);
