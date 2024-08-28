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
    id: 1,
    key: "Receita do Leite",
  },
  {
    id: 2,
    key: "Cow Feed Cost",
    secondaryKey: "(%) Feed Cost/Lt",
  },
  {
    id: 3,
    key: "IoFC / vaca",
    secondaryKey: "iofc_litro_%",
  },
  {
    id: 4,
    key: "custo",
  },
  {
    id: 5,
    key: "Media_Producao",
  },
  {
    id: 6,
    key: "Animais",
  },
  {
    id: 7,
    key: "Feed Efficiency",
  },
  {
    id: 8,
    key: "vaca_mastite",
    secondaryKey: "vaca_carencia_mastite",
  },
];

export default kpiMapping;
