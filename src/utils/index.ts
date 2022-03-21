export * from "./browser";
export * from "./wallet";
export * from "./contract";
export * from "./dom";
export * from "./fetch";
export * from "./alchemy";
export * from "./time";

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatDate = function (date: Date) {
  const monthNamesShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  return `${monthNamesShort[month]} ${day}, ${year}`;
};
