import InfoCard from "./Card";
import { Milk } from "lucide-react";

export default function Cards() {
  return (
    <div className="mt-7">
      <InfoCard
        title="Receita do leite (R$)"
        value="40,689"
        icon={<Milk color="#8280ff" size={36} />}
        color="#e4e4ff"
      />
    </div>
  );
}
