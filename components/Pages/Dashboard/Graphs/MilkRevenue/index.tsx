import { formatXAxis } from "@/utils/formatXAxis";
import axios from "axios";
import { format } from "date-fns";
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

export default function MilkRevenueGraph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/graph/milk-revenue`);
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
        <Bar dataKey="loteA" stackId="a" name="Lote A" fill="#8280ff" />
        <Bar dataKey="loteB" stackId="a" name="Lote B" fill="#fec53d" />
        <Bar dataKey="loteC" stackId="a" name="Lote C" fill="#5cdd9c" />
        <Bar dataKey="loteD" stackId="a" name="Lote D" fill="#ff9871" />
        <Bar dataKey="loteN" stackId="a" name="Lote N" fill="#ff80ca " />
      </BarChart>
    </ResponsiveContainer>
  );
}
