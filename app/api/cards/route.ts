import api from "@/lib/api";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    const batch = url.searchParams.get("batch");

    if (!batch) throw new Error("Invalid batch");

    const { data } = await api.get("/data");

    let dashboardCards = [];

    for (let card of dashboardCardsMapping) {
      let newKPI = { ...card };
      const foundKPI = data.find((kpi: any) => kpi.KPI === card.kpi);
      if (foundKPI) {
        newKPI.value = foundKPI[batch];
      }

      if (card.cardType === "double" && card.kpi2) {
        const foundKPI2 = data.find((kpi: any) => kpi.KPI === card.kpi2);
        if (foundKPI2) {
          newKPI.value2 = foundKPI2[batch];
        }
      }
      dashboardCards.push(newKPI);
    }

    return Response.json(dashboardCards);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

const dashboardCardsMapping: any = [
  {
    cardType: "simple",
    title: "Receita do leite (R$)",
    kpi: "Receita do Leite (R$)",
  },
  {
    cardType: "double",
    title: "Custo - Alimentação (R$)",
    kpi: "Custo alimentação",
    title2: "Custo/kg de leite",
    kpi2: "Margem sobre alimentação (R$/kg)",
  },
  {
    cardType: "double",
    title: "Margem sobre alimentação (R$)",
    kpi: "Margem sobre alimentação (R$/vaca/dia)",
    title2: "Margem/kg de leite",
    kpi2: "Margem sobre alimentação (R$/kg)",
  },
  {
    cardType: "simple",
    title: "Retorno sobre investimento (%)",
    kpi: "Retorno Investimento (%)",
  },
  {
    cardType: "simple",
    title: "Produção do leite (kg)",
    kpi: "Média de produção (kg/vaca/dia)",
  },
  {
    cardType: "simple",
    title: "Quantidade de animais",
    kpi: "Número de Animais",
  },
  {
    cardType: "simple",
    title: "Eficiência alimentar",
    kpi: "Eficiência Alimentar",
  },
  {
    cardType: "double",
    title: "Mastite",
    kpi: "Vacas Mastite",
    title2: "Carência",
    kpi2: "Vacas Carência Mastite",
  },
];
