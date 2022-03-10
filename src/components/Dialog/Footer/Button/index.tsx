import { forwardRef } from "react";

import { Button, ButtonProps, IconSpinner, TextIcon } from "~/components";

import styles from "./styles.module.css";

type DialogFooterButtonProps = {
  icon?: React.ReactNode;
  loading?: boolean;
} & ButtonProps;

const DialogFooterButton: React.FC<DialogFooterButtonProps> = forwardRef(
  (
    {
      loading,
      textColor = "white",
      bgColor = "blueGreen",

      icon,

      disabled,
      children,

      ...restProps
    },
    ref
  ) => (
    <Button
      className={styles.button}
      bgColor={bgColor}
      width="100%"
      height="3rem"
      borderRadius="3rem"
      disabled={disabled || loading}
      ref={ref}
      {...restProps}
    >
      <TextIcon
        icon={icon || (loading && <IconSpinner size="md" />)}
        color={textColor}
        size="mdS"
        textPlacement="left"
      >
        {loading ? null : children}
      </TextIcon>
    </Button>
  )
);

export default DialogFooterButton;
