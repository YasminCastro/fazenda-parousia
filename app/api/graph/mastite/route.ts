import api from "@/lib/api";

export const dynamic = "force-dynamic";

interface GroupedData {
  date_record: string;
  [key: string]: string | number;
}

export async function GET() {
  try {
    const { data } = await api.get("/mastite");

    return Response.json(data);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
