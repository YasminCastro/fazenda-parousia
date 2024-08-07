import { IMilkRevenue } from "@/interfaces/Graphs/milkRevenue";
import formatLoteKeys from "@/utils/formatLoteKeys";

// const example: IMilkProduction[] = [
//   {
//     date: "2024-03-30",
//     loteA: 1.61,
//     loteB: 1.89,
//     loteC: 1.5,
//     loteD: 1.29,
//     loteN: 1.75,
//     fazenda: 1.76,
//   },
//   { date: '2024-03-30', value: 57.16 }, //If batch is specified
// ];

export default function milkRevenue(rawData: any, batch: string) {
  const apiKey = "Receita do Leite";

  let response: IMilkRevenue[] = [];
  const key = batch === "all" ? "Fazenda" : `Lote ${batch.toUpperCase()}`;

  for (let data of rawData) {
    const kpiFound = data.data.find((kpi: any) => kpi.key === apiKey);

    if (kpiFound) {
      const date = data.date;
      if (batch === "all") {
        const batches = formatLoteKeys(kpiFound);
        response.push({ date, ...batches });
      } else {
        response.push({ date, value: kpiFound[key] });
      }
    }
  }

  return response;
}
