import queryString from "query-string";

import { TextIcon, withIcon } from "~/components";

// import { analytics } from '~/common/utils'

import { ReactComponent as IconShareFacebook } from "/public/icons/16px/share-facebook.svg";
import { ReactComponent as IconShareFacebookCircle } from "/public/icons/40px/share-facebook-circle.svg";

const Facebook = ({
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
      const shareUrl =
        "https://www.facebook.com/sharer/sharer.php?" +
        queryString.stringify({
          u: link,
        });
      // analytics.trackEvent('share', {
      //   type: 'facebook',
      // })
      return window.open(shareUrl, "Share to Facebook");
    }}
  >
    {circle && withIcon(IconShareFacebookCircle)({ size: "xlM" })}

    {!circle && (
      <TextIcon icon={withIcon(IconShareFacebook)({})} spacing="base">
        Facebook
      </TextIcon>
    )}
  </button>
);

export default Facebook;
