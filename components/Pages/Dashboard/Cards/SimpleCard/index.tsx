import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

interface IProps {
  title: string;
  value: string;
  color: string;
  icon: any;
  upFromYesterday?: number;
}

export default function SimpleCard({
  title,
  value,
  upFromYesterday,
  icon,
  color,
}: IProps) {
  return (
    <Card className="h-36 w-72">
      <CardContent className="flex h-full items-center justify-between pt-6">
        <div className="flex h-full flex-col justify-evenly">
          <CardDescription>{title}</CardDescription>
          <p className="text-3xl font-bold">{value}</p>
          {upFromYesterday && <p>Card Footer</p>}
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
