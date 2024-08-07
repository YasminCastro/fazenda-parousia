import { IMilkRevenue } from "@/interfaces/Graphs/milkRevenue";
import MilkRevenueService from "@/service/milkRevenue";
import axios from "axios";
import { format } from "date-fns";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFilterContext } from "./FilterContext";
import CostService from "@/service/cost";
import MarginService from "@/service/margin";
import { ICost } from "@/interfaces/Graphs/cost";
import { IMargin } from "@/interfaces/Graphs/margin";

export interface BatchCombobox {
  value: string;
  label: string;
}

export type CardType =
  | "milkRevenue"
  | "cost"
  | "margin"
  | "investmentReturn"
  | "milkProduction"
  | "numberOfAnimals"
  | "foodEfficiency"
  | "mastite";

interface IValue {
  milkRevenue: IMilkRevenue[];
  cost: ICost;
  margin: IMargin;
}

const DataContext = createContext({} as IValue);

export const DataProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [rawData, setRawData] = useState([]);
  const { selectedCard, date, selectedBatch } = useFilterContext();

  const [milkRevenue, setMilkRevenue] = useState<IMilkRevenue[]>([]);
  const [cost, setCost] = useState<ICost>({
    foodCost: [],
    milkCost: [],
  });
  const [margin, setMargin] = useState<IMargin>({
    foodMargin: [],
    milkMargin: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({
          startDate: date && date.from ? format(date?.from, "yyyy-MM-dd") : "",
          endDate: date && date.to ? format(date?.to, "yyyy-MM-dd") : "",
        });

        const response = await axios.get(`/api/farm-data?${params.toString()}`);

        setRawData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [date]);

  useEffect(() => {
    switch (selectedCard) {
      case "milkRevenue":
        const responseMilkRevenue = MilkRevenueService(rawData, selectedBatch);
        setMilkRevenue(responseMilkRevenue);
        break;

      case "cost":
        const responseCost = CostService(rawData, selectedBatch);
        setCost(responseCost);
        break;

      case "margin":
        const responseMargin = MarginService(rawData, selectedBatch);
        setMargin(responseMargin);
        break;
    }
  }, [selectedCard, rawData, selectedBatch]);

  const value = useMemo(
    () => ({
      milkRevenue,
      cost,
      margin,
    }),
    [milkRevenue, cost, margin],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = (): IValue => useContext(DataContext);
