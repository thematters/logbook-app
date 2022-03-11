import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

import {
  ComponentItem,
  // EditorComponent,
  FloatingToolbar,
  FloatingWrapper,
  // Remirror,
  // ThemeProvider,
  ToolbarItemUnion,
  useActive,
  // useAttrs,
  // useChainedCommands,
  useCurrentSelection,
  // useExtension,
  // useRemirror,
} from "@remirror/react";

import { useFloatingLinkState } from "./link-extension";

export const FloatingLinkToolbar = () => {
  const {
    isEditing,
    linkPositioner,
    clickEdit,
    onRemove,
    submitHref,
    href,
    setHref,
    cancelHref,
  } = useFloatingLinkState();
  const active = useActive();
  const activeLink = active.link();
  const { empty } = useCurrentSelection();
  const linkEditItems: ToolbarItemUnion[] = useMemo(
    () => [
      {
        type: ComponentItem.ToolbarGroup,
        label: "Link",
        items: activeLink
          ? [
              {
                type: ComponentItem.ToolbarButton,
                onClick: () => clickEdit(),
                icon: "pencilLine",
              },
              {
                type: ComponentItem.ToolbarButton,
                onClick: onRemove,
                icon: "linkUnlink",
              },
            ]
          : [
              {
                type: ComponentItem.ToolbarButton,
                onClick: () => clickEdit(),
                icon: "link",
              },
            ],
      },
    ],
    [clickEdit, onRemove, activeLink]
  );

  const items: ToolbarItemUnion[] = useMemo(
    () => linkEditItems,
    [linkEditItems]
  );

  return (
    <>
      <FloatingToolbar
        items={items}
        positioner="selection"
        placement="top"
        enabled={!isEditing}
      />
      <FloatingToolbar
        items={linkEditItems}
        positioner={linkPositioner}
        placement="bottom"
        enabled={!isEditing && empty}
      />

      <FloatingWrapper
        positioner="always"
        placement="bottom"
        enabled={isEditing}
        renderOutsideEditor
      >
        <input
          style={{ zIndex: 20 }}
          autoFocus
          placeholder="Enter link..."
          onChange={(event) => setHref(event.target.value)}
          value={href}
          onKeyPress={(event) => {
            const { code } = event;

            if (code === "Enter") {
              submitHref();
            }

            if (code === "Escape") {
              cancelHref();
            }
          }}
        />
      </FloatingWrapper>
    </>
  );
};
