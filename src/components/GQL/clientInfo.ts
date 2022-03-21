import gql from "graphql-tag";

export const ClientInfo = gql`
  query ClientInfo {
    clientInfo @client {
      id
      viewportSize {
        width
        height
      }
    }
  }
`;
