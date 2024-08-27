import { useDataContext } from "@/providers/DataContext";
import { ComboboxHeader } from "./Combobox";
import { DatePicker } from "@/components/Global/DatePicker";
import { Button } from "@/components/ui/button";

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
          <Button>Downlaod</Button>
        </div>
      </div>
      <div className="text-sm text-gray-600">
        Preço do leite: R${formattedMilkPrice}/kg
      </div>
    </div>
  );
}
