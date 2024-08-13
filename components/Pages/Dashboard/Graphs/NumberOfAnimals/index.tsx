import { Card } from "@/components/ui/card";

import PieGraph from "./PieGraph";
import stylesGraph from "../styles.module.css";
import { useDataContext } from "@/providers/DataContext";

export default function NumberOfAnimals() {
  const { numberOfAnimals } = useDataContext();

  return (
    <Card className={`${stylesGraph.cardWrapper}`}>
      <div className={`${stylesGraph.graphHeader}`}>
        <h2 className={`${stylesGraph.graphTitle}`}>
          {numberOfAnimals[0].graphTitle}
        </h2>
      </div>
      <div className={`${stylesGraph.graphWrapper}`}>
        <PieGraph data={numberOfAnimals} />
      </div>
    </Card>
  );
}
