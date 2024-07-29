interface All {
  date: string;
  fazenda: number;
  [lote: string]: number | string;
}

interface OneBatch {
  date: string;
  value: number;
}

export type IMilkProduction = OneBatch | All;
