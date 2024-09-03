import { useDataContext } from "@/providers/DataContext";
import { ComboboxHeader } from "./Combobox";
import { DatePicker } from "@/components/Global/DatePicker";
import ChartDownload from "@/components/Global/ChartDownload/Index";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFilterContext } from "@/providers/FilterContext";
import { format } from "date-fns";

export default function Header() {
  const { milkPrice } = useDataContext();
  const { date } = useFilterContext();

  const formattedMilkPrice = milkPrice.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">
          Desempenho zootécnico e econômico
        </h1>
        <div className="flex gap-2">
          <ComboboxHeader />
          <DatePicker />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p className="text-sm text-gray-600">
                Preço do leite: R${formattedMilkPrice}/kg
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Preço do dia:{" "}
                {date && date.from ? format(date?.from, "dd/MM/yyyy") : ""}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <ChartDownload />
      </div>
    </div>
  );
}
