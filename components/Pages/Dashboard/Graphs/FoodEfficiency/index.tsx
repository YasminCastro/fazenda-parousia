import { useFilterContext } from "@/providers/FilterContext";
import { formatXAxis } from "@/utils/formatXAxis";
import { getBarColorByName } from "@/utils/getGraphColors";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";

export default function FoodEfficencyGraph() {
  const [data, setData] = useState([]);
  const { selectedBatch, batches } = useFilterContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/graph/food-efficiency?batch=${selectedBatch}`,
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
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date_record" tickFormatter={formatXAxis} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Brush
          dataKey="date_record"
          height={30}
          stroke={getBarColorByName(batches, selectedBatch)}
          tickFormatter={formatXAxis}
        />
        <Line
          type="monotone"
          dataKey="value"
          name="Eficiência Alimentar"
          stroke={getBarColorByName(batches, selectedBatch)}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
