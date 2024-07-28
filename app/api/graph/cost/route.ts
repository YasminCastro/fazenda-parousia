import api from "@/lib/api";
import formatBatchName from "@/utils/formatBatchName";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    const batch = url.searchParams.get("batch");

    let key = "";

    if (batch && batch !== "all") {
      key = formatBatchName(batch, true);
    }

    const { data } = await api.get("/custo");

    const foodCost = data.map((item: any) => {
      return { date: item.date, ...item.foodCost };
    });

    const milkCost = data.map((item: any) => {
      return { date: item.date, ...item.milkCost };
    });

    return Response.json({ foodCost, milkCost });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
