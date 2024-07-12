import { useFilterContext } from "@/providers/FilterContext";
import { getBarColor } from "@/utils/getGraphColors";
import axios from "axios";
import { useEffect, useState } from "react";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

export default function NumberOfAnimals() {
  const [data, setData] = useState([]);
  const { batches, selectedBatch } = useFilterContext();

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
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(index)} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
