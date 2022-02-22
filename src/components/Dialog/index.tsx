// https://github.com/thematters/matters-web/tree/develop/src/components/Dialog
import dynamic from "next/dynamic";

import Footer from "./Footer";
import Header from "./Header";
import Lazy from "./Lazy";

export type DialogOverlayProps = import("./Dialog").DialogOverlayProps;

export type BaseDialogProps = import("./Dialog").DialogProps;

type DynamicDialogProps = React.ComponentType<BaseDialogProps> & {
  Header: typeof Header;
  Footer: typeof Footer;
  Lazy: typeof Lazy;
};

const DynamicDialog = dynamic(() => import("./Dialog"), {
  ssr: false,
}) as DynamicDialogProps;

DynamicDialog.Header = Header;
DynamicDialog.Footer = Footer;
DynamicDialog.Lazy = Lazy;

export const Dialog = DynamicDialog;
