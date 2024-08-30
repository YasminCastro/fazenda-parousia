import { Card } from "@/components/ui/card";
import stylesGraph from "../styles.module.css";
import LeftChart from "./LeftChart";
import RightChart from "./RightChart";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { useFilterContext } from "@/providers/FilterContext";

interface IProps {
  data: any;
}
export default function ComposedChart({ data }: IProps) {
  const [ref, setRef] = useState(null) as any;
  const chartRef = useRef(null);
  const { date } = useFilterContext();

  useEffect(() => {
    setRef(chartRef);
    chartConfig.ref = ref;
  }, [chartRef]);

  let chartConfig = {
    percentColor: "",
    percentByMilkColor: "",
    title: "",
    ref: null,
  };
  if (data && data.leftSideChart && data && data.rightSideChart) {
    const leftSideChartTitle = data.leftSideChart.title
      .replace(/\s*\(.*?\)\s*/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();

    const fileStartDate =
      date && date.from ? format(date?.from, "dd-MM-yyyy") : "";
    const fileEndDate = date && date.to ? format(date?.to, "dd-MM-yyyy") : "";

    chartConfig = {
      percentColor:
        data.rightSideChart.key === "IoFC / vaca" ? "#4ad991" : "#fec53d",
      percentByMilkColor:
        data.rightSideChart.key === "IoFC / vaca" ? "#d9f7e7" : "#fef2d6",
      title: `${leftSideChartTitle}_${fileStartDate}_${fileEndDate}.png`,
      ref,
    };
  }

  return (
    <Card className={`${stylesGraph.cardWrapper}`} ref={chartRef}>
      <div className={`${stylesGraph.graphWrapper} grid grid-cols-2`}>
        {data && data.leftSideChart && <LeftChart data={data.leftSideChart} />}
        {data && data.rightSideChart && (
          <RightChart
            data={data.rightSideChart}
            rightChartConfig={chartConfig}
          />
        )}
      </div>
    </Card>
  );
}
