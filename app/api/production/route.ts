import api from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data } = await api.get("/producao");

    return Response.json(data);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
