export const getUserAgent = () =>
  ((navigator && navigator.userAgent) || "").toLowerCase();

export const isSafari = () => {
  if (typeof window !== "undefined") {
    const userAgent = getUserAgent();
    const match = userAgent.match(/version\/(\d+).+?safari/);
    return match !== null;
  }
  return false;
};

export const isMobile = () => {
  const userAgent = getUserAgent();
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );
};
