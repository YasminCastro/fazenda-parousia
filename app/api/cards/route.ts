import kpiMapping, { IKpiMapping } from "@/constants/kpiMapping";
import { language } from "@/constants/projectLanguage";
import api from "@/lib/api";
import { format, parse, subDays } from "date-fns";
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
    let cardsDontHaveValue = 0;

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
        }
      }

      if (card.tertiaryKey) {
        const foundKPI3 = data.find((kpi: any) => kpi.key === card.tertiaryKey);

        if (foundKPI3) {
          newKPI.tertiaryTitle = foundKPI3.KPI;
          newKPI.tertiaryValue = foundKPI3[key];
        }
      }

      if (!newKPI.value) {
        cardsDontHaveValue += 1;
      }

      dashboardCards.push(newKPI);
    }

    let toastMessage = null;
    const rawDate = parse(date, "yyyy-MM-dd", new Date());
    const dateMessage = format(rawDate, "dd/MM/yyyy");
    if (cardsDontHaveValue >= 8) {
      toastMessage = {
        variant: "destructive",
        title: "Ops! Não há dados disponíveis",
        description: `Não encontramos dados para o dia  ${dateMessage}.`,
      };
    } else if (cardsDontHaveValue > 4) {
      toastMessage = {
        variant: "default",
        title: "Alguns dados não foram encontrados",
        description: `Parte das informações para o dia ${dateMessage} está indisponível.`,
      };
    }

    return Response.json({
      dashboardCards,
      toastMessage,
    });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
