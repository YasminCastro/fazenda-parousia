import { IMilkRevenue } from "@/interfaces/Graphs/milkRevenue";
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
import { ICost } from "@/interfaces/Graphs/cost";
import { IMargin } from "@/interfaces/Graphs/margin";
import { IInvestmentReturn } from "@/interfaces/Graphs/investmentReturn";
import DefaultDataParse from "@/service/DefaultDataParse";
import MarginDataParse from "@/service/MarginDataParse";
import CostDataParse from "@/service/CostDataParse";
import { IMilkProduction } from "@/interfaces/Graphs/milkProduction";
import { IFoodEfficiency } from "@/interfaces/Graphs/foodEfficiency";
import NumberOfAnimalsDataParse from "@/service/NumberOfAnimalsDataParse";
import { INumberAnimals } from "@/interfaces/Graphs/animalsCount";
import MastiteDataParse from "@/service/MastiteDataParse";
import { IMastite } from "@/interfaces/Graphs/mastite";

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
  investmentReturn: IInvestmentReturn[];
  milkProduction: IMilkProduction[];
  foodEfficiency: IFoodEfficiency[];
  numberOfAnimals: INumberAnimals[];
  mastite: IMastite[];
}

const DataContext = createContext({} as IValue);

export const DataProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [rawData, setRawData] = useState([]);
  const { selectedCard, date, selectedBatch } = useFilterContext();

  const [milkRevenue, setMilkRevenue] = useState<IMilkRevenue[]>([]);
  const [milkProduction, setMilkProduction] = useState<IMilkProduction[]>([]);
  const [foodEfficiency, setFoodEfficiency] = useState<IFoodEfficiency[]>([]);
  const [numberOfAnimals, setNumberOfAnimals] = useState<INumberAnimals[]>([]);
  const [mastite, setMastite] = useState<IMastite[]>([]);
  const [investmentReturn, setInvestmentReturn] = useState<IInvestmentReturn[]>(
    [],
  );

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
        const responseMilkRevenue = DefaultDataParse(
          rawData,
          selectedBatch,
          "Receita do Leite",
        );
        setMilkRevenue(responseMilkRevenue);
        break;

      case "investmentReturn":
        const responseInvestment = DefaultDataParse(
          rawData,
          selectedBatch,
          "custo",
        );
        setInvestmentReturn(responseInvestment);
        break;

      case "milkProduction":
        const responseMilkProduction = DefaultDataParse(
          rawData,
          selectedBatch,
          "Media_Producao",
        );
        setMilkProduction(responseMilkProduction);
        break;

      case "foodEfficiency":
        const responseFoodEfficiency = DefaultDataParse(
          rawData,
          selectedBatch,
          "Feed Efficiency",
        );
        setFoodEfficiency(responseFoodEfficiency);
        break;

      case "cost":
        const responseCost = CostDataParse(rawData, selectedBatch);
        setCost(responseCost);
        break;

      case "margin":
        const responseMargin = MarginDataParse(rawData, selectedBatch);
        setMargin(responseMargin);
        break;

      case "numberOfAnimals":
        const responseNumberOfAnimals = NumberOfAnimalsDataParse(
          rawData[rawData.length - 1],
          selectedBatch,
        );
        setNumberOfAnimals(responseNumberOfAnimals);
        break;

      case "mastite":
        const responseMastite = MastiteDataParse(rawData, selectedBatch);
        setMastite(responseMastite);
        break;
    }
  }, [selectedCard, rawData, selectedBatch]);

  const value = useMemo(
    () => ({
      milkRevenue,
      cost,
      margin,
      investmentReturn,
      milkProduction,
      foodEfficiency,
      numberOfAnimals,
      mastite,
    }),
    [
      milkRevenue,
      cost,
      margin,
      investmentReturn,
      milkProduction,
      foodEfficiency,
      numberOfAnimals,
      mastite,
    ],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = (): IValue => useContext(DataContext);
