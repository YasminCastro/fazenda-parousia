import React, { useState } from "react";
import LineChartTooltip from "@/components/Global/CustomTooltip/LineChartTooltip";
import { useFilterContext } from "@/providers/FilterContext";
import formatBatchName from "@/utils/formatBatchName";
import { formatTickDate } from "@/utils/formatXAxis";
import { getBarColor, getBarColorByName } from "@/utils/getGraphColors";
import {
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  LineChart,
  Line,
} from "recharts";
import { IFoodEfficiency } from "@/interfaces/Graphs/foodEfficiency";

interface IProps {
  data: IFoodEfficiency[];
}

export default function LineGraph({ data }: IProps) {
  const { batches, selectedBatch } = useFilterContext();
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [fixedKey, setFixedKey] = useState<string | null>(null);

  const handleLegendMouseEnter = (dataKey: any) => {
    if (!fixedKey) {
      setHoveredKey(dataKey);
    }
  };

  const handleLegendMouseLeave = () => {
    if (!fixedKey) {
      setHoveredKey(null);
    }
  };

  const handleLegendClick = (dataKey: any) => {
    setFixedKey((prev) => (prev === dataKey ? null : dataKey));
    setHoveredKey(null);
  };

  const getLineOpacity = (dataKey: string) => {
    if (fixedKey) {
      return fixedKey === dataKey ? 1 : 0.2;
    }
    return hoveredKey && dataKey !== hoveredKey ? 0.2 : 1;
  };

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
        <XAxis dataKey="date" tickFormatter={formatTickDate} />
        <YAxis domain={["auto", "auto"]}>
          <Label
            value="eficiência alimentar"
            position="insideBottomLeft"
            angle={-90}
          />
        </YAxis>
        <Tooltip content={<LineChartTooltip />} />
        <Legend
          verticalAlign="top"
          wrapperStyle={{ lineHeight: "40px" }}
          onMouseEnter={(e) => handleLegendMouseEnter(e.dataKey)}
          onMouseLeave={handleLegendMouseLeave}
          onClick={(e) => handleLegendClick(e.dataKey)}
        />
        <Brush
          dataKey="date"
          height={30}
          stroke={getBarColorByName(batches, selectedBatch)}
          tickFormatter={formatTickDate}
        />
        {selectedBatch !== "all" && (
          <Line
            type="monotone"
            dataKey="value"
            name={formatBatchName(selectedBatch, true)}
            stroke={getBarColorByName(batches, selectedBatch)}
            activeDot={{ r: 8 }}
            opacity={getLineOpacity("value")}
          />
        )}

        {selectedBatch === "all" &&
          batches.map((item, index) => {
            let dataKey = formatBatchName(item.value, false, true);

            if (item.value === "all") {
              dataKey = "fazenda";
            }

            return (
              <Line
                type="monotone"
                dataKey={dataKey}
                name={item.label}
                fill={getBarColor(index)}
                key={item.label}
                activeDot={{ r: 8 }}
                stroke={getBarColor(index)}
                opacity={getLineOpacity(dataKey)}
              />
            );
          })}
      </LineChart>
    </ResponsiveContainer>
  );
}
