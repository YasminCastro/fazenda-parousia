import { Card } from "@/components/ui/card";
import { useFilterContext } from "@/providers/FilterContext";
import axios from "axios";
import { useEffect, useState } from "react";

import PieGraph from "./PieGraph";
import stylesGraph from "../styles.module.css";

export default function NumberOfAnimals() {
  const [data, setData] = useState([]);
  const { selectedBatch } = useFilterContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/graph/number-animals?batch=${selectedBatch}`,
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedBatch]);

  return (
    <Card className={`${stylesGraph.cardWrapper}`}>
      <div className={`${stylesGraph.graphHeader}`}>
        <h2 className={`${stylesGraph.graphTitle}`}>Quantidade de animais</h2>
      </div>
      <div className={`${stylesGraph.graphWrapper}`}>
        <PieGraph data={data} />
      </div>
    </Card>
  );
}
