export interface IKpiMapping {
  id: number;
  key: string;
  secondaryKey?: string;
  value?: number;
  title?: string;
  secundaryValue?: number;
  secundaryTitle?: string;
}

const kpiMapping: IKpiMapping[] = [
  {
    id: 0,
    key: "Receita do Leite",
  },
  {
    id: 1,
    key: "Cow Feed Cost",
    secondaryKey: "(%) Feed Cost/Lt",
  },
  {
    id: 2,
    key: "IoFC / vaca",
    secondaryKey: "iofc_litro_%",
  },
  {
    id: 3,
    key: "custo",
  },
  {
    id: 4,
    key: "Media_Producao",
  },
  {
    id: 5,
    key: "Animais",
  },
  {
    id: 6,
    key: "Feed Efficiency",
  },
  {
    id: 7,
    key: "vaca_mastite",
    secondaryKey: "vaca_carencia_mastite",
  },
];

export default kpiMapping;
