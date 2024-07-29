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

interface IProps {
  data: IMarginValues[];
  title: string;
  yAxisLabel: string;
}

export default function ComposedGraph({ data, title, yAxisLabel }: IProps) {
  const { batches, selectedBatch } = useFilterContext();

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
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
          <Brush
            dataKey="date"
            height={30}
            stroke={getBarColorByName(batches, selectedBatch)}
          />
          <Bar
            dataKey="margin"
            name="Margem"
            barSize={20}
            fill={getBarColor(2)}
          />
          <Line
            type="monotone"
            dataKey="percent"
            name="Porcentagem"
            stroke={getBarColor(1)}
            fill={getBarColor(1)}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
