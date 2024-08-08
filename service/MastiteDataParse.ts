import { IMargin, IMarginValues } from "@/interfaces/Graphs/margin";
import { IMastite } from "@/interfaces/Graphs/mastite";

// const example: IMastite[] = [
//   { date: "2024-03-30", mastite: 9, carenciaMastite: 8 },
//   { date: "2024-03-31", mastite: 0, carenciaMastite: 0 },
// ];

export default function MastiteDataParse(
  rawData: any,
  batch: string,
): IMastite[] {
  const apiKey = "vaca_mastite";
  const apiKey2 = "vaca_carencia_mastite";

  const response: IMastite[] = [];

  const key = batch === "all" ? "Fazenda" : `Lote ${batch.toUpperCase()}`;

  for (let data of rawData) {
    let newObject: any = { date: data.date };
    //FIRST KPI
    const kpiFound = data.data.find((kpi: any) => kpi.key === apiKey);
    if (kpiFound) {
      newObject.mastite = kpiFound[key];
    }

    //SECOND KPI
    const kpi2Found = data.data.find((kpi: any) => kpi.key === apiKey2);
    if (kpi2Found) {
      newObject.carenciaMastite = kpi2Found[key];
    }

    response.push(newObject);
  }

  return response;
}
