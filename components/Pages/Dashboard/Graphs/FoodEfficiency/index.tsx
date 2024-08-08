import { Card } from "@/components/ui/card";
import { useState } from "react";
import stylesGraph from "../styles.module.css";

import BarGraph from "./BarGraph";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useDataContext } from "@/providers/DataContext";

export default function FoodEfficencyGraph() {
  const [isStackedChart, setIsStackedChart] = useState(false);
  const { foodEfficiency } = useDataContext();

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
        <BarGraph data={foodEfficiency} isStackedChart={isStackedChart} />
      </div>
    </Card>
  );
}
