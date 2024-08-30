import kpiMapping, { IKpiMapping } from "@/constants/kpiMapping";
import { language } from "@/constants/projectLanguage";
import api from "@/lib/api";
import getPercentValueByMilk from "@/utils/getPercentValueByMilk";
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
          newKPI.secundaryTitle = foundKPI2.KPI;
          newKPI.secundaryValue = foundKPI2[key];

          if (
            card.secondaryKey === "iofc_litro_%" ||
            card.secondaryKey === "(%) Feed Cost/Lt"
          ) {
            const milkValuePercent = getPercentValueByMilk(
              foundKPI2[key],
              key,
              data,
            );

            newKPI.secundaryValue = `${foundKPI2[key]}% - ${milkValuePercent}%`;
          }
        }
      }

      dashboardCards.push(newKPI);
    }

    return Response.json(dashboardCards);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
