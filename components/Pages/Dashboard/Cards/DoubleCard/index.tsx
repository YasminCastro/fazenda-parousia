import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import styles from "../styles.module.css";

interface IProps {
  title: string;
  title2: string;
  value: number;
  value2: number;
  color: string;
  icon: any;
  loading: boolean;
}

export default function DoubleCard({
  title,
  value,
  icon,
  color,
  title2,
  value2,
  loading,
}: IProps) {
  if (loading) {
    return (
      <Card className={styles.cardContainer}>
        <CardContent className={styles.cardContent}>
          <div className="grid-row-2 grid h-full">
            <div className="grid-row-2 grid h-full">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-36" />
            </div>
            <div className="grid-row-2 grid h-full">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
          <div className={styles.cardIcon} style={{ backgroundColor: color }}>
            {icon}
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className={styles.cardContainer}>
      <CardContent className={styles.cardContent}>
        <div className="grid-row-2 grid h-full">
          <div className="grid-row-2 grid h-full">
            <CardDescription>{title}</CardDescription>
            <p className="text-xl font-bold">{value}</p>
          </div>
          <div className="grid-row-2 grid h-full">
            <CardDescription>{title2}</CardDescription>
            <p className="text-xl font-bold">{value2}</p>
          </div>
        </div>
        <div className={styles.cardIcon} style={{ backgroundColor: color }}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
