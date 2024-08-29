import { Card } from "@/components/ui/card";
import stylesGraph from "../styles.module.css";
import Chart from "./Chart";

interface IProps {
  data: any;
}
export default function ComposedChart({ data }: IProps) {
  return (
    <Card className={`${stylesGraph.cardWrapper}`}>
      <div className={`${stylesGraph.graphWrapper} grid h-full grid-cols-2`}>
        {data && data.leftSideChart && <Chart data={data.leftSideChart} />}
        {data && data.rightSideChart && <Chart data={data.rightSideChart} />}
      </div>
    </Card>
  );
}
