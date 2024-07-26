import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFilterContext } from "@/providers/FilterContext";
import axios from "axios";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

import BarGraph from "./BarGraph";
import stylesGraph from "../styles.module.css";

export default function MilkProductionGraph() {
  const [data, setData] = useState([]);
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
      <div className="mx-6 mt-2 flex justify-between">
        <h2 className={`${stylesGraph.graphTitle}`}>Produção do leite (kg)</h2>
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
