import { useApolloClient, useQuery } from "@apollo/client";
// import { useEffect } from "react";

import { CLIENT_INFO } from "~/components/GQL";
import { BREAKPOINTS } from "~/enums";

import { useWindowResize } from "./useWindowResize";

type Type = "sm-down" | "sm-up" | "md-up" | "lg-up" | "sm" | "xs" | "md" | "lg";

export const useResponsive = (type: Type) => {
  const { data } = useQuery(CLIENT_INFO, {
    variables: { id: "local" },
  });
  const width = data?.clientInfo.viewportSize.width;

  // useEffect(() => { console.log("updated viewport:", [width]); }, [width]);

  if (!width) {
    return false;
  }

  switch (type) {
    case "sm-down":
      return width < BREAKPOINTS.SM - 1;
    case "sm-up":
      return width >= BREAKPOINTS.SM;
    case "md-up":
      return width >= BREAKPOINTS.MD;
    case "lg-up":
      return width >= BREAKPOINTS.LG;
    case "xs":
      return width < BREAKPOINTS.SM - 1;
    case "sm":
      return width >= BREAKPOINTS.SM && width < BREAKPOINTS.MD - 1;
    case "md":
      return width >= BREAKPOINTS.MD && width < BREAKPOINTS.LG - 1;
    case "lg":
      return width >= BREAKPOINTS.LG;
  }
};
