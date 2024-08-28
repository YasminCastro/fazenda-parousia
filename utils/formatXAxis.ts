import { format, parseISO } from "date-fns";

export const formatTickDate = (tickItem: string) => {
  const date = parseISO(tickItem);
  return format(date, "dd/MM/yy");
};

export const formatTickDateDay = (tickItem: string) => {
  const date = parseISO(tickItem);
  return format(date, "dd/MM");
};
