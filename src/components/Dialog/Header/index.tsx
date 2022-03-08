import CloseButton from "./CloseButton";
import styles from "./styles.module.css";

export interface HeaderProps {
  title: string | React.ReactNode;
  closeDialog?: () => void;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode | string;
}

const BaseHeader = ({
  title,
  closeDialog,
  leftButton,
  rightButton,
}: HeaderProps) => {
  return (
    <header className={styles.header}>
      <h1>
        <span id="dialog-title">{title}</span>
      </h1>

      {(leftButton || closeDialog) && (
        <section className={styles.left}>
          {leftButton ||
            (closeDialog ? <CloseButton closeDialog={closeDialog} /> : null)}
        </section>
      )}

      {rightButton && <section className={styles.right}>{rightButton}</section>}
    </header>
  );
};

const Header: React.FC<HeaderProps> & {
  CloseButton: typeof CloseButton;
} = (props) => {
  return <BaseHeader {...props} />;
};

Header.CloseButton = CloseButton;

export default Header;
