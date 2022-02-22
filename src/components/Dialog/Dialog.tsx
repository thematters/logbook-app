export interface DialogOverlayProps {
  isOpen: boolean | undefined;
  onDismiss: () => void;
  onRest?: () => void;
}

export type DialogProps = {
  size?: "sm" | "lg";
  fixedHeight?: boolean;
  slideIn?: boolean;
} & DialogOverlayProps;

const Dialog = () => {
  return <span>Dialog</span>;
};

export default Dialog;
