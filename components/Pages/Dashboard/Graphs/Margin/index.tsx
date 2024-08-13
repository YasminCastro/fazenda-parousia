import { Card } from "@/components/ui/card";
import stylesGraph from "../styles.module.css";
import ComposedGraph from "./ComposedGraph";
import { useDataContext } from "@/providers/DataContext";

export default function MarginGraph() {
  const { margin } = useDataContext();
  const titleFood =
    margin.foodMargin.length > 0 ? margin.foodMargin[0].title : "";
  const titleMilk =
    margin.milkMargin.length > 0 ? margin.milkMargin[0].title : "";

  return (
    <Card className={`${stylesGraph.cardWrapper}`}>
      <div className={`${stylesGraph.graphWrapper} grid h-full grid-cols-2`}>
        <ComposedGraph
          data={margin.foodMargin}
          title={titleFood}
          yAxisLabel="R$"
          yAxisLabel2="%"
        />
        <ComposedGraph
          data={margin.milkMargin}
          title={titleMilk}
          yAxisLabel="R$/kg"
          yAxisLabel2="%"
        />
      </div>
    </Card>
  );
}
