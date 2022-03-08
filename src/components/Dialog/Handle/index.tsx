import styles from "./styles.module.css";

interface HandleProps {
  closeDialog: () => void;
}

const Handle: React.FC<HandleProps> = ({ closeDialog, ...props }) => {
  return (
    <button
      type="button"
      className={styles.handle}
      aria-label="Close"
      onClick={closeDialog}
      {...props}
    >
      <span className={styles.icon} />
    </button>
  );
};

export default Handle;
