"use client";

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
import { INumberAnimals } from "@/interfaces/Graphs/animalsCount";
import MastiteDataParse from "@/service/MastiteDataParse";
import { IMastite } from "@/interfaces/Graphs/mastite";
import MilkPrice from "@/service/GetMilkPrice";
import kpiMapping from "@/constants/kpiMapping";
import BarChartData from "@/service/BarChartData";
import PieChartData from "@/service/PieChartData";

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
  milkPrice: number;
  chartData: any;
}

const DataContext = createContext({} as IValue);

export const DataProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [rawData, setRawData] = useState([]);
  const { selectedCardIndex, date, selectedBatch } = useFilterContext();

  const [milkPrice, setMilkPrice] = useState<number>(0);
  const [milkRevenue, setMilkRevenue] = useState<IMilkRevenue[]>([]);
  const [milkProduction, setMilkProduction] = useState<IMilkProduction[]>([]);
  const [foodEfficiency, setFoodEfficiency] = useState<IFoodEfficiency[]>([]);
  const [numberOfAnimals, setNumberOfAnimals] = useState<INumberAnimals[]>([]);
  const [mastite, setMastite] = useState<IMastite[]>([]);
  const [chartData, setChartData] = useState<any>();
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
        const startDate =
          date && date.from ? format(date?.from, "yyyy-MM-dd") : "";
        const params = new URLSearchParams({
          startDate,
          endDate: date && date.to ? format(date?.to, "yyyy-MM-dd") : "",
        });

        const response = await axios.get(`/api/farm-data?${params.toString()}`);

        const milkPriceFound = MilkPrice(
          response.data,
          selectedBatch,
          startDate,
        );
        setMilkPrice(milkPriceFound);

        setRawData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [date]);

  useEffect(() => {
    const selectedKpi = kpiMapping[selectedCardIndex];
    if (selectedKpi.secondaryKey) {
      if (selectedKpi.key === "vaca_mastite") {
        const dataFound = MastiteDataParse(
          rawData,
          selectedBatch,
          selectedCardIndex,
        );
        console.log(dataFound);
        setChartData(dataFound);
      }
    } else {
      if (selectedKpi.chartType === "bar") {
        const dataFound = BarChartData(
          rawData,
          selectedBatch,
          selectedCardIndex,
        );

        setChartData(dataFound);
      } else if (selectedKpi.chartType === "pie") {
        const dataFound = PieChartData(
          rawData[rawData.length - 1],
          selectedBatch,
          selectedCardIndex,
        );

        setChartData(dataFound);
      }
    }

    // switch (selectedCardIndex) {
    //   case 0:
    //     const dataFound = BarChartData(
    //       rawData,
    //       selectedBatch,
    //       selectedCardIndex,
    //     );
    //     setChartData(dataFound);
    //     break;

    //   case 1:
    //     const responseCost = CostDataParse(rawData, selectedBatch);
    //     setCost(responseCost);
    //     break;

    //   case 2:
    //     const responseMargin = MarginDataParse(rawData, selectedBatch);
    //     setMargin(responseMargin);
    //     break;

    //   case 3:
    //     const responseInvestment = DefaultDataParse(
    //       rawData,
    //       selectedBatch,
    //       kpiMapping[3].key,
    //     );
    //     setInvestmentReturn(responseInvestment);
    //     break;

    //   case 4:
    //     const responseMilkProduction = DefaultDataParse(
    //       rawData,
    //       selectedBatch,
    //       kpiMapping[4].key,
    //     );
    //     setMilkProduction(responseMilkProduction);
    //     break;

    //   case 5:
    //     const responseNumberOfAnimals = NumberOfAnimalsDataParse(
    //       rawData[rawData.length - 1],
    //       selectedBatch,
    //     );
    //     setNumberOfAnimals(responseNumberOfAnimals);
    //     break;

    //   case 6:
    //     const responseFoodEfficiency = DefaultDataParse(
    //       rawData,
    //       selectedBatch,
    //       "Feed Efficiency",
    //     );
    //     setFoodEfficiency(responseFoodEfficiency);
    //     break;

    //   case 7:
    //     const responseMastite = MastiteDataParse(rawData, selectedBatch);
    //     setMastite(responseMastite);
    //     break;
    // }
  }, [selectedCardIndex, rawData, selectedBatch]);

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
      milkPrice,
      chartData,
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
      milkPrice,
      chartData,
    ],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = (): IValue => useContext(DataContext);
