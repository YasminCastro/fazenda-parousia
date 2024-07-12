import api from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data } = await api.get("/quantidade-animais");

    const array = Object.entries(data[0])
      .filter(([key, value]) => typeof value === "number" && key !== "Fazenda")
      .map(([key, value]) => ({
        key,
        value,
      }));

    return Response.json(array);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
