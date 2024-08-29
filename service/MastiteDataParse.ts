import kpiMapping from "@/constants/kpiMapping";
import { IMastite } from "@/interfaces/Graphs/mastite";

// const example: IMastite[] = [
//   { date: "2024-03-30", mastite: 9, carenciaMastite: 8 },
//   { date: "2024-03-31", mastite: 0, carenciaMastite: 0 },
// ];

export default function MastiteDataParse(
  rawData: any,
  batch: string,
  index: number,
) {
  const apiKey = kpiMapping[index].key;
  const apiKey2 = kpiMapping[index].secondaryKey;

  const dataParsed: IMastite[] = [];
  let title = "";

  const key = batch === "all" ? "Fazenda" : `Lote ${batch.toUpperCase()}`;

  for (let data of rawData) {
    let newObject: any = { date: data.date };
    //FIRST KPI
    const kpiFound = data.data.find((kpi: any) => kpi.key === apiKey);

    if (kpiFound) {
      title = kpiFound.KPI;
      newObject.mastite = kpiFound[key];
      newObject.mastiteTitle = kpiFound.KPI;
    }

    //SECOND KPI
    const kpi2Found = data.data.find((kpi: any) => kpi.key === apiKey2);

    if (kpi2Found) {
      newObject.carenciaMastite = kpi2Found[key];
      newObject.carenciaMastiteTitle = kpi2Found.KPI;
    }

    dataParsed.push(newObject);
  }

  return { ...kpiMapping[index], title, data: dataParsed };
}
