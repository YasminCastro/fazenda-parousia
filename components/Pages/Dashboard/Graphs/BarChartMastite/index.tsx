import { Card } from "@/components/ui/card";
import { useState } from "react";

import stylesGraph from "../styles.module.css";
import { Button } from "@/components/ui/button";
import { Download, RefreshCcw } from "lucide-react";
import Chart from "./Chart";

interface IProps {
  data: any;
}

export default function BarChartMastite({ data }: IProps) {
  const [isStackedChart, setIsStackedChart] = useState(false);

  const handleGraphChange = () => {
    setIsStackedChart(!isStackedChart);
  };

  return (
    <Card className={`${stylesGraph.cardWrapper}`}>
      <div className={`${stylesGraph.graphHeader}`}>
        <h2 className={`${stylesGraph.graphTitle}`}>{data.title}</h2>
        <div className="space-x-2">
          <Button
            className={`${stylesGraph.changeGraphButton}`}
            onClick={handleGraphChange}
          >
            <Download />
          </Button>
          <Button
            className={`${stylesGraph.changeGraphButton}`}
            onClick={handleGraphChange}
          >
            <RefreshCcw />
          </Button>
        </div>
      </div>
      <div className={`${stylesGraph.graphWrapper}`}>
        <Chart data={data.data} isStackedChart={isStackedChart} />
      </div>
    </Card>
  );
}
