const PieChartTooltip = ({ active, payload }: any) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-2">
      {payload.map((item: any) => (
        <p key={item.name} style={{ color: item.payload.fill }}>
          {item.payload.title}: {item.value}
        </p>
      ))}
    </div>
  );
};

export default PieChartTooltip;
