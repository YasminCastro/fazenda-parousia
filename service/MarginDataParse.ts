import { IMargin, IMarginValues } from "@/interfaces/Graphs/margin";

// const example: ICost = {
//   foodMargin: [
//     {
//       date: "2024-06-11",
//       margin: 32.61,
//       percent: 4,
//     },
//   ],
//   milkMargin: [
//     {
//       date: "2024-06-11",
//       margin: 0.67,
//       percent: 4,
//     },
//   ],
// };

export default function MarginDataParse(rawData: any, batch: string): IMargin {
  const apiKey = "IoFC / vaca";
  const apiKey2 = "iofc_litro_%";

  let foodMargin: IMarginValues[] = [];
  let milkMargin: IMarginValues[] = [];

  const key = batch === "all" ? "Fazenda" : `Lote ${batch.toUpperCase()}`;

  for (let data of rawData) {
    const date = data.date;
    const kpiFound = data.data.find((kpi: any) => kpi.key === apiKey);
    if (kpiFound) {
      foodMargin.push({
        date,
        title: kpiFound.KPI,
        margin: kpiFound[key],
        percent: 0,
      });
    }

    const kpi2Found = data.data.find((kpi: any) => kpi.key === apiKey2);
    if (kpi2Found) {
      milkMargin.push({
        date,
        title: kpi2Found.KPI,
        margin: kpi2Found[key],
        percent: 0,
      });
    }
  }

  return { foodMargin, milkMargin };
}
