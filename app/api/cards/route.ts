import api from "@/lib/api";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    let batchKey = url.searchParams.get("batch");

    if (!batchKey) throw new Error("Invalid batch");

    if (batchKey !== "all") batchKey = `Lote ${batchKey.toUpperCase()}`;

    const { data } = await api.get("/data");

    let dashboardCards = [];

    for (let card of dashboardCardsMapping) {
      let newKPI = { ...card };
      const foundKPI = data.find((kpi: any) => kpi.KPI === card.kpi);
      if (foundKPI) {
        newKPI.value = foundKPI[batchKey];
      }

      if (card.cardType === "double" && card.kpi2) {
        const foundKPI2 = data.find((kpi: any) => kpi.KPI === card.kpi2);
        if (foundKPI2) {
          newKPI.value2 = foundKPI2[batchKey];
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
    key: "foodCost",
  },
  {
    cardType: "double",
    title: "Margem sobre alimentação (R$/vaca/dia)",
    kpi: "Margem sobre alimentação (R$/vaca/dia)",
    title2: "Margem R$/kg de leite",
    kpi2: "Margem sobre alimentação (R$/kg)",
    key: "foodMargin",
  },
  {
    cardType: "simple",
    title: "Retorno sobre investimento (%)",
    kpi: "Retorno Investimento (%)",
    key: "investmentReturn",
  },
  {
    cardType: "simple",
    title: "Produção do leite (kg)",
    kpi: "Média de produção (kg/vaca/dia)",
    key: "milkProduction",
  },
  {
    cardType: "simple",
    title: "Quantidade de animais",
    kpi: "Número de Animais",
    key: "animalCount",
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
