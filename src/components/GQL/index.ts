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
      publications(first: 1, orderBy: createdAt, orderDirection: desc) {
        log {
          content
        }
      }
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
      cover
      title
      description
      forkPrice
      transferCount
      publications(orderBy: createdAt, orderDirection: desc) {
        id
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
