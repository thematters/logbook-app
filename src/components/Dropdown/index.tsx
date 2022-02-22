import dynamic from "next/dynamic";

import { Z_INDEX } from "~/enums";

export type PopperInstance = any;
export type PopperProps = import("@tippyjs/react").TippyProps;

const DynamicLazyTippy = dynamic(() => import("./LazyTippy"), {
  ssr: false,
});

export const Dropdown: React.FC<PopperProps> = (props) => (
  <DynamicLazyTippy
    arrow={false}
    trigger="click"
    interactive
    offset={[0, 4]}
    placement="bottom"
    animation="shift-away"
    theme="dropdown"
    zIndex={Z_INDEX.UNDER_GLOBAL_HEADER}
    {...props}
  />
);

export const Tooltip: React.FC<PopperProps> = (props) => (
  <DynamicLazyTippy
    arrow
    interactive={false}
    offset={[0, 12]}
    placement="right"
    animation="shift-away"
    theme="tooltip"
    zIndex={Z_INDEX.UNDER_GLOBAL_HEADER}
    {...props}
  />
);

export const hidePopperOnClick = (instance: PopperInstance) => {
  const box = instance.popper.firstElementChild;

  if (!box) {
    return;
  }

  box.addEventListener("click", (event: any) => {
    const target = event.target as HTMLElement;

    if (target?.closest && target.closest("[data-clickable], a, button")) {
      instance.hide();
    }
  });
};
