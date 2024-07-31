import { format } from "date-fns";

export const formatTickDate = (tickItem: string) => {
  return format(new Date(tickItem), "dd/MM/yy");
};
