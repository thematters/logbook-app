import NextHead from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === "production";

interface HeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  path?: string;
  image?: string;
  noSuffix?: boolean;
}

export const Head: React.FC<HeadProps> = (props) => {
  const {
    title: rawTitle,
    description,
    keywords,
    path,
    image,
    noSuffix,
  } = props;

  const { locale, asPath } = useRouter();

  const domain = process.env.NEXT_PUBLIC_SITE_DOMAIN;
  const title = rawTitle;
  const siteName = "Logbook";

  const head = {
    title: title ? (noSuffix ? title : `${title} - ${siteName}`) : siteName,
    description: description
      ? trans({ ...description, lang })
      : defaultDescription,
    keywords: keywords
      ? `${keywords.join(",")},${defaultKeywords}`
      : defaultKeywords,
    url: path
      ? `//${domain}${path}`
      : asPath
      ? `//${domain}${asPath}`
      : `//${domain}`,
    image: image || defaultImage,
  };
  const canonicalUrl = head.url?.split("#")[0].split("?")[0];

  return (
    <NextHead>
      <meta charSet="utf-8" key="charSet" />
      <meta
        name="viewport"
        key="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover"
      />
      <title>{head.title}</title>
      <meta name="description" key="description" content={head.description} />
      <meta name="keywords" key="keywords" content={head.keywords} />
      <link rel="shortcut icon" href="/favicon.ico" key="favicon" />
      <link
        rel="icon"
        type="image/png"
        href="/favicon.png"
        sizes="128x128"
        key="favicon-128"
      />
      <link rel="apple-touch-icon" href="/favicon.png" key="apple-touch-icon" />
      <link rel="canonical" href={canonicalUrl} key="canonical" />

      {/* noindex for non-production enviroment */}
      {!isProd && (
        <meta name="robots" content="noindex, nofollow" key="robots" />
      )}
      {!isProd && (
        <meta name="googlebot" content="noindex, nofollow" key="googlebot" />
      )}

      {/* social */}
      <meta name="og:title" key="og:title" content={head.title} />
      {siteName && (
        <meta property="og:site_name" key="og:site_name" content={siteName} />
      )}
      <meta property="og:url" key="og:url" content={head.url} />
      <meta property="og:type" key="og:type" content="website" />
      <meta property="og:image" key="og:image" content={head.image} />
      <meta
        property="og:description"
        key="og:description"
        content={head.description}
      />
      <meta
        property="og:locale"
        key="og:locale"
        content={langConvert.toOg(lang)}
      />
      <meta name="twitter:url" key="twitter:url" content={head.url} />
      <meta name="twitter:card" key="twitter:card" content="summary" />
      <meta name="twitter:title" key="twitter:title" content={head.title} />
      <meta
        name="twitter:description"
        key="twitter:description"
        content={head.description}
      />
      <meta name="twitter:image" key="twitter:image" content={head.image} />

      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        key="google-font-preconnect"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;700&display=swap"
        rel="stylesheet"
        key="google-font"
      />
    </NextHead>
  );
};
