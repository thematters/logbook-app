export const dummy = () => {};

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
  return `${monthNamesShort[month]} ${day},${year}`;
};

export const formatHash = function (hash: string, isSmallUp=true) {
  if (isSmallUp) {
    return `${hash.slice(2, 6)}...${hash.slice(-4)}`;
  }
  return `${hash.slice(2, 4)}...${hash.slice(-3)}`;
};
