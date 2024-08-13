interface All {
  date: string;
  fazenda: number;
  title: string;
  [lote: string]: number | string;
}

interface OneBatch {
  date: string;
  title: string;
  value: number;
}

export type IMilkProduction = OneBatch | All;
