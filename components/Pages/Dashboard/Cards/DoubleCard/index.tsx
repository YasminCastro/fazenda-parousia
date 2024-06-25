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
  title2?: string;
  value2?: string;
  footerValue?: string;
}

export default function DoubleCard({
  title,
  value,
  footerValue,
  title2,
  value2,
  icon,
  color,
}: IProps) {
  return (
    <Card className="h-40 w-72">
      <CardContent className="flex justify-between pt-6">
        <div>
          {/* FIRST TITLE*/}
          <div>
            <CardDescription>{title}</CardDescription>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          {/* SECOND TITLE*/}
          {title2 && (
            <div>
              <CardDescription>{title2}</CardDescription>
              <p>{value2}</p>
            </div>
          )}
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
