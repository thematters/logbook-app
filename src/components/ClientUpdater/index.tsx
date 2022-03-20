import { useApolloClient, useQuery } from "@apollo/client";
import { useEffect } from "react";

import { CLIENT_INFO } from "~/components/GQL";
import { useWindowResize } from "~/hooks";

export const ClientUpdater = () => {
  /**
   * Update viewportSize
   */
  const [width, height] = useWindowResize();

  const client = useApolloClient();

  useEffect(() => {
    if (!width || !height) {
      return;
    }

    client.writeQuery({
      query: CLIENT_INFO,
      // data: .writeData({
      // id: `ClientInfo:local`,
      data: {
        clientInfo: {
          id: "local",
          viewportSize: {
            width,
            height,
            // __typename: "ViewportSize",
          },
        },
      },
    });
  });

  return null;
};
