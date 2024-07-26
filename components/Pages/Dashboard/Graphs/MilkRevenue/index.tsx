import axios from "axios";
import { useEffect, useState } from "react";
import { useFilterContext } from "@/providers/FilterContext";
import { Card } from "@/components/ui/card";
import stylesGraph from "../styles.module.css";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import BarGraph from "./BarGraph";

export default function MilkRevenueGraph() {
  const [data, setData] = useState([]);
  const [isStackedChart, setIsStackedChart] = useState(false);
  const { selectedBatch } = useFilterContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/graph/milk-revenue?batch=${selectedBatch}`,
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
        <h2 className={`${stylesGraph.graphTitle}`}>Receita do Leite (R$)</h2>
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
