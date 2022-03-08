import styles from "./styles.module.css";

const DialogContent: React.FC = ({ children }) => {
  return <section className={styles.content}>{children}</section>;
};

export default DialogContent;
