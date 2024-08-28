import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";

import BarGraph from "./BarGraph";
import stylesGraph from "../styles.module.css";
import { useDataContext } from "@/providers/DataContext";

export default function MilkProductionGraph() {
  const [isStackedChart, setIsStackedChart] = useState(false);
  const { milkProduction } = useDataContext();
  const title = milkProduction.length > 0 ? milkProduction[0].title : "";

  const handleGraphChange = () => {
    setIsStackedChart(!isStackedChart);
  };

  return (
    <Card className={`${stylesGraph.cardWrapper}`}>
      <div className={`${stylesGraph.graphHeader}`}>
        <h2 className={`${stylesGraph.graphTitle}`}>{title}</h2>
        <Button
          className={`${stylesGraph.changeGraphButton}`}
          onClick={handleGraphChange}
        >
          <RefreshCcw />
        </Button>
      </div>
      <div className={`${stylesGraph.graphWrapper}`}>
        <BarGraph data={milkProduction} isStackedChart={isStackedChart} />
      </div>
    </Card>
  );
}
