import { DialogContent, DialogOverlay } from "@reach/dialog";
import _get from "lodash/get";
import { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";

import { useOutsideClick, useResponsive } from "~/hooks";

import { KEYCODES } from "~/enums";
import { dom } from "~/utils";

import Handle from "./Handle";
import Overlay from "./Overlay";
import styles from "./styles.module.css";

export interface DialogOverlayProps {
  isOpen: boolean | undefined;
  onDismiss: () => void;
  onRest?: () => void;
}

export type DialogProps = DialogOverlayProps;

const Container: React.FC<
  {
    style?: React.CSSProperties;
    setDragGoal: (val: any) => void;
  } & DialogProps
> = ({ onDismiss, children, style, setDragGoal }) => {
  const node: React.RefObject<any> | null = useRef(null);

  const closeTopDialog = () => {
    const dialogs = Array.prototype.slice.call(
      dom.$$("[data-reach-dialog-overlay]")
    ) as Element[];
    const topDialog = dialogs[dialogs.length - 1];
    const isTopDialog =
      topDialog && node.current && topDialog.contains(node.current);

    if (!isTopDialog) {
      return;
    }

    onDismiss();
  };

  const bind = useDrag(({ down, movement: [, my] }) => {
    if (!down && my > 30) {
      onDismiss();
    } else {
      setDragGoal({ top: down ? Math.max(my, -30) : 0 });
    }
  });

  useOutsideClick(node, closeTopDialog);

  return (
    <div className="l-row">
      <div
        ref={node}
        className={styles.container}
        style={style}
        onKeyDown={(event) => {
          if (event.keyCode === KEYCODES.escape) {
            closeTopDialog();
          }
        }}
      >
        {children}

        <Handle closeDialog={onDismiss} {...bind()} />
      </div>
    </div>
  );
};

const Dialog: React.FC<DialogProps> = (props) => {
  const { isOpen, onRest } = props;
  const [mounted, setMounted] = useState(isOpen);
  const isSmallUp = useResponsive("sm-up");

  // Drag
  const [{ top }, setDragGoal] = useSpring(() => ({ top: 0 }));

  // Fade In/ Fade Out
  const [{ opacity, transform }, setFade] = useSpring<{
    opacity: number;
    transform: string;
  }>(() => ({
    opacity: 0,
    transform: "translateY(100%)",
    config: { tension: 270, friction: isSmallUp ? undefined : 30 },
    onRest: (val: any) => {
      const isFadedOut = _get(val, "value.opacity") <= 0;

      if (isFadedOut) {
        setMounted(false);
        setDragGoal({ top: 0 });
      }

      if (onRest) {
        onRest();
      }
    },
  }));

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setFade({ opacity: 1, transform: "translateY(0%)" });
    } else {
      setFade({ opacity: 0, transform: "translateY(100%)" });
    }
  }, [isOpen, setFade, setMounted]);

  const AnimatedDialogOverlay = animated(DialogOverlay);
  const AnimatedContainer = animated(Container);
  const AnimatedOverlay = animated(Overlay);

  if (!mounted) {
    return null;
  }

  return (
    <AnimatedDialogOverlay className="dialog">
      <AnimatedOverlay style={{ opacity }} />

      <DialogContent className="l-container" aria-labelledby="dialog-title">
        <AnimatedContainer
          style={{ opacity, top }}
          setDragGoal={setDragGoal}
          {...props}
        />
      </DialogContent>
    </AnimatedDialogOverlay>
  );
};

export default Dialog;
