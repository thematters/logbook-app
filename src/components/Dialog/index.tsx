// https://github.com/thematters/matters-web/tree/develop/src/components/Dialog
import Footer from "./Footer";
import Header from "./Header";
import Lazy from "./Lazy";

export type DialogOverlayProps = import("./Dialog").DialogOverlayProps;

export type BaseDialogProps = import("./Dialog").DialogProps;

export const Dialog = () => {
  return <span>Dialog</span>;
};

// export as a sub-component
Dialog.Header = Header;
Dialog.Lazy = Lazy;
Dialog.Footer = Footer;
