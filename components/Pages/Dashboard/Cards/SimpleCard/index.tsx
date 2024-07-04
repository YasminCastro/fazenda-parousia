import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { TrendingDown, TrendingUp } from "lucide-react";

import styles from "../styles.module.css";

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
  if (!title || !value) {
    return (
      <Card className={styles.cardContainer}>
        <CardContent className={styles.cardContent}>
          <div className="grid-row-3 grid h-full">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-8 w-36" />
            {fromYesterday && <UpFromYesterday fromYesterday={fromYesterday} />}
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
        <div className="grid-row-3 grid h-full">
          <CardDescription>{title}</CardDescription>
          <p className="text-3xl font-bold">{value}</p>
          {fromYesterday && <UpFromYesterday fromYesterday={fromYesterday} />}
        </div>
        <div className={styles.cardIcon} style={{ backgroundColor: color }}>
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
