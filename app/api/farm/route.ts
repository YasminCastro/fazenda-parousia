import api from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let batchParsed = [
      { value: "all", label: "Fazenda" },
      { value: "a", label: "Lote A" },
      { value: "b", label: "Lote B" },
      { value: "c", label: "Lote C" },
      { value: "d", label: "Lote D" },
      { value: "n", label: "Lote N" },
    ];

    // const { data } = await api.get("/data");
    // const batchs = Object.keys(data[0]).filter((key) => key.startsWith("Lote"));

    // for (let bach of batchs) {
    //   const value = bach.replaceAll(" ", "");
    //   batchParsed.push({ value, label: bach });
    // }

    return Response.json(batchParsed);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
