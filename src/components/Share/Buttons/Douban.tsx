import queryString from "query-string";

import { TextIcon, withIcon } from "~/components";

import { dom } from "~/utils";

import { ReactComponent as IconShareDouban } from "/public/icons/16px/share-douban.svg";
import { ReactComponent as IconShareDoubanCircle } from "/public/icons/40px/share-douban-circle.svg";

const Douban = ({
  title,
  link,
  circle,
}: {
  title: string;
  link: string;
  circle?: boolean;
}) => (
  <button
    type="button"
    onClick={() => {
      const description = dom
        .$('meta[name="description"]')
        ?.getAttribute("content");
      const shareUrl =
        "http://www.douban.com/share/service?" +
        queryString.stringify({
          href: link,
          name: title,
          text: description,
        });
      // analytics.trackEvent("share", {
      //   type: "douban",
      // });
      return window.open(shareUrl);
    }}
  >
    {circle && withIcon(IconShareDoubanCircle)({ size: "xlM" })}

    {!circle && (
      <TextIcon icon={withIcon(IconShareDouban)({})} spacing="base">
        {/* <Translate zh_hant="豆瓣" zh_hans="豆瓣" en="douban" /> */}
        douban
      </TextIcon>
    )}
  </button>
);

export default Douban;
