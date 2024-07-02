import api from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let batchParsed = [{ value: "farm", label: "Fazenda" }];

    const { data } = await api.get("/data");
    const batchs = Object.keys(data[0]).filter((key) => key.startsWith("Lote"));

    for (let bach of batchs) {
      const value = bach.trim();
      batchParsed.push({ value, label: bach });
    }

    return Response.json(batchParsed);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
