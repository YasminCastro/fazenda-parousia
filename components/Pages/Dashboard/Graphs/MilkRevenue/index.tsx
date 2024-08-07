import { useState } from "react";
import { Card } from "@/components/ui/card";
import stylesGraph from "../styles.module.css";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import BarGraph from "./BarGraph";
import { useDataContext } from "@/providers/DataContext";

export default function MilkRevenueGraph() {
  const [isStackedChart, setIsStackedChart] = useState(false);
  const { milkRevenue } = useDataContext();

  const handleGraphChange = () => {
    setIsStackedChart(!isStackedChart);
  };

  return (
    <Card className={`${stylesGraph.cardWrapper}`}>
      <div className={`${stylesGraph.graphHeader}`}>
        <h2 className={`${stylesGraph.graphTitle}`}>Receita do leite (R$)</h2>
        <Button
          className={`${stylesGraph.changeGraphButton}`}
          onClick={handleGraphChange}
        >
          <RefreshCcw />
        </Button>
      </div>
      <div className={`${stylesGraph.graphWrapper}`}>
        <BarGraph data={milkRevenue} isStackedChart={isStackedChart} />
      </div>
    </Card>
  );
}
