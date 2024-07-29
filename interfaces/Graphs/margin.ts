export interface IMarginValues {
  date: string;
  margin: number;
  percent: number;
}

export interface IMargin {
  milkMargin: IMarginValues[];
  foodMargin: IMarginValues[];
}
