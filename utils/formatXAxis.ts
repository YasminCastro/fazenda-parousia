import { format } from "date-fns";

export const formatXAxis = (tickItem: string) => {
  return format(new Date(tickItem), "dd/MM/yy");
};
