import { Dialog, ShareButtons } from "~/components";

// import { TextId } from '~/enums'

import Copy from "./Copy";
// import styles from './styles.css'
import styles from "./styles.module.css";

export interface ShareDialogContentProps {
  closeDialog: () => void;

  shareTitle: string;
  shareLink: string;

  headerTitle?: string | React.ReactNode;
  description?: React.ReactNode;
  footerButtons?: React.ReactNode;
}

const ShareDialogContent: React.FC<ShareDialogContentProps> = ({
  closeDialog,

  shareTitle,
  shareLink,

  headerTitle,
  description,
  footerButtons,
}) => (
  <>
    <Dialog.Header
      title={headerTitle || "Share"}
      closeDialog={closeDialog}
      // closeTextId="close"
      // mode={headerTitle ? 'inner' : 'hidden'}
    />

    <Dialog.Content>
      {description && (
        <section className={styles.description}>
          {description}

          {/* <style jsx>{styles}</style> */}
        </section>
      )}

      <section className={styles.socialsContainer}>
        <section className={styles.left}>
          <ShareButtons.LINE title={shareTitle} link={shareLink} />
          <ShareButtons.WhatsApp title={shareTitle} link={shareLink} />
          <ShareButtons.Telegram title={shareTitle} link={shareLink} />
          <ShareButtons.Douban title={shareTitle} link={shareLink} />
        </section>

        <section className={styles.right}>
          <ShareButtons.Twitter title={shareTitle} link={shareLink} />
          <ShareButtons.Facebook title={shareTitle} link={shareLink} />
          <ShareButtons.Weibo title={shareTitle} link={shareLink} />
          <ShareButtons.Email title={shareTitle} link={shareLink} />
        </section>

        {/* <style jsx>{styles}</style> */}
      </section>

      <Copy link={shareLink} />
    </Dialog.Content>

    {/* <Dialog.Footer>
      {footerButtons || (
        <Dialog.Footer.Button
          bgColor="greyLighter"
          textColor="black"
          onClick={closeDialog}
        >
        </Dialog.Footer.Button>
      )}
    </Dialog.Footer> */}
  </>
);

export default ShareDialogContent;
