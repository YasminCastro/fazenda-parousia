import { format, eachDayOfInterval, parseISO, subDays } from "date-fns";

const getDatesBetween = (startDate: string | null, endDate?: string | null) => {
  const start = startDate ? parseISO(startDate) : subDays(new Date(), 1);

  if (!endDate) {
    return [format(start, "yyyy-MM-dd")];
  }

  const end = parseISO(endDate);
  const dates = eachDayOfInterval({ start, end });

  return dates.map((date) => format(date, "yyyy-MM-dd"));
};

export default getDatesBetween;
