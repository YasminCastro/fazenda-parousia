import { Card } from "@/components/ui/card";
import stylesGraph from "../styles.module.css";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Chart from "./Chart";

interface IProps {
  data: any;
}

export default function PieChart({ data }: IProps) {
  return (
    <Card className={`${stylesGraph.cardWrapper}`}>
      {data && (
        <>
          <div className={`${stylesGraph.graphHeader}`}>
            <h2 className={`${stylesGraph.graphTitle}`}>{data.title}</h2>
            <div className="space-x-2">
              <Button className={`${stylesGraph.changeGraphButton}`}>
                <Download />
              </Button>
            </div>
          </div>
          <div className={`${stylesGraph.graphWrapper}`}>
            <Chart data={data.data} />
          </div>
        </>
      )}
    </Card>
  );
}
