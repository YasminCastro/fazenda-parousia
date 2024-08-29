import kpiMapping from "@/constants/kpiMapping";

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
      leftSideChartData.push({
        date,
        title: kpiFound.KPI,
        margin: kpiFound[key],
        percent: 0,
      });
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
