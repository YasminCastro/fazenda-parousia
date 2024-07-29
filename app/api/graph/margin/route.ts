import { IMarginValues } from "@/interfaces/Graphs/margin";
import api from "@/lib/api";
import formatBatchName from "@/utils/formatBatchName";
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

    let batchKey = "all";

    if (batch && batch !== "all") {
      batchKey = formatBatchName(batch, false, true);
    }

    const { data: foodMarginData } = await api.get("/margem-alimentacao");

    const foodMargin: IMarginValues[] = foodMarginData.map((item: any) => {
      if (batchKey === "all") {
        return {
          date: item.date,
          margin: item.farm.valor,
          percent: item.farm.porcentagem,
        };
      }

      return {
        date: item.date,
        margin: item[batchKey].valor,
        percent: item[batchKey].porcentagem,
      };
    });

    const { data: milkMarginData } = await api.get("/margem-leite");

    const milkMargin: IMarginValues[] = milkMarginData.map((item: any) => {
      if (batchKey === "all") {
        return {
          date: item.date,
          margin: item.farm.valor,
          percent: item.farm.porcentagem,
        };
      }

      return {
        date: item.date,
        margin: item[batchKey].valor,
        percent: item[batchKey].porcentagem,
      };
    });

    return Response.json({ milkMargin, foodMargin });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
