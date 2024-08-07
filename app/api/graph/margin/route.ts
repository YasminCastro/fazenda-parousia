import { IMarginValues } from "@/interfaces/Graphs/margin";
import api from "@/lib/api";
import getDatesBetween from "@/utils/getDatesBetween";
import { language } from "@/utils/projectLanguage";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// const example: IMargin = [
//   {
//     date: "2024-03-30",
//     margin: 1.52,
//     percent: 800,
//   },
//   {
//     date: "2024-03-29",
//     margin: 868,
//     percent: 967,
//   },
// ];

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    const batch = url.searchParams.get("batch");
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");
    const apiKey = "IoFC / vaca";
    const apiKey2 = "IoFC / litro";

    if (!batch) throw new Error("Invalid batch");

    const allDates = getDatesBetween(startDate, endDate);
    const key = batch === "all" ? "Fazenda" : `Lote ${batch.toUpperCase()}`;

    let milkMargin: IMarginValues[] = [];
    let foodMargin: IMarginValues[] = [];

    for (let date of allDates) {
      const { data } = await api.get(`/data/${language}/${date}`);

      //FIRST KPI
      const kpiFound = data.find((kpi: any) => kpi.key === apiKey);
      if (kpiFound) {
        foodMargin.push({ date, margin: kpiFound[key], percent: 4 });
      }

      //SECOND KPI
      const kpi2Found = data.find((kpi: any) => kpi.key === apiKey2);
      if (kpi2Found) {
        milkMargin.push({ date, margin: kpi2Found[key], percent: 4 });
      }
    }

    return Response.json({ milkMargin, foodMargin });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
