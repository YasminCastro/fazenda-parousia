import { format } from "date-fns";

const CustomTooltip = ({ active, payload, label, prefix }: any) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const total = calculateTotal(payload);

  return (
    <div className="bg-white p-2">
      <p>{format(new Date(label), "dd/MM/yyyy")}</p>
      {payload.map((item: any) => (
        <p key={item.name} style={{ color: item.color }}>
          {formatItemMessage(item.name, item.value, prefix)}
        </p>
      ))}
      {payload.length > 1 && <p>{formatTotalMessage(total, prefix)}</p>}
    </div>
  );
};

const calculateTotal = (payload: any): number => {
  return payload.reduce((sum: any, item: any) => sum + item.value, 0);
};

const formatTotalMessage = (total: number, prefix?: string): string => {
  return prefix
    ? `Total: ${prefix} ${total.toFixed(1)}`
    : `Total: ${total.toFixed(1)}`;
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

export default CustomTooltip;
