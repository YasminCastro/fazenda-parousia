import api from "@/lib/api";
import formatBatchName from "@/utils/formatBatchName";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    let batch = url.searchParams.get("batch");

    if (!batch) batch = "all";

    const { data } = await api.get("/eficiencia-alimentar");

    let array = data.map((item: any) => {
      if (batch === "all") {
        return {
          date_record: item.date_record,
          value: item.Fazenda,
        };
      }

      const key = formatBatchName(batch, true);
      return { date_record: item.date_record, value: item[key] };
    });

    return Response.json(array);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
