import { Card } from "@/components/ui/card";

import PieGraph from "./PieGraph";
import stylesGraph from "../styles.module.css";
import { useDataContext } from "@/providers/DataContext";

export default function NumberOfAnimals() {
  const { numberOfAnimals } = useDataContext();
  const title = numberOfAnimals.length > 0 ? numberOfAnimals[0].graphTitle : "";

  return (
    <Card className={`${stylesGraph.cardWrapper}`}>
      <div className={`${stylesGraph.graphHeader}`}>
        <h2 className={`${stylesGraph.graphTitle}`}>{title}</h2>
      </div>
      <div className={`${stylesGraph.graphWrapper}`}>
        <PieGraph data={numberOfAnimals} />
      </div>
    </Card>
  );
}
