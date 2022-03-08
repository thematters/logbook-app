import styles from "./styles.module.css";
import Button from "./Button";

const Footer: React.FC & { Button: typeof Button } = ({ children }) => (
  <footer className={styles.footer}>{children}</footer>
);

Footer.Button = Button;

export default Footer;
