import kpiMapping from "@/constants/kpiMapping";
import formatLoteKeys from "@/utils/formatLoteKeys";

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

export default function ComposedDataParse(
  rawData: any,
  batch: string,
  index: number,
) {
  const apiKey = kpiMapping[index].key;
  const apiKey2 = kpiMapping[index].secondaryKey;

  let leftSideChartData = [];
  let titleLeftSide = "";
  let rightSideChartData = [];
  let titleRightSide = "";

  const key = batch === "all" ? "Fazenda" : `Lote ${batch.toUpperCase()}`;

  for (let data of rawData) {
    const date = data.date;
    const kpiFound = data.data.find((kpi: any) => kpi.key === apiKey);
    if (kpiFound) {
      titleLeftSide = kpiFound.KPI;

      if (batch === "all") {
        const batches = formatLoteKeys(kpiFound);
        leftSideChartData.push({ date, ...batches });
      } else {
        leftSideChartData.push({ date, value: kpiFound[key] });
      }
    }

    const kpi2Found = data.data.find((kpi: any) => kpi.key === apiKey2);
    if (kpi2Found) {
      titleRightSide = kpi2Found.KPI;
      rightSideChartData.push({
        date,
        title: kpi2Found.KPI,
        margin: kpi2Found[key],
        percent: 0,
      });
    }
  }

  const leftSideChart = {
    title: titleLeftSide,
    data: leftSideChartData,
    ...kpiMapping[index],
  };

  const rightSideChart = {
    title: titleLeftSide,
    data: leftSideChartData,
    ...kpiMapping[index],
  };

  return { leftSideChart, rightSideChart };
}
