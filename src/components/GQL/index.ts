import { gql } from "@apollo/client";

export const LIBRARY_LOGBOOKS = gql`
  query LibraryLogBooks($first: Int, $lastLoggedAt: String) {
    logbooks(
      first: $first
      where: { loggedAt_lt: $lastLoggedAt }
      orderBy: loggedAt
      orderDirection: desc
    ) {
      id
      title
      description
      transferCount
      publicationCount
      owner {
        id
      }
      loggedAt
    }
  }
`;

export const LOGBOOK_DETAIL = gql`
  query LogbookDetail($id: String) {
    logbook(id: $id) {
      id
      owner {
        id
        balance
      }
      title
      description
      forkPrice
      transferCount
      publications(orderBy: createdAt, orderDirection: desc) {
        id
        txHash
        log {
          id
          content
          createdAt
          author {
            id
          }
        }
      }
    }
  }
`;
