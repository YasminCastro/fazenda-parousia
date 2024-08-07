import { INumberAnimals } from "@/interfaces/Graphs/animalsCount";
import api from "@/lib/api";
import formatLoteKeys from "@/utils/formatLoteKeys";
import getDatesBetween from "@/utils/getDatesBetween";
import { language } from "@/utils/projectLanguage";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// const example: INumberAnimals[] = [
// { name: 'loteA', key: 'a', value: 45, title: 'Lote A' },
// { name: 'loteB', key: 'b', value: 38, title: 'Lote B' },
// ];

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    const batch = url.searchParams.get("batch");
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");
    const apiKey = "Animais";

    if (!batch) throw new Error("Invalid batch");
    const allDates = getDatesBetween(startDate, endDate);

    const key = batch === "all" ? "Fazenda" : `Lote ${batch.toUpperCase()}`;
    let response: INumberAnimals[] = [];

    for (let date of allDates) {
      const { data } = await api.get(`/data/${language}/${date}`);
      const kpiFound = data.find((kpi: any) => kpi.key === apiKey);
      if (kpiFound) {
        if (batch === "all") {
          const batches = formatLoteKeys(kpiFound);

          const newArray = Object.keys(batches).map((item: string) => {
            const value: number = batches[item];
            const title = item.replace(/^lote/, "Lote ");
            return {
              name: item,
              key: item.slice(-1).toLowerCase(),
              value: value,
              title: title,
            };
          });

          response = newArray;
        } else {
          const newObject = {
            name: `lote${batch.toUpperCase()}`,
            key: batch,
            value: kpiFound[key],
            title: key,
          };

          response.push(newObject);
        }
      }
    }

    return Response.json(response);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
