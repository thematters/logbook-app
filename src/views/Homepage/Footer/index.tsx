import classNames from "classnames";

import styles from "./styles.module.css";

const Footer = () => (
  <footer className={classNames([styles.footer, "l-col-full"])}>
    <div>
      <div>2022, Designed by Matters.</div>
    </div>

    <div>
      <div>
        <a href="https://matters.news">Matters</a>
      </div>
      <div>Opensea</div>
      <div>Instagram</div>
      <div>Facebook</div>
      <div>Twitter</div>
      <div>Discord</div>
      <div>Telegram</div>
    </div>
  </footer>
);

export default Footer;
