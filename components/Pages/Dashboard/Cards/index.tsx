import DoubleCard from "./DoubleCard";
import SimpleCard from "./SimpleCard";
import {
  Milk,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Activity,
  BriefcaseMedical,
  IterationCw,
  List,
} from "lucide-react";

export default function Cards() {
  return (
    <div className="mt-7 grid grid-cols-4 gap-4">
      <SimpleCard
        title="Receita do leite (R$)"
        value="40,689"
        icon={<DollarSign color="#8280ff" size={36} />}
        color="#e4e4ff"
        fromYesterday="8.5% abaixo de ontem"
      />
      <DoubleCard
        title="Custo - Alimentação (R$)"
        value="10293"
        title2="Custo/kg de leite"
        value2="1,20 - 45%"
        icon={<ShoppingCart color="#fec53d" size={36} />}
        color="#fef2d6"
      />
      <DoubleCard
        title="Margem sob alimentação (R$)"
        value="89,000"
        title2="Margem/kg de leite"
        value2="1,20 - 30%"
        icon={<TrendingUp color="#4ad991" size={36} />}
        color="#d9f7e7"
      />
      <SimpleCard
        title="Retorno sobre investimento (%)"
        value="97"
        icon={<IterationCw color="#ff9871" size={36} />}
        color="#ffded2"
      />
      <SimpleCard
        title="Produção do leite (kg)"
        value="40,689"
        icon={<Milk color="#8280ff" size={36} />}
        color="#e4e4ff"
        fromYesterday="7% acima de ontem"
      />
      <SimpleCard
        title="Quantidade de animais"
        value="250"
        icon={<List color="#fec53d" size={36} />}
        color="#fef2d6"
      />
      <SimpleCard
        title="Eficiência alimentar"
        value="250"
        icon={<Activity color="#4ad991" size={36} />}
        color="#d9f7e7"
      />
      <DoubleCard
        title="Mastite"
        value="5 (2%)"
        title2="Carência"
        value2="1.2%"
        icon={<BriefcaseMedical color="#ff9871" size={36} />}
        color="#ffded2"
      />
    </div>
  );
}
