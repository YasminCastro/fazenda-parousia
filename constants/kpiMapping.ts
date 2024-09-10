export interface IKpiMapping {
  id: number;
  key: string;
  secondaryKey?: string;
  tertiaryKey?: string;
  value?: number;
  title?: string;
  secundaryValue?: number | string;
  tertiaryValue?: number | string;
  secundaryTitle?: string;
  tertiaryTitle?: string;
  chartType: string;
  secundaryChartType?: string;
  labelY: string;
  secundaryLabelY?: string;
}

const kpiMapping: IKpiMapping[] = [
  {
    id: 0,
    key: "Receita do Leite",
    chartType: "bar",
    labelY: "Valor em reais (R$)",
  },
  {
    id: 1,
    key: "Cow Feed Cost",
    secondaryKey: "Feed Cost/Lt",
    tertiaryKey: "(%) Feed Cost/Lt",
    chartType: "composed",
    secundaryChartType: "bar",
    labelY: "%",
    secundaryLabelY: "R$",
  },
  {
    id: 2,
    key: "IoFC / vaca",
    secondaryKey: "IoFC / litro",
    tertiaryKey: "iofc_litro_%",
    chartType: "composed",
    secundaryChartType: "bar",
    labelY: "%",
    secundaryLabelY: "R$",
  },
  {
    id: 3,
    key: "roi",
    chartType: "bar",
    labelY: "Retorno em %",
  },
  {
    id: 4,
    key: "Media_Producao",
    chartType: "bar",
    labelY: "Produção Total (kg)",
  },
  {
    id: 5,
    key: "Animais",
    chartType: "pieAndLine",
    labelY: "",
  },
  {
    id: 6,
    key: "Feed Efficiency",
    chartType: "bar",
    labelY: "Eficiência alimentar",
  },
  {
    id: 7,
    key: "vaca_mastite",
    secondaryKey: "vaca_carencia_mastite",
    chartType: "bar",
    labelY: "",
  },
];

export const kpiAvaregeProduction = "Media_Producao";

export default kpiMapping;
