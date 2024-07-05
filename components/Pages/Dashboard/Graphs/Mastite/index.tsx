import { useFilterContext } from "@/providers/FilterContext";
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

export default function MastiteGraph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/graph/mastite`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
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
        <Bar dataKey="vaca_mastite" stackId="a" name="Mastite" fill="#8884d8" />
        <Bar
          dataKey="vaca_carencia_mastite"
          stackId="a"
          name="Carência Mastite"
          fill="#82ca9d"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
