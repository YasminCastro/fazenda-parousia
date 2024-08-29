import { Card } from "@/components/ui/card";
import stylesGraph from "../styles.module.css";
import Chart from "./Chart";
import LeftChart from "./LeftChart";

interface IProps {
  data: any;
}
export default function ComposedChart({ data }: IProps) {
  console.log(data);
  return (
    <Card className={`${stylesGraph.cardWrapper}`}>
      <div className={`${stylesGraph.graphWrapper} grid grid-cols-2`}>
        {data && data.leftSideChart && (
          <LeftChart data={data.leftSideChart} isStackedChart={false} />
        )}
        {data && data.rightSideChart && (
          <Chart
            data={data.rightSideChart}
            labelY={data.rightSideChart.secundaryLabelY}
            secundaryLabelY="%"
          />
        )}
      </div>
    </Card>
  );
}
