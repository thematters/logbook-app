// https://github.com/thematters/matters-web/tree/develop/src/components/Button

import styles from "./styles.module.css";

export type ButtonProps = {
  onClick?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any;
};

export const Button: React.FC<ButtonProps> = () => {
  return (
    <button type="button" className={styles.button}>
      button
    </button>
  );
};
