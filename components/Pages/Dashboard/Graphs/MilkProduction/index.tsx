import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFilterContext } from "@/providers/FilterContext";
import axios from "axios";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

import BarGraph from "./BarGraph";
import stylesGraph from "../styles.module.css";
import { IMilkProduction } from "@/interfaces/Graphs/milkProduction";

export default function MilkProductionGraph() {
  const [data, setData] = useState<IMilkProduction[]>([]);
  const { selectedBatch } = useFilterContext();
  const [isStackedChart, setIsStackedChart] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/graph/milk-production?batch=${selectedBatch}`,
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedBatch]);

  const handleGraphChange = () => {
    setIsStackedChart(!isStackedChart);
  };

  return (
    <Card className={`${stylesGraph.cardWrapper}`}>
      <div className={`${stylesGraph.graphHeader}`}>
        <h2 className={`${stylesGraph.graphTitle}`}>
          Produção média (kg/vaca/dia)
        </h2>
        <Button
          className={`${stylesGraph.changeGraphButton}`}
          onClick={handleGraphChange}
        >
          <RefreshCcw />
        </Button>
      </div>
      <div className={`${stylesGraph.graphWrapper}`}>
        <BarGraph data={data} isStackedChart={isStackedChart} />
      </div>
    </Card>
  );
}
