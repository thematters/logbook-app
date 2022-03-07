import VisuallyHidden from "@reach/visually-hidden";
import classNames from "classnames";
import { Spacer } from "~/components";

import { CloseButton } from "./Button";
import styles from "./styles.module.css";

export interface HeaderProps {
  title: string | React.ReactNode;
  closeDialog?: () => void;
  closeTextId?: string;
  mode?: "hidden" | "inner";
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode | string;
}

const BaseHeader = ({
  title,
  closeDialog,
  closeTextId,
  mode,
  leftButton,
  rightButton,
}: HeaderProps) => {
  const headerClasses = classNames({
    [styles.header]: true,
    [styles.inner]: mode === "inner",
  });

  return (
    <header className={headerClasses}>
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
  if (props.mode !== "hidden") {
    return <BaseHeader {...props} />;
  }

  return (
    <>
      <div className={styles.spacer}>
        <Spacer size="xLoose" />
      </div>

      <VisuallyHidden>
        <BaseHeader {...props} />
      </VisuallyHidden>
    </>
  );
};

Header.CloseButton = CloseButton;

export default Header;
