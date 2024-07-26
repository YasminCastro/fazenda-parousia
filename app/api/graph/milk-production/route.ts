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
      key = formatBatchName(batch, false, true);
    }

    const { data } = await api.get("/producao-leite");

    const response = data.map((item: any) => {
      if (batch === "all") return item;

      return { date: item.date, value: item[key] };
    });

    return Response.json(response);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
