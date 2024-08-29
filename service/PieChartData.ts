import kpiMapping from "@/constants/kpiMapping";
import formatLoteKeys from "@/utils/formatLoteKeys";

// const example: INumberAnimals[] = [
// { name: 'loteA', key: 'a', value: 45, title: 'Lote A' },
// { name: 'loteB', key: 'b', value: 38, title: 'Lote B' },
// ];

export default function PieChartData(
  rawData: any,
  batch: string,
  index: number,
) {
  const apiKey = kpiMapping[index].key;

  const key = batch === "all" ? "Fazenda" : `Lote ${batch.toUpperCase()}`;
  let chartTitle = "";

  const kpiFound = rawData.data.find((kpi: any) => kpi.key === apiKey);

  if (kpiFound) {
    chartTitle = kpiFound.KPI;

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
        };
      });

      return {
        ...kpiMapping[index],
        title: chartTitle,
        data: newArray,
      };
    }

    return {
      ...kpiMapping[index],
      title: chartTitle,
      data: [
        {
          name: `lote${batch.toUpperCase()}`,
          key: batch,
          value: kpiFound[key],
          title: key,
        },
      ],
    };
  }

  return { ...kpiMapping[index], title: chartTitle, data: [] };
}
