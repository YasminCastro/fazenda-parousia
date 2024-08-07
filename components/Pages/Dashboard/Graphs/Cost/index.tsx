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
          title="Custo - Alimentação (R$/vaca/dia)"
          yAxisLabel="R$"
        />
        <ComposedGraph
          data={cost.milkCost}
          title="Custo R$/kg de leite"
          yAxisLabel="R$/kg"
        />
      </div>
    </Card>
  );
}
