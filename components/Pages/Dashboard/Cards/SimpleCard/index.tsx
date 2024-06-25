import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface IProps {
  title: string;
  value: string;
  color: string;
  icon: any;
  footerValue?: string;
}

export default function SimpleCard({
  title,
  value,
  footerValue,
  icon,
  color,
}: IProps) {
  return (
    <Card className="h-40 w-72">
      <CardContent className="flex justify-between pt-6">
        <div>
          <CardDescription>{title}</CardDescription>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl`}
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
      </CardContent>
      {footerValue && (
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      )}
    </Card>
  );
}
