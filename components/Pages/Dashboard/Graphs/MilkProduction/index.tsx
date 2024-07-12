import { useFilterContext } from "@/providers/FilterContext";
import formatBatchName from "@/utils/formatBatchName";
import { formatXAxis } from "@/utils/formatXAxis";
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
  const { batch, selectedBatch } = useFilterContext();

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
        <Brush dataKey="date_record" height={30} stroke="#8884d8" />
        {selectedBatch !== "all" && (
          <Bar
            dataKey="value"
            stackId="a"
            name={formatBatchName(selectedBatch)}
            fill="#8280ff"
          />
        )}
        {selectedBatch === "all" &&
          batch.map((item, index) => {
            if (item.value === "all") {
              return;
            }
            return (
              <Bar
                dataKey={formatBatchName(item.value, true)}
                stackId="a"
                name={item.label}
                fill={getBarColor(index)}
              />
            );
          })}
      </BarChart>
    </ResponsiveContainer>
  );
}

const getBarColor = (index: number) => {
  const colors = [
    "#8280ff",
    "#fec53d",
    "#5cdd9c",
    "#ff9871",
    "#ff80ca",
    "#A6A4FF",
    "#FFE073",
    "#89F2C2",
    "#FFBDA2",
    "#FFA3DF",
  ];

  return colors[index];
};
