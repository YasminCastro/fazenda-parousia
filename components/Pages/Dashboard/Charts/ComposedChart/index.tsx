import { Card } from "@/components/ui/card";
import stylesGraph from "../styles.module.css";
import LeftChart from "./LeftChart";
import RightChart from "./RightChart";

interface IProps {
  data: any;
}
export default function ComposedChart({ data }: IProps) {
  return (
    <Card className={`${stylesGraph.cardWrapper}`}>
      <div className={`${stylesGraph.graphWrapper} grid grid-cols-2`}>
        {data && data.leftSideChart && <LeftChart data={data.leftSideChart} />}
        {data && data.rightSideChart && (
          <RightChart data={data.rightSideChart} />
        )}
      </div>
    </Card>
  );
}
