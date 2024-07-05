import api from "@/lib/api";

export const dynamic = "force-dynamic";

interface KPIData {
  date_record: string;
  loteA: number;
  loteB: number;
  loteC: number;
  loteD: number;
  loteE: number;
  loteN: number;
}

interface GroupedData {
  date_record: string;
  [key: string]: string | number;
}

export async function GET() {
  try {
    const { data } = await api.get<KPIData[]>("/receita-leite");

    data.sort((a, b) => {
      return (
        new Date(a.date_record).getTime() - new Date(b.date_record).getTime()
      );
    });

    return Response.json(data);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
