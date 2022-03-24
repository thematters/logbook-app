export * from "./browser";
export * from "./datetime";
export * from "./wallet";
export * from "./contract";
export * from "./dom";
export * from "./fetch";
export * from "./alchemy";
export * from "./time";

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};


