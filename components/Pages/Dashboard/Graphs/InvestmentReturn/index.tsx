import axios from "axios";
import { useEffect, useState } from "react";
import { useFilterContext } from "@/providers/FilterContext";
import { Card } from "@/components/ui/card";
import stylesGraph from "../styles.module.css";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import BarGraph from "./BarGraph";
import { IInvestmentReturn } from "@/interfaces/Graphs/investmentReturn";
import { format } from "date-fns";

export default function InvestmentReturnGraph() {
  const [data, setData] = useState<IInvestmentReturn[]>([]);
  const [isStackedChart, setIsStackedChart] = useState(false);
  const { selectedBatch, date } = useFilterContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({
          batch: selectedBatch,
          startDate: date && date.from ? format(date?.from, "yyyy-MM-dd") : "",
          endDate: date && date.to ? format(date?.to, "yyyy-MM-dd") : "",
        });
        const response = await axios.get(
          `/api/graph/investment-return?${params.toString()}`,
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedBatch, date]);

  const handleGraphChange = () => {
    setIsStackedChart(!isStackedChart);
  };

  return (
    <Card className={`${stylesGraph.cardWrapper}`}>
      <div className={`${stylesGraph.graphHeader}`}>
        <h2 className={`${stylesGraph.graphTitle}`}>
          Retorno sobre investimento (%)
        </h2>
        <Button
          className={`${stylesGraph.changeGraphButton}`}
          onClick={handleGraphChange}
        >
          <RefreshCcw />
        </Button>
      </div>
      <div className={`${stylesGraph.graphWrapper}`}>
        <BarGraph data={data} isStackedChart={isStackedChart} />
      </div>
    </Card>
  );
}
