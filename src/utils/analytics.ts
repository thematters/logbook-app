// import type { CustomParams } from "@types/gtag.js";

// log the pageview with their URL
export const pageview = (url: string) => {
  if (!process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) return;

  window?.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  });
};

// log specific events happening.
export const event = ({ action, params }: { action: string; params?: any }) => {
  window?.gtag("event", action, params);
};
