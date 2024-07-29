import { IFoodEfficiency } from "@/interfaces/Graphs/foodEfficiency";
import api from "@/lib/api";
import formatBatchName from "@/utils/formatBatchName";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// const example: IFoodEfficiency[] = [
//   {
//     date: "2024-03-30",
//     loteA: 1.61,
//     loteB: 1.89,
//     loteC: 1.5,
//     loteD: 1.29,
//     loteN: 1.75,
//     fazenda: 1.76,
//   },
//   { date: '2024-03-30', value: 57.16 }, //If batch is specified
// ];

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    const batch = url.searchParams.get("batch");

    let key = "";

    if (batch && batch !== "all") {
      key = formatBatchName(batch, false, true);
    }

    const { data } = await api.get("/eficiencia-alimentar");

    const response: IFoodEfficiency[] = data.map((item: any) => {
      if (batch === "all") return item;

      return { date: item.date, value: item[key] };
    });

    return Response.json(response);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
