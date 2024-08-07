import { Card } from "@/components/ui/card";
import { useFilterContext } from "@/providers/FilterContext";
import axios from "axios";
import { useEffect, useState } from "react";
import stylesGraph from "../styles.module.css";

import { IFoodEfficiency } from "@/interfaces/Graphs/foodEfficiency";
import { format } from "date-fns";
import BarGraph from "./BarGraph";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export default function FoodEfficencyGraph() {
  const [data, setData] = useState<IFoodEfficiency[]>([]);
  const { selectedBatch, date } = useFilterContext();
  const [isStackedChart, setIsStackedChart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({
          batch: selectedBatch,
          startDate: date && date.from ? format(date?.from, "yyyy-MM-dd") : "",
          endDate: date && date.to ? format(date?.to, "yyyy-MM-dd") : "",
        });

        const response = await axios.get(
          `/api/graph/food-efficiency?${params.toString()}`,
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedBatch, date]);

  const handleGraphChange = () => {
    setIsStackedChart(!isStackedChart);
  };

  return (
    <Card className={`${stylesGraph.cardWrapper}`}>
      <div className={`${stylesGraph.graphHeader}`}>
        <h2 className={`${stylesGraph.graphTitle}`}>Eficiência alimentar</h2>
        <Button
          className={`${stylesGraph.changeGraphButton}`}
          onClick={handleGraphChange}
        >
          <RefreshCcw />
        </Button>
      </div>
      <div className={`${stylesGraph.graphWrapper}`}>
        {/* <LineGraph data={data} /> */}
        <BarGraph data={data} isStackedChart={isStackedChart} />
      </div>
    </Card>
  );
}
