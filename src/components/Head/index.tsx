import NextHead from "next/head";
import { useRouter } from "next/router";
import IMAGE_LOGBOOK_OG from "/public/images/logbook-OG.jpg";

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
  const { title, description, keywords, path, image, noSuffix } = props;

  const { asPath } = useRouter();

  const domain = process.env.NEXT_PUBLIC_SITE_DOMAIN;
  const siteName = "Logbook";

  const head = {
    title: title ? (noSuffix ? title : `${title} - ${siteName}`) : siteName,
    description:
      description ||
      `Logbook 2.0, the NFT that empowers collective collection beyond private ownership, issued by Matters Lab.`,
    keywords: `${(keywords || []).join(
      ","
    )},logbook,matters,traveloggers,matters.news`,
    url: path
      ? `//${domain}${path}`
      : asPath
      ? `//${domain}${asPath}`
      : `//${domain}`,
    image: image || IMAGE_LOGBOOK_OG.src,
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
      <meta name="twitter:url" key="twitter:url" content={head.url} />
      <meta name="twitter:card" key="twitter:card" content="summary" />
      <meta name="twitter:title" key="twitter:title" content={head.title} />
      <meta
        name="twitter:description"
        key="twitter:description"
        content={head.description}
      />
      <meta name="twitter:image" key="twitter:image" content={head.image} />
    </NextHead>
  );
};
