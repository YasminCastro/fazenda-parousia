import { IMastite } from "@/interfaces/Graphs/mastite";
import api from "@/lib/api";
import getDatesBetween from "@/utils/getDatesBetween";
import { language } from "@/utils/projectLanguage";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// const example: IMastite[] = [
//   { date: "2024-03-30", mastite: 9, carenciaMastite: 8 },
//   { date: "2024-03-31", mastite: 0, carenciaMastite: 0 },
// ];

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    const batch = url.searchParams.get("batch");
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");
    const apiKey = "vaca_mastite";
    const apiKey2 = "vaca_carencia_mastite";
    if (!batch) throw new Error("Invalid batch");
    const key = batch === "all" ? "Fazenda" : `Lote ${batch.toUpperCase()}`;

    const allDates = getDatesBetween(startDate, endDate);

    const response: IMastite[] = [];

    for (let date of allDates) {
      const { data } = await api.get(`/data/${language}/${date}`);
      let newObject: any = { date };
      //FIRST KPI
      const kpiFound = data.find((kpi: any) => kpi.key === apiKey);
      if (kpiFound) {
        newObject.mastite = kpiFound[key];
      }

      //SECOND KPI
      const kpi2Found = data.find((kpi: any) => kpi.key === apiKey2);
      if (kpi2Found) {
        newObject.carenciaMastite = kpi2Found[key];
      }

      response.push(newObject);
    }

    return Response.json(response);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
