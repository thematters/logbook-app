import { useState, useEffect } from "react";
import { isSafari } from "~/utils";

export const useSafari = () => {
  const [safari, updateSafari] = useState(false);
  useEffect(() => {
    updateSafari(isSafari())
  }, [])
  return safari
}
