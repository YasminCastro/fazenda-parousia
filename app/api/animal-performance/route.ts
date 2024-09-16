import { language } from "@/constants/projectLanguage";
import api from "@/lib/api";
import { NextRequest } from "next/server";
import { eachDayOfInterval, startOfMonth, endOfMonth, format } from "date-fns";
import { kpiAvaregeProduction } from "@/constants/kpiMapping";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { data } = await api.get(`animais/2024-06-01/2024-06-30`);

    console.log(data);

    return Response.json({
      production: data,
    });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

const getAllDaysOfMonthFormatted = (date: string) => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);

  return eachDayOfInterval({ start, end }).map((day) =>
    format(day, "yyyy-MM-dd"),
  );
};
