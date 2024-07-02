import { Card, CardContent, CardDescription } from "@/components/ui/card";

interface IProps {
  title: string;
  title2: string;
  value: number;
  value2: number;
  color: string;
  icon: any;
}

export default function DoubleCard({
  title,
  value,
  icon,
  color,
  title2,
  value2,
}: IProps) {
  return (
    <Card className="h-40 w-full rounded-3xl">
      <CardContent className="flex h-full justify-between pt-6">
        <div className="grid-row-2 grid h-full">
          <div className="grid-row-2 grid h-full">
            <CardDescription>{title}</CardDescription>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className="grid-row-2 grid h-full">
            <CardDescription>{title2}</CardDescription>
            <p className="text-2xl font-bold">{value2}</p>
          </div>
        </div>
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl`}
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
