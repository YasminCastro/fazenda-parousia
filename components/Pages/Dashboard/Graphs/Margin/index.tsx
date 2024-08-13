import { Card } from "@/components/ui/card";
import stylesGraph from "../styles.module.css";
import ComposedGraph from "./ComposedGraph";
import { useDataContext } from "@/providers/DataContext";

export default function MarginGraph() {
  const { margin } = useDataContext();

  return (
    <Card className={`${stylesGraph.cardWrapper}`}>
      <div className={`${stylesGraph.graphWrapper} grid h-full grid-cols-2`}>
        <ComposedGraph
          data={margin.foodMargin}
          title="Margem - Alimentação (R$/vaca/dia)"
          yAxisLabel="R$"
          yAxisLabel2="%"
        />
        <ComposedGraph
          data={margin.milkMargin}
          title="Margem R$/kg de leite"
          yAxisLabel="R$/kg"
          yAxisLabel2="%"
        />
      </div>
    </Card>
  );
}
