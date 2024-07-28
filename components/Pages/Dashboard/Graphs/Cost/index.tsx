import { useFilterContext } from "@/providers/FilterContext";
import axios from "axios";
import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import stylesGraph from "../styles.module.css";
import BarGraph from "./BarGraph";

export default function CostGraph() {
  const [foodCostData, setFoodCostData] = useState([]) as any[];
  const [milkCostData, setMilkCostData] = useState([]);
  const { selectedBatch } = useFilterContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
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
        <BarGraph
          data={foodCostData}
          title="Custo - Alimentação (R$/vaca/dia)"
          yAxisLabel="R$"
        />
        <BarGraph
          data={milkCostData}
          title="Custo R$/kg de leite"
          yAxisLabel="R$/kg"
        />
      </div>
    </Card>
  );
}
