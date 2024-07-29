import { format } from "date-fns";

const ComposedChartTooltip = ({ active, payload, label, prefix }: any) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  let total = 0;
  return (
    <div className="bg-white p-2">
      <p>{format(new Date(label), "dd/MM/yyyy")}</p>
      {payload.map((item: any) => (
        <p key={item.name} style={{ color: item.color }}>
          {formatItemMessage(item.name, item.value, prefix)}
        </p>
      ))}
    </div>
  );
};

const formatItemMessage = (
  name: string,
  value: number,
  prefix?: string,
): string => {
  return prefix
    ? `${name}: ${prefix} ${value.toFixed(1)}`
    : `${name}: ${value.toFixed(1)}`;
};

export default ComposedChartTooltip;
