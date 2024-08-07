import api from "@/lib/api";
import { language } from "@/utils/projectLanguage";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    let batch = url.searchParams.get("batch");
    let date = url.searchParams.get("date");

    if (!batch) throw new Error("Invalid batch");

    const key = batch === "all" ? "Fazenda" : `Lote ${batch.toUpperCase()}`;

    const { data } = await api.get(`/data/${language}/${date}`);

    let dashboardCards = [];

    for (let card of dashboardCardsMapping) {
      let newKPI = { ...card };

      const foundKPI = data.find((kpi: any) => kpi.key === card.apiKey);

      if (foundKPI) {
        newKPI.value = foundKPI[key];
        newKPI.title = foundKPI.KPI;
      }

      if (card.cardType === "double" && card.apiKey2) {
        const foundKPI2 = data.find((kpi: any) => kpi.key === card.apiKey2);

        if (foundKPI2) {
          newKPI.value2 = foundKPI2[key];
          newKPI.title2 = foundKPI2.KPI;
        }
      }
      dashboardCards.push(newKPI);
    }

    console.log(dashboardCards);
    return Response.json(dashboardCards);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

const dashboardCardsMapping: any = [
  {
    cardType: "simple",
    key: "milkRevenue",
    apiKey: "Receita do Leite",
  },
  {
    cardType: "double",
    key: "cost",
    apiKey: "Feed_Cost",
    apiKey2: "Feed Cost/Lt",
  },
  {
    cardType: "double",
    key: "margin",
    apiKey: "IoFC / vaca",
    apiKey2: "IoFC / litro",
  },
  {
    cardType: "simple",
    key: "investmentReturn",
    apiKey: "custo",
  },
  {
    cardType: "simple",
    key: "milkProduction",
    apiKey: "Media_Producao",
  },
  {
    cardType: "simple",
    key: "numberOfAnimals",
    apiKey: "Animais",
  },
  {
    cardType: "simple",
    key: "foodEfficiency",
    apiKey: "Feed Efficiency",
  },
  {
    cardType: "double",
    key: "mastite",
    apiKey: "vaca_mastite",
    apiKey2: "vaca_carencia_mastite",
  },
];

// const example = [
//   {
//     cardType: 'simple',
//     key: 'milkRevenue',
//     apiKey: 'Receita do Leite',
//     value: 19196.1,
//     title: 'Receita do Leite (R$)'
//   },
//   {
//     cardType: 'double',
//     key: 'cost',
//     apiKey: 'Feed_Cost',
//     apiKey2: 'Feed Cost/Lt',
//     value: 34.28,
//     title: 'Custo alimentação',
//     value2: 0.67,
//     title2: 'Custo alimentação por litro'
//   },
//   {
//     cardType: 'double',
//     key: 'margin',
//     apiKey: 'IoFC / vaca',
//     apiKey2: 'IoFC / litro',
//     value: 7.48,
//     title: 'Margem sobre alimentação (R$/vaca/dia)',
//     value2: 1.43,
//     title2: 'Margem sobre alimentação (R$/kg)'
//   },
//   {
//     cardType: 'simple',
//     key: 'investmentReturn',
//     apiKey: 'custo',
//     value: 50.89,
//     title: 'Retorno Investimento (%)'
//   },
//   {
//     cardType: 'simple',
//     key: 'milkProduction',
//     apiKey: 'Media_Producao',
//     value: 34.14,
//     title: 'Média de produção (kg/vaca/dia)'
//   },
//   {
//     cardType: 'simple',
//     key: 'numberOfAnimals',
//     apiKey: 'Animais',
//     value: 264,
//     title: 'Número de Animais'
//   },
//   {
//     cardType: 'simple',
//     key: 'foodEfficiency',
//     apiKey: 'Feed Efficiency',
//     value: 1.32,
//     title: 'Eficiência Alimentar'
//   },
//   {
//     cardType: 'double',
//     key: 'mastite',
//     apiKey: 'vaca_mastite',
//     apiKey2: 'vaca_carencia_mastite',
//     value: 2,
//     title: 'Vacas Mastite',
//     value2: 3,
//     title2: 'Vacas Carência Mastite'
//   }
// ]
