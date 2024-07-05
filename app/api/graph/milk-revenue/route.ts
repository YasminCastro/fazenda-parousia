import api from "@/lib/api";

export const dynamic = "force-dynamic";

interface KPIData {
  name_kpi: string;
  date_record: string;
  value: number;
}

interface GroupedData {
  date_record: string;
  [key: string]: string | number;
}

export async function MilkRevenue() {
  try {
    const { data } = await api.get<KPIData[]>("/graph/receita-leite");

    const groupedData = data.reduce<Record<string, GroupedData>>(
      (acc: any, current: any) => {
        const { name_kpi, date_record, value } = current;

        if (!acc[date_record]) {
          acc[date_record] = { date_record };
        }

        acc[date_record][name_kpi] = value;
        return acc;
      },
      {},
    );

    const result = Object.values(groupedData);

    result.sort((a, b) => {
      return (
        new Date(a.date_record).getTime() - new Date(b.date_record).getTime()
      );
    });

    return Response.json(result);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
