import { Card, CardContent, CardDescription } from "@/components/ui/card";

import { TrendingDown, TrendingUp } from "lucide-react";

interface IProps {
  title: string;
  value: number;
  color: string;
  icon: any;
  fromYesterday?: string;
}

export default function SimpleCard({
  title,
  value,
  fromYesterday,
  icon,
  color,
}: IProps) {
  return (
    <Card className="h-36 w-full rounded-3xl">
      <CardContent className="flex h-full justify-between p-5">
        <div className="grid-row-3 grid h-full">
          <CardDescription>{title}</CardDescription>
          <p className="text-3xl font-bold">{value}</p>
          {fromYesterday && <UpFromYesterday fromYesterday={fromYesterday} />}
        </div>
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-3xl`}
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

const UpFromYesterday = ({ fromYesterday }: { fromYesterday: string }) => {
  return (
    <div className="flex items-center space-x-2">
      {fromYesterday.includes("acima") ? (
        <TrendingUp color="#00B69B" />
      ) : (
        <TrendingDown color="#b6003d" />
      )}
      <p className="text-sm">{fromYesterday}</p>
    </div>
  );
};
