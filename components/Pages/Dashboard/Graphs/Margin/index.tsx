import { useFilterContext } from "@/providers/FilterContext";
import axios from "axios";
import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import stylesGraph from "../styles.module.css";
import ComposedGraph from "./ComposedGraph";
import { IMargin, IMarginValues } from "@/interfaces/Graphs/margin";
import { formatISO } from "date-fns";

export default function MarginGraph() {
  const [foodMarginData, setMarginCostData] = useState<IMarginValues[]>([]);
  const [milkMarginData, setMilkMarginData] = useState<IMarginValues[]>([]);
  const { selectedBatch, date } = useFilterContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({
          batch: selectedBatch,
          startDate: date && date.from ? formatISO(date?.from) : "",
          endDate: date && date.to ? formatISO(date?.to) : "",
        });
        const response = await axios.get<IMargin>(
          `/api/graph/margin?${params.toString()}`,
        );
        setMarginCostData(response.data.foodMargin);
        setMilkMarginData(response.data.milkMargin);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedBatch, date]);

  return (
    <Card className={`${stylesGraph.cardWrapper}`}>
      <div className={`${stylesGraph.graphWrapper} grid h-full grid-cols-2`}>
        <ComposedGraph
          data={foodMarginData}
          title="Margem - Alimentação (R$/vaca/dia)"
          yAxisLabel="R$"
        />
        <ComposedGraph
          data={milkMarginData}
          title="Margem R$/kg de leite"
          yAxisLabel="R$/kg"
        />
      </div>
    </Card>
  );
}
