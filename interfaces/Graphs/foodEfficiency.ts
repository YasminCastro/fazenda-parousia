interface All {
  date: string;
  title: string;
  fazenda: number;
  [lote: string]: number | string;
}

interface OneBatch {
  date: string;
  title: string;
  value: number;
}

export type IFoodEfficiency = All | OneBatch;
