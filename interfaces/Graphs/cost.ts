export interface ICostValues {
  title: string;
  date: string;
  margin: number;
  percent: number;
}

export interface ICost {
  milkCost: ICostValues[];
  foodCost: ICostValues[];
}
