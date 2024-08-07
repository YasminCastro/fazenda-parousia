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

export default function cost(rawData: any, batch: string): ICost {
  const apiKey = "Feed_Cost";
  const apiKey2 = "Feed Cost/Lt";

  let foodCost: ICostValues[] = [];
  let milkCost: ICostValues[] = [];

  const key = batch === "all" ? "Fazenda" : `Lote ${batch.toUpperCase()}`;

  for (let data of rawData) {
    console.log(data);
    const date = data.date;
    const kpiFound = data.data.find((kpi: any) => kpi.key === apiKey);
    if (kpiFound) {
      foodCost.push({ date, margin: kpiFound[key], percent: 4 });
    }

    const kpi2Found = data.data.find((kpi: any) => kpi.key === apiKey2);
    if (kpi2Found) {
      milkCost.push({ date, margin: kpi2Found[key], percent: 4 });
    }
  }

  return { foodCost, milkCost };
}
