import { Card } from "@/components/ui/card";
import stylesGraph from "../styles.module.css";
import ComposedGraph from "./ComposedGraph";
import { useDataContext } from "@/providers/DataContext";

export default function CostGraph() {
  const { cost } = useDataContext();

  return (
    <Card className={`${stylesGraph.cardWrapper}`}>
      <div className={`${stylesGraph.graphWrapper} grid h-full grid-cols-2`}>
        <ComposedGraph
          data={cost.foodCost}
          title={cost.foodCost[0].title}
          yAxisLabel="R$"
          yAxisLabel2="%"
        />
        <ComposedGraph
          data={cost.milkCost}
          title={cost.milkCost[0].title}
          yAxisLabel="R$/kg"
          yAxisLabel2="%"
        />
      </div>
    </Card>
  );
}
