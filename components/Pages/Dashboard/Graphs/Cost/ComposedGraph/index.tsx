import { useFilterContext } from "@/providers/FilterContext";
import { formatXAxis } from "@/utils/formatXAxis";
import { getBarColor, getBarColorByName } from "@/utils/getGraphColors";
import {
  Bar,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  ComposedChart,
  Line,
} from "recharts";
import styles from "./styles.module.css";
import { IMarginValues } from "@/interfaces/Graphs/margin";
import ComposedChartTooltip from "@/components/Global/CustomTooltip/ComposedChartTooltip";
import { useState } from "react";

interface IProps {
  data: IMarginValues[];
  title: string;
  yAxisLabel: string;
}

export default function ComposedGraph({ data, title, yAxisLabel }: IProps) {
  const { batches, selectedBatch } = useFilterContext();

  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [fixedKey, setFixedKey] = useState<string | null>(null);

  const handleLegendMouseEnter = (dataKey: string) => {
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

  const getLineOpacity = (dataKey: any) => {
    if (fixedKey) {
      return fixedKey === dataKey ? 1 : 0.2;
    }
    return hoveredKey && dataKey !== hoveredKey ? 0.2 : 1;
  };

  return (
    <div className={`${styles.graphContainer}`}>
      <h2 className={`${styles.title}`}>{title}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="date" scale="band" tickFormatter={formatXAxis} />
          <YAxis>
            <Label value={yAxisLabel} position="insideLeft" angle={-90} />
          </YAxis>
          <Tooltip content={<ComposedChartTooltip />} />
          <Legend
            verticalAlign="top"
            wrapperStyle={{ lineHeight: "40px" }}
            onMouseEnter={(e: any) => handleLegendMouseEnter(e.dataKey)}
            onMouseLeave={handleLegendMouseLeave}
            onClick={(e) => handleLegendClick(e.dataKey)}
          />
          <Brush
            dataKey="date"
            height={30}
            stroke={getBarColorByName(batches, selectedBatch)}
          />
          <Bar
            dataKey="margin"
            name="Margem"
            barSize={20}
            fill={getBarColor(5)}
            opacity={getLineOpacity("margin")}
          />
          <Line
            type="monotone"
            dataKey="percent"
            name="Porcentagem"
            stroke={getBarColor(3)}
            fill={getBarColor(3)}
            opacity={getLineOpacity("percent")}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
