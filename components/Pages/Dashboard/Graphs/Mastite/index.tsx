import { Card } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";

import stylesGraph from "../styles.module.css";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import BarGraph from "./BarGraph";
import { IMastite } from "@/interfaces/Graphs/mastite";

export default function MastiteGraph() {
  const [data, setData] = useState<IMastite[]>([]);
  const [isStackedChart, setIsStackedChart] = useState(false);

  const handleGraphChange = () => {
    setIsStackedChart(!isStackedChart);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/graph/mastite`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Card className={`${stylesGraph.cardWrapper}`}>
      <div className={`${stylesGraph.graphHeader}`}>
        <h2 className={`${stylesGraph.graphTitle}`}>Mastite</h2>
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
