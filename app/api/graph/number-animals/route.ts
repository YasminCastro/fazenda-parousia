import api from "@/lib/api";
import formatBatchName from "@/utils/formatBatchName";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    const batch = url.searchParams.get("batch");

    const { data } = await api.get("/quantidade-animais");

    let array = Object.entries(data[0])
      .filter(([key, value]) => typeof value === "number" && key !== "Fazenda")
      .map(([key, value]) => ({
        key,
        value,
      }));

    if (batch && batch !== "all") {
      const key = formatBatchName(batch);
      array = array.filter((item) => item.key === key);
    }

    return Response.json(array);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
