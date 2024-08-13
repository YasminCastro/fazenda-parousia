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

export default function MilkPrice(rawData: any, batch: string, date: any) {
  const apiKey = "preco_leite";

  const key = batch === "all" ? "Fazenda" : `Lote ${batch.toUpperCase()}`;

  const kpiDate = rawData.find((data: any) => data.date === date);
  const kpiFound = kpiDate.data.find((kpi: any) => kpi.key === apiKey);

  if (kpiFound) {
    return kpiFound[key];
  }

  return 0;
}
