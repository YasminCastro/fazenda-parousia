import kpiMapping from "@/constants/kpiMapping";
import formatLoteKeys from "@/utils/formatLoteKeys";

export default function PieAndLineData(
  rawData: any,
  batch: string,
  index: number,
) {
  const apiKey = kpiMapping[index].key;

  const key = batch === "all" ? "Fazenda" : `Lote ${batch.toUpperCase()}`;
  let chartTitle = "";
  let lineData = [];
  let response: any = {};

  // PIE CHART
  const kpiFound = rawData[0].data.find((kpi: any) => kpi.key === apiKey);

  if (kpiFound) {
    chartTitle = kpiFound.KPI;
    //default
    response = {
      ...kpiMapping[index],
      title: chartTitle,
      pieData: [
        {
          name: `lote${batch.toUpperCase()}`,
          key: batch,
          value: kpiFound[key],
          title: key,
        },
      ],
    };

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

      response.pieData = newArray;
    }
  }

  // LINE CHART

  for (let data of rawData) {
    const kpiFound = data.data.find((kpi: any) => kpi.key === apiKey);

    if (kpiFound) {
      const date = data.date;

      if (batch === "all") {
        const batches = formatLoteKeys(kpiFound);
        lineData.push({ date, ...batches });
      } else {
        lineData.push({ date, value: kpiFound[key] });
      }
    }
  }

  response.lineData = lineData;

  return response;
}
