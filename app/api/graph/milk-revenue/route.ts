import api from "@/lib/api";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

interface KPIData {
  date_record: string;
  LoteA?: number;
  LoteB?: number;
  LoteC?: number;
  LoteD?: number;
  LoteE?: number;
  LoteN?: number;
}

type Batch = "LoteA" | "LoteB" | "LoteC" | "LoteD" | "LoteE" | "LoteN";
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    const batch = url.searchParams.get("batch") as Batch;

    const { data } = await api.get<KPIData[]>("/receita-leite");

    let response: KPIData[] = data;
    if (batch) {
      response = response.map((item: KPIData) => {
        return {
          date_record: item.date_record,
          value: item[batch],
        };
      });
    }

    response.sort((a, b) => {
      return (
        new Date(a.date_record).getTime() - new Date(b.date_record).getTime()
      );
    });

    return Response.json(response);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
