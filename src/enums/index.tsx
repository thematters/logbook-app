export const BREAKPOINTS = {
  SM: 768,
  MD: 1024,
  LG: 1280,
};

export const KEYCODES = {
  enter: 13,
  escape: 27,
  tab: 9,
  backSpace: 8,
  up: 38,
  down: 40,
  v: 86,
};

export const Z_INDEX = {
  UNDER_GLOBAL_HEADER: 99,
  GLOBAL_HEADER: 100,
  OVER_GLOBAL_HEADER: 101,
  DIALOG: 200,
  OVER_DIALOG: 201,
};

// Toasts
export const ADD_TOAST = "addToast";
export const REMOVE_TOAST = "removeToast";

// Time
export const TOAST_DURATION = 1000 * 3;

// Sorter
export const SORT_ASC = "asc";
export const SORT_DESC = "desc";
export enum SORT_TYPE {
  asc = "asc",
  desc = "desc",
}
