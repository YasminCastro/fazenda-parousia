import { useFilterContext } from "@/providers/FilterContext";
import axios from "axios";
import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import stylesGraph from "../styles.module.css";
import ComposedGraph from "./ComposedGraph";
import { IMargin, IMarginValues } from "@/interfaces/Graphs/margin";

export default function MarginGraph() {
  const [foodMarginData, setMarginCostData] = useState<IMarginValues[]>([]);
  const [milkMarginData, setMilkMarginData] = useState<IMarginValues[]>([]);
  const { selectedBatch } = useFilterContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<IMargin>(
          `/api/graph/margin?batch=${selectedBatch}`,
        );
        setMarginCostData(response.data.foodMargin);
        setMilkMarginData(response.data.milkMargin);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedBatch]);

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
