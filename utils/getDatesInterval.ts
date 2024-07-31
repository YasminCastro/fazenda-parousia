import { addMonths, endOfDay, parseISO, startOfDay } from "date-fns";

const getDatesInterval = (
  startDate?: string | null,
  endDate?: string | null,
) => {
  let start: Date, end: Date;
  if (startDate) {
    start = startOfDay(parseISO(startDate));
    end = endDate ? endOfDay(parseISO(endDate)) : endOfDay(start);
  } else {
    const now = new Date();
    start = startOfDay(addMonths(now, -1));
    end = endOfDay(now);
  }

  return { start, end };
};

export default getDatesInterval;
