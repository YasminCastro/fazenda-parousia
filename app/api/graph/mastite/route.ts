import { IMastite } from "@/interfaces/Graphs/mastite";
import api from "@/lib/api";

export const dynamic = "force-dynamic";

// const example: IMastite[] = [
//   { date: "2024-03-30", mastite: 9, carenciaMastite: 8 },
//   { date: "2024-03-31", mastite: 0, carenciaMastite: 0 },
// ];

export async function GET() {
  try {
    const { data } = await api.get("/mastite");

    const response: IMastite[] = data;

    return Response.json(response);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
