import { INumberAnimals } from "@/interfaces/Graphs/animalsCount";
import formatLoteKeys from "@/utils/formatLoteKeys";

// const example: INumberAnimals[] = [
// { name: 'loteA', key: 'a', value: 45, title: 'Lote A' },
// { name: 'loteB', key: 'b', value: 38, title: 'Lote B' },
// ];

export default function NumberOfAnimalsDataParse(
  rawData: any,
  batch: string,
): INumberAnimals[] {
  const apiKey = "Animais";

  const key = batch === "all" ? "Fazenda" : `Lote ${batch.toUpperCase()}`;

  const kpiFound = rawData.data.find((kpi: any) => kpi.key === apiKey);

  if (kpiFound) {
    if (batch === "all") {
      const batches = formatLoteKeys(kpiFound);

      const newArray = Object.keys(batches).map((item: string) => {
        const value: number = batches[item];
        const title = item.replace(/^lote/, "Lote ");
        return {
          name: item,
          key: item.slice(-1).toLowerCase(),
          value: value,
          title: title,
          graphTitle: kpiFound.KPI,
        };
      });

      return newArray;
    }
    return [
      {
        name: `lote${batch.toUpperCase()}`,
        key: batch,
        value: kpiFound[key],
        title: key,
        graphTitle: kpiFound.KPI,
      },
    ];
  }

  return [];
}
