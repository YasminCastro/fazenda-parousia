import { Card } from "@/components/ui/card";
import { useState } from "react";

import stylesGraph from "../styles.module.css";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import BarGraph from "./BarGraph";
import { useDataContext } from "@/providers/DataContext";

export default function MastiteGraph() {
  const [isStackedChart, setIsStackedChart] = useState(false);
  const { mastite } = useDataContext();
  const title = mastite.length > 0 ? mastite[0].mastiteTitle : "";

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
        <BarGraph data={mastite} isStackedChart={isStackedChart} />
      </div>
    </Card>
  );
}
