interface All {
  title: string;
  date: string;
  fazenda: number;
  [lote: string]: number | string;
}

interface OneBatch {
  title: string;
  date: string;
  value: number;
}

export type IInvestmentReturn = All | OneBatch;
