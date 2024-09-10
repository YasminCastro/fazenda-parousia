import { useFilterContext } from "@/providers/FilterContext";
import { getBarColorByName } from "@/utils/getGraphColors";

interface IProps {
  data: any[];
}

export default function LegendPieChart({ data }: IProps) {
  const { batches } = useFilterContext();

  return (
    <div className="w-1/12">
      {data.map((entry: any, index) => (
        <div key={index} className="mb-2 flex items-center">
          <span
            className="mr-2 inline-block h-4 w-4"
            style={{
              backgroundColor: getBarColorByName(batches, entry.key),
            }}
          ></span>
          <p style={{ margin: 0 }}>{entry.title}</p>
        </div>
      ))}
    </div>
  );
}
