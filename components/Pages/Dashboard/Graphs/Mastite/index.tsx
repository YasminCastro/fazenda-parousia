import { Card } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";

import stylesGraph from "../styles.module.css";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import BarGraph from "./BarGraph";
import { IMastite } from "@/interfaces/Graphs/mastite";
import { useFilterContext } from "@/providers/FilterContext";
import { formatISO } from "date-fns";

export default function MastiteGraph() {
  const [data, setData] = useState<IMastite[]>([]);
  const [isStackedChart, setIsStackedChart] = useState(false);
  const { date } = useFilterContext();

  const handleGraphChange = () => {
    setIsStackedChart(!isStackedChart);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({
          startDate: date && date.from ? formatISO(date?.from) : "",
          endDate: date && date.to ? formatISO(date?.to) : "",
        });
        const response = await axios.get(
          `/api/graph/mastite?${params.toString()}`,
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [date]);
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
