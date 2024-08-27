import { useDataContext } from "@/providers/DataContext";
import { ComboboxHeader } from "./Combobox";
import { DatePicker } from "@/components/Global/DatePicker";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Header() {
  const { milkPrice } = useDataContext();

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
        <p className="text-sm text-gray-600">
          Preço do leite: R${formattedMilkPrice}/kg
        </p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="ml-auto w-fit p-3">
                <Download size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Baixar gráfico produção e média diária</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
