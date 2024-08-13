import { Card } from "@/components/ui/card";
import stylesGraph from "../styles.module.css";
import ComposedGraph from "./ComposedGraph";
import { useDataContext } from "@/providers/DataContext";

export default function CostGraph() {
  const { cost } = useDataContext();
  const titleFood = cost.foodCost.length > 0 ? cost.foodCost[0].title : "";
  const titleMilk = cost.milkCost.length > 0 ? cost.milkCost[0].title : "";

  return (
    <Card className={`${stylesGraph.cardWrapper}`}>
      <div className={`${stylesGraph.graphWrapper} grid h-full grid-cols-2`}>
        <ComposedGraph
          data={cost.foodCost}
          title={titleFood}
          yAxisLabel="R$"
          yAxisLabel2="%"
        />
        <ComposedGraph
          data={cost.milkCost}
          title={titleMilk}
          yAxisLabel="R$/kg"
          yAxisLabel2="%"
        />
      </div>
    </Card>
  );
}
