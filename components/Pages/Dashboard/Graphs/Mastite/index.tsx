import { useFilterContext } from "@/providers/FilterContext";
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

const data = [
  { date: "1", uv: 300, pv: 456 },
  { date: "2", uv: 145, pv: 230 },
  { date: "3", uv: 100, pv: 345 },
  { date: "4", uv: 8, pv: 450 },
  { date: "5", uv: 100, pv: 321 },
  { date: "6", uv: 9, pv: 235 },
  { date: "7", uv: 53, pv: 267 },
  { date: "8", uv: 252, pv: 378 },
  { date: "9", uv: 79, pv: 210 },
];

export default function MastiteGraph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/mastite`);
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
        <XAxis dataKey="date_record" />
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
