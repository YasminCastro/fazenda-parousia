import { ICost, ICostValues } from "@/interfaces/Graphs/cost";

// const example: ICost = {
//   foodCost: [
//     {
//       date: "2024-06-11",
//       margin: 32.61,
//       percent: 4,
//     },
//   ],
//   milkCost: [
//     {
//       date: "2024-06-11",
//       margin: 0.67,
//       percent: 4,
//     },
//   ],
// };

export default function CostDataParse(rawData: any, batch: string): ICost {
  const apiKey = "Cow Feed Cost"; //R%
  const apiKey2 = "(%) Feed Cost/Lt"; //Custo de alimenta\u00e7\u00e3o (%)

  let foodCost: ICostValues[] = [];
  let milkCost: ICostValues[] = [];

  const key = batch === "all" ? "Fazenda" : `Lote ${batch.toUpperCase()}`;

  for (let data of rawData) {
    const date = data.date;
    const kpiFound = data.data.find((kpi: any) => kpi.key === apiKey);
    if (kpiFound) {
      foodCost.push({
        date,
        title: kpiFound.KPI,
        margin: kpiFound[key],
        percent: 0,
      });
    }

    const kpi2Found = data.data.find((kpi: any) => kpi.key === apiKey2);
    if (kpi2Found) {
      milkCost.push({
        date,
        title: kpi2Found.KPI,
        margin: kpi2Found[key],
        percent: 0,
      });
    }
  }

  return { foodCost, milkCost };
}
