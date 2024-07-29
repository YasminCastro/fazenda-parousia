import { Card } from "@/components/ui/card";
import { useFilterContext } from "@/providers/FilterContext";
import axios from "axios";
import { useEffect, useState } from "react";
import stylesGraph from "../styles.module.css";

import LineGraph from "./LineGraph";
import { IFoodEfficiency } from "@/interfaces/Graphs/foodEfficiency";

export default function FoodEfficencyGraph() {
  const [data, setData] = useState<IFoodEfficiency[]>([]);
  const { selectedBatch } = useFilterContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/graph/food-efficiency?batch=${selectedBatch}`,
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedBatch]);

  return (
    <Card className={`${stylesGraph.cardWrapper}`}>
      <div className={`${stylesGraph.graphHeader}`}>
        <h2 className={`${stylesGraph.graphTitle}`}>Eficiência alimentar</h2>
      </div>
      <div className={`${stylesGraph.graphWrapper}`}>
        <LineGraph data={data} />
      </div>
    </Card>
  );
}
