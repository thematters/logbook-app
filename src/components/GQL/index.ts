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
