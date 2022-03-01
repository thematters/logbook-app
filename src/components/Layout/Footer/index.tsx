import { IconTwitter, IconDiscord } from "~/components";

const Footer = () => (
  <footer>
    <div>
      <IconTwitter size="md" />
    </div>
    <div>
      <IconDiscord size="md" />
    </div>

    <style global jsx>{`
      footer {
        display: flex;
        justify-content: flex-end;
      }

      footer div {
        margin: 0 var(--spacing-xx-tight) 0 var(--spacing-xx-tight);
      }
    `}</style>
  </footer>
);

export default Footer;
