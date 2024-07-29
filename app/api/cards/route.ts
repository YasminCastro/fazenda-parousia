import api from "@/lib/api";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    let batch = url.searchParams.get("batch");
    let startDate = url.searchParams.get("startDate");
    let endDate = url.searchParams.get("endDate");

    if (!batch) throw new Error("Invalid batch");

    const key = batch === "all" ? "Fazenda" : `Lote ${batch.toUpperCase()}`;

    const { data } = await api.get("/data");

    let dashboardCards = [];

    for (let card of dashboardCardsMapping) {
      let newKPI = { ...card };
      const foundKPI = data.find((kpi: any) => kpi.KPI === card.kpi);
      if (foundKPI) {
        newKPI.value = foundKPI[key];
      }

      if (card.cardType === "double" && card.kpi2) {
        const foundKPI2 = data.find((kpi: any) => kpi.KPI === card.kpi2);
        if (foundKPI2) {
          newKPI.value2 = foundKPI2[key];
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
    key: "milkRevenue",
  },
  {
    cardType: "double",
    title: "Custo - Alimentação (R$/vaca/dia)",
    kpi: "Custo alimentação",
    title2: "Custo R$/kg de leite",
    kpi2: "Margem sobre alimentação (R$/kg)",
    key: "cost",
  },
  {
    cardType: "double",
    title: "Margem sobre alimentação (R$/vaca/dia)",
    kpi: "Margem sobre alimentação (R$/vaca/dia)",
    title2: "Margem R$/kg de leite",
    kpi2: "Margem sobre alimentação (R$/kg)",
    key: "margin",
  },
  {
    cardType: "simple",
    title: "Retorno sobre investimento (%)",
    kpi: "Retorno Investimento (%)",
    key: "investmentReturn",
  },
  {
    cardType: "simple",
    title: "Produção média (kg/vaca/dia)",
    kpi: "Média de produção (kg/vaca/dia)",
    key: "milkProduction",
  },
  {
    cardType: "simple",
    title: "Quantidade de animais",
    kpi: "Número de Animais",
    key: "numberOfAnimals",
  },
  {
    cardType: "simple",
    title: "Eficiência alimentar",
    kpi: "Eficiência Alimentar",
    key: "foodEfficiency",
  },
  {
    cardType: "double",
    title: "Mastite",
    kpi: "Vacas Mastite",
    title2: "Carência",
    kpi2: "Vacas Carência Mastite",
    key: "mastite",
  },
];
