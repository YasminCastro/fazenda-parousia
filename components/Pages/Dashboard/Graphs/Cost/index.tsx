import { useFilterContext } from "@/providers/FilterContext";
import axios from "axios";
import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import stylesGraph from "../styles.module.css";
import ComposedGraph from "./ComposedGraph";
import { ICost, ICostValues } from "@/interfaces/Graphs/cost";

export default function CostGraph() {
  const [foodCostData, setFoodCostData] = useState<ICostValues[]>([]);
  const [milkCostData, setMilkCostData] = useState<ICostValues[]>([]);
  const { selectedBatch } = useFilterContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ICost>(
          `/api/graph/cost?batch=${selectedBatch}`,
        );
        setFoodCostData(response.data.foodCost);
        setMilkCostData(response.data.milkCost);
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
          data={foodCostData}
          title="Custo - Alimentação (R$/vaca/dia)"
          yAxisLabel="R$"
        />
        <ComposedGraph
          data={milkCostData}
          title="Custo R$/kg de leite"
          yAxisLabel="R$/kg"
        />
      </div>
    </Card>
  );
}
