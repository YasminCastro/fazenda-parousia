import {
  Card as ShadcnCard,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import styles from "../styles.module.css";
import { IKpiMapping } from "@/constants/kpiMapping";

interface IProps {
  loading: boolean;
  data: IKpiMapping;
  icon: any;
  outsideColor: string;
}

export default function Card({ loading, data, icon, outsideColor }: IProps) {
  if (loading || !data) {
    return (
      <ShadcnCard className={styles.cardContainer}>
        <CardContent className={styles.cardContent}>
          <div className="grid-row-3 grid h-full">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-8 w-36" />
          </div>
          <div
            className={styles.cardIcon}
            style={{ backgroundColor: outsideColor }}
          >
            {icon}
          </div>
        </CardContent>
      </ShadcnCard>
    );
  }

  const {
    title,
    value,
    secondaryKey,
    secundaryTitle,
    secundaryValue,
    tertiaryValue,
  } = data;

  return (
    <ShadcnCard className={styles.cardContainer}>
      <CardContent className={styles.cardContent}>
        <div className="grid-row-2 grid h-full">
          <div className="grid-row-2 grid h-full">
            <CardDescription>{title}</CardDescription>
            <p className={`${secondaryKey ? "text-xl" : "text-3xl"} font-bold`}>
              {tertiaryValue ? `${value} (${tertiaryValue}%)` : value}
            </p>
          </div>
          {secondaryKey && (
            <div className="grid-row-2 grid h-full">
              <CardDescription>{secundaryTitle}</CardDescription>
              <p className="text-xl font-bold">{secundaryValue}</p>
            </div>
          )}
        </div>

        <div
          className={styles.cardIcon}
          style={{ backgroundColor: outsideColor }}
        >
          {icon}
        </div>
      </CardContent>
    </ShadcnCard>
  );
}
