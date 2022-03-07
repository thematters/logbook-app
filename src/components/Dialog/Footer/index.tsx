import styles from "./styles.module.css";

const Footer: React.FC = ({ children }) => (
  <footer className={styles.footer}>{children}</footer>
);

export default Footer;
