import kpiMapping, { IKpiMapping } from "@/constants/kpiMapping";
import api from "@/lib/api";
import { language } from "@/utils/projectLanguage";
import { format, subDays } from "date-fns";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    let batch = url.searchParams.get("batch");
    let date = url.searchParams.get("date");

    if (!batch) throw new Error("Invalid batch");
    if (!date) date = format(subDays(new Date(), 1), "yyyy-MM-dd");

    const key = batch === "all" ? "Fazenda" : `Lote ${batch.toUpperCase()}`;

    const { data } = await api.get(`/data/${language}/${date}`);

    let dashboardCards = [];

    for (let card of kpiMapping) {
      let newKPI: IKpiMapping = { ...card };
      const foundKPI = data.find((kpi: any) => kpi.key === card.key);
      if (foundKPI) {
        newKPI.value = foundKPI[key];
        newKPI.title = foundKPI.KPI;
      }

      if (card.secondaryKey) {
        const foundKPI2 = data.find(
          (kpi: any) => kpi.key === card.secondaryKey,
        );

        if (foundKPI2) {
          newKPI.secundaryValue = foundKPI2[key];
          newKPI.secundaryTitle = foundKPI2.KPI;
        }
      }

      dashboardCards.push(newKPI);
    }

    return Response.json(dashboardCards);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
