interface IFoodEfficiencyAll {
  date: string;
  fazenda: number;
  [lote: string]: number | string;
}

interface IFoodEfficiencyOneBatch {
  date: string;
  value: number;
}

export type IFoodEfficiency = IFoodEfficiencyAll | IFoodEfficiencyOneBatch;
