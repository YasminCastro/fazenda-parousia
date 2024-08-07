import { IMilkProduction } from "@/interfaces/Graphs/milkProduction";
import api from "@/lib/api";
import formatLoteKeys from "@/utils/formatLoteKeys";
import getDatesBetween from "@/utils/getDatesBetween";
import { language } from "@/utils/projectLanguage";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// const example: IMilkProduction[] = [
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

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    const batch = url.searchParams.get("batch");
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");
    const apiKey = "Media_Producao";
    if (!batch) throw new Error("Invalid batch");

    const allDates = getDatesBetween(startDate, endDate);
    const key = batch === "all" ? "Fazenda" : `Lote ${batch.toUpperCase()}`;

    let response: IMilkProduction[] = [];

    for (let date of allDates) {
      const { data } = await api.get(`/data/${language}/${date}`);
      const kpiFound = data.find((kpi: any) => kpi.key === apiKey);
      if (kpiFound) {
        let newKpi: any = { date };
        if (batch === "all") {
          const batches = formatLoteKeys(kpiFound);
          newKpi = {
            date,
            ...batches,
          };
        } else {
          newKpi.value = kpiFound[key];
        }

        response.push(newKpi);
      }
    }
    return Response.json(response);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
