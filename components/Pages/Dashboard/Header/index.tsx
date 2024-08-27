import { useDataContext } from "@/providers/DataContext";
import { ComboboxHeader } from "./Combobox";

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
        <div>
          <ComboboxHeader />
        </div>
      </div>
      <div className="text-sm text-gray-600">
        Preço do leite: R${formattedMilkPrice}/kg
      </div>
    </div>
  );
}
