import { IMilkProduction } from "@/interfaces/Graphs/milkProduction";
import api from "@/lib/api";
import formatBatchName from "@/utils/formatBatchName";
import getDatesInterval from "@/utils/getDatesInterval";
import { isWithinInterval, parseISO } from "date-fns";
import { NextRequest } from "next/server";
import data from "@/backend/producao-leite.json";

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

    const datesInterval = getDatesInterval(startDate, endDate);

    let key = "";

    if (batch && batch !== "all") {
      key = formatBatchName(batch, false, true);
    }

    // const { data } = await api.get("/producao-leite");

    const response: IMilkProduction[] = data
      .filter((item: any) => {
        const date = parseISO(item.date);
        return isWithinInterval(date, datesInterval);
      })
      .map((item: any) => {
        if (batch === "all") return item;

        return { date: item.date, value: item[key] };
      });

    return Response.json(response);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
