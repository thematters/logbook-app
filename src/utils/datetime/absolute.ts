import format from "date-fns/format";
import isThisYear from "date-fns/isThisYear";
import isToday from "date-fns/isToday";
import isYesterday from "date-fns/isYesterday";
import parseISO from "date-fns/parseISO";

const FORMATS = {
    absoluteToday: `'Today' H:mm`,
    absoluteYesterday: `'Yesterday' H:mm`,
    absoluteThisYear: "MM-dd",
    absoluteFull: "yyyy-MM-dd",
};

const absolute = (date: Date | string | number) => {
  if (typeof date === "string") {
    date = parseISO(date);
  }

  if (isToday(date)) {
    return format(date, FORMATS.absoluteToday);
  }

  if (isYesterday(date)) {
    return format(date, FORMATS.absoluteYesterday);
  }

  if (isThisYear(date)) {
    return format(date, FORMATS.absoluteThisYear);
  }

  return format(date, FORMATS.absoluteFull);
};

export default absolute;
