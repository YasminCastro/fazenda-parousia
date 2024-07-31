import { IMastite } from "@/interfaces/Graphs/mastite";
import api from "@/lib/api";
import getDatesInterval from "@/utils/getDatesInterval";
import { isWithinInterval, parseISO } from "date-fns";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// const example: IMastite[] = [
//   { date: "2024-03-30", mastite: 9, carenciaMastite: 8 },
//   { date: "2024-03-31", mastite: 0, carenciaMastite: 0 },
// ];

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");

    const datesInterval = getDatesInterval(startDate, endDate);

    const { data } = await api.get("/mastite");

    const response: IMastite[] = data.filter((item: any) => {
      const date = parseISO(item.date);
      return isWithinInterval(date, datesInterval);
    });

    return Response.json(response);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
