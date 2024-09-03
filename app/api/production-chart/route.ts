import { language } from "@/constants/projectLanguage";
import api from "@/lib/api";
import { NextRequest } from "next/server";
import { eachDayOfInterval, startOfMonth, endOfMonth, format } from "date-fns";
import { kpiAvaregeProduction } from "@/constants/kpiMapping";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    let date = url.searchParams.get("date");

    if (!date) {
      date = format(startOfMonth(new Date()), "yyyy-MM-dd");
    }

    const dayOfTheMonth = getAllDaysOfMonthFormatted(date);

    const { data: production } = await api.get(`/producao/${date}`);

    const productionResponse = production.map((item: any) => {
      const type = item.KPI;
      let color = "#8280ff";
      switch (type) {
        case "IATF":
          color = "#fec53d";
          break;
        case "Manejo Reprodutivo":
          color = "#4ad991";
          break;
        case "BTS/Vacina":
          color = "#ff9871";
          break;
      }
      return { date: item.Data, value: item["Produção"], type, color };
    });

    let averageResponse = [];
    for (let day of dayOfTheMonth) {
      const { data: average } = await api.get(`/data/${language}/${day}`);
      const kpiFound = average.find(
        (kpi: any) => kpi.key === kpiAvaregeProduction,
      );
      const dayResponse = { date: day, value: 0 };
      if (kpiFound) {
        dayResponse.value = kpiFound.Fazenda;
      }

      averageResponse.push(dayResponse);
    }

    return Response.json({
      production: productionResponse,
      average: averageResponse,
    });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

const getAllDaysOfMonthFormatted = (date: string) => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);

  return eachDayOfInterval({ start, end }).map((day) =>
    format(day, "yyyy-MM-dd"),
  );
};
