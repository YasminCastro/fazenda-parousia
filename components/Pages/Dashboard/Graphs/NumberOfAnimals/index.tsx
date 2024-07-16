import { useFilterContext } from "@/providers/FilterContext";
import { getBarColor } from "@/utils/getGraphColors";
import axios from "axios";
import { useEffect, useState } from "react";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

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
    <div className="flex h-full w-full flex-row">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie dataKey="value" data={data} cx="50%" cy="50%" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="w-1/12">
        {data.map((entry: any, index) => (
          <div key={index} className="mb-2 flex items-center">
            <span
              className="mr-2 inline-block h-4 w-4"
              style={{
                backgroundColor: getBarColor(index),
              }}
            ></span>
            <p style={{ margin: 0 }}>{entry.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
