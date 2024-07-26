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
        name: key,
        key: key.substring(key.length - 1).toLocaleLowerCase(),
        value,
        title: formatBatchName(
          key.substring(key.length - 1).toLocaleLowerCase(),
          true,
          false,
        ),
      }));

    if (batch && batch !== "all") {
      const key = formatBatchName(batch, false, true);
      array = array.filter((item) => item.name === key);
    }

    return Response.json(array);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
