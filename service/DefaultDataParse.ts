import { IFoodEfficiency } from "@/interfaces/Graphs/foodEfficiency";
import { IInvestmentReturn } from "@/interfaces/Graphs/investmentReturn";
import { IMilkProduction } from "@/interfaces/Graphs/milkProduction";
import { IMilkRevenue } from "@/interfaces/Graphs/milkRevenue";
import formatLoteKeys from "@/utils/formatLoteKeys";

// const example = [
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

export default function DefaultDataParse(
  rawData: any,
  batch: string,
  apiKey: string,
):
  | IInvestmentReturn[]
  | IMilkRevenue[]
  | IMilkProduction[]
  | IFoodEfficiency[] {
  let response = [];
  const key = batch === "all" ? "Fazenda" : `Lote ${batch.toUpperCase()}`;

  for (let data of rawData) {
    const kpiFound = data.data.find((kpi: any) => kpi.key === apiKey);

    if (kpiFound) {
      const date = data.date;
      if (batch === "all") {
        const batches = formatLoteKeys(kpiFound);
        response.push({ date, title: kpiFound.KPI, ...batches });
      } else {
        response.push({ date, title: kpiFound.KPI, value: kpiFound[key] });
      }
    }
  }

  return response;
}
