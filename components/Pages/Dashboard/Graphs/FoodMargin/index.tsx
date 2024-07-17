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
import styles from "./styles.module.css";

export default function FoodMarginGraph() {
  const [foodMarginData, setFoodMarginData] = useState([]);
  const [milkMarginData, setMilkMarginData] = useState([]);
  const { batches, selectedBatch } = useFilterContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/graph/food-cost?batch=${selectedBatch}`,
        );
        setFoodMarginData(response.data.foodCost);
        setMilkMarginData(response.data.milkCost);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedBatch]);

  return (
    <div className="grid h-full grid-cols-2">
      <div className={`${styles.graphContainer}`}>
        <h2 className={`${styles.title}`}>
          Margem sobre alimentação (R$/vaca/dia)
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={foodMarginData}
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
            <Brush dataKey="date_record" height={30} stroke="#3b82f6" />
            {selectedBatch !== "all" && (
              <Bar
                dataKey="value"
                stackId="a"
                name={formatBatchName(selectedBatch)}
                fill={getBarColorByName(batches, selectedBatch)}
              />
            )}
            {selectedBatch === "all" &&
              batches.map((item, index) => {
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
      </div>

      <div className={`${styles.graphContainer}`}>
        <h2 className={`${styles.title}`}>Margem R$/kg de leite</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={milkMarginData}
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
            <Brush dataKey="date_record" height={30} stroke="#3b82f6" />
            {selectedBatch !== "all" && (
              <Bar
                dataKey="value"
                stackId="a"
                name={formatBatchName(selectedBatch)}
                fill={getBarColorByName(batches, selectedBatch)}
              />
            )}
            {selectedBatch === "all" &&
              batches.map((item, index) => {
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
      </div>
    </div>
  );
}
