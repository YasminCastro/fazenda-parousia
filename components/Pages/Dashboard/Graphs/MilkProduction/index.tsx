import { useFilterContext } from "@/providers/FilterContext";
import formatBatchName from "@/utils/formatBatchName";
import { formatXAxis } from "@/utils/formatXAxis";
import { getBarColor, getBarColorByName } from "@/utils/getGraphColors";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Brush,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function MilkProductionGraph() {
  const [data, setData] = useState([]);
  const { batches, selectedBatch } = useFilterContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/graph/milk-production?batch=${selectedBatch}`,
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
      <BarChart
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
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
        <ReferenceLine y={0} stroke="#000" />
        <Brush
          dataKey="date_record"
          height={30}
          stroke={getBarColorByName(batches, selectedBatch)}
        />
        {selectedBatch !== "all" && (
          <Bar
            dataKey="value"
            stackId="a"
            name={formatBatchName(selectedBatch)}
            fill={getBarColorByName(batches, selectedBatch)}
          />
        )}
        {selectedBatch === "all" &&
          batches.map((item: any, index) => {
            if (item.value === "all") {
              return;
            }
            return (
              <Bar
                dataKey={formatBatchName(item.value, true)}
                stackId="a"
                name={item.label}
                fill={getBarColor(index)}
                key={item.label}
              />
            );
          })}
      </BarChart>
    </ResponsiveContainer>
  );
}
