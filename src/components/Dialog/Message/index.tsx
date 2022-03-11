import Alert from "@reach/alert";
import classNames from "classnames";

import styles from "./styles.module.css";

type DialogMessageProps = {
  type?: "info" | "success" | "warning" | "error";
};

const DialogMessage: React.FC<DialogMessageProps> = ({
  type = "info",
  children,
}) => {
  const msgClasses = classNames({
    [styles.msg]: true,
    ...(type ? { [styles[type]]: true } : {}),
  });

  return (
    <section className={msgClasses}>
      <Alert>{children}</Alert>
    </section>
  );
};

export default DialogMessage;
