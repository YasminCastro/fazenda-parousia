import api from "@/lib/api";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    let date = url.searchParams.get("date");

    const { data } = await api.get(`/producao/${date}`);

    const response = data.map((item: any) => {
      const type = item.KPI;
      let color = "#8280ff";
      switch (type) {
        case "IATF":
          color = "#fec53d";
          break;
        case "Manejo Reprodutivo":
          color = "#4ad991";
          break;
        case "BTS/Vacina":
          color = "#ff9871";
          break;
      }
      return { date: item.Data, value: item["Produção"], type, color };
    });

    return Response.json(response);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
