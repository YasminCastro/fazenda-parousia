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
} from "recharts";

import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

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
        console.log("data", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedBatch]);

  // return (
  //   <ResponsiveContainer width="100%" height="100%">
  //     <BarChart
  //       width={500}
  //       height={300}
  //       data={data}
  //       margin={{
  //         top: 5,
  //         right: 30,
  //         left: 20,
  //         bottom: 5,
  //       }}
  //     >
  //       <CartesianGrid strokeDasharray="3 3" />
  //       <XAxis dataKey="date_record" tickFormatter={formatXAxis} />
  //       <YAxis />
  //       <Tooltip />
  //       <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
  //       <ReferenceLine y={0} stroke="#000" />
  //       <Brush dataKey="date_record" height={30} stroke="#3b82f6" />
  //       {selectedBatch !== "all" && (
  //         <Bar
  //           dataKey="value"
  //           stackId="a"
  //           name={formatBatchName(selectedBatch)}
  //           fill={getBarColorByName(batches, selectedBatch)}
  //         />
  //       )}
  //       {selectedBatch === "all" &&
  //         batches.map((item, index) => {
  //           if (item.value === "all") {
  //             return;
  //           }
  //           return (
  //             <Bar
  //               dataKey={formatBatchName(item.value, true)}
  //               stackId="a"
  //               name={item.label}
  //               fill={getBarColor(index)}
  //               key={item.label}
  //             />
  //           );
  //         })}
  //     </BarChart>
  //   </ResponsiveContainer>
  // );

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
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(index)} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
