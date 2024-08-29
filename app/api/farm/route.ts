export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let batchParsed = [
      { value: "all", label: "Fazenda", key: "fazenda" },
      { value: "a", label: "Lote A", key: "loteA" },
      { value: "b", label: "Lote B", key: "loteB" },
      { value: "c", label: "Lote C", key: "loteC" },
      { value: "d", label: "Lote D", key: "loteD" },
      { value: "n", label: "Lote N", key: "loteN" },
    ];

    return Response.json(batchParsed);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
