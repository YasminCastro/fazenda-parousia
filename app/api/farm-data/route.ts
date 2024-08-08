import api from "@/lib/api";
import getDatesBetween from "@/utils/getDatesBetween";
import { language } from "@/utils/projectLanguage";

import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");

    const allDates = getDatesBetween(startDate, endDate);

    let response = [];

    for (let date of allDates) {
      const { data } = await api.get(`/data/${language}/${date}`);
      response.push({ date, data });
    }

    return Response.json(response);
  } catch (error: any) {
    console.log(error);
    return Response.json({ message: error.message }, { status: 500 });
  }
}
