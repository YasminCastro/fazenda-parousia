"use client";

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
import MastiteDataParse from "@/service/MastiteDataParse";
import MilkPrice from "@/service/GetMilkPrice";
import kpiMapping from "@/constants/kpiMapping";
import BarChartData from "@/service/BarChartData";
import PieChartData from "@/service/PieChartData";
import ComposedDataParse from "@/service/ComposedDataParse";

export interface BatchCombobox {
  value: string;
  label: string;
}

interface IValue {
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
  const [chartData, setChartData] = useState<any>();

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
    let dataFound;

    if (selectedKpi.secondaryKey) {
      switch (selectedKpi.key) {
        case "vaca_mastite":
          dataFound = MastiteDataParse(
            rawData,
            selectedBatch,
            selectedCardIndex,
          );
          break;

        case "Cow Feed Cost":
          dataFound = ComposedDataParse(
            rawData,
            selectedBatch,
            selectedCardIndex,
          );
          break;

        case "IoFC / vaca":
          dataFound = ComposedDataParse(
            rawData,
            selectedBatch,
            selectedCardIndex,
          );
          break;
      }
    } else {
      switch (selectedKpi.chartType) {
        case "bar":
          dataFound = BarChartData(rawData, selectedBatch, selectedCardIndex);
          break;
        case "pie":
          dataFound = PieChartData(
            rawData[rawData.length - 1],
            selectedBatch,
            selectedCardIndex,
          );
          break;
      }
    }

    if (dataFound) {
      setChartData(dataFound);
    }
  }, [selectedCardIndex, rawData, selectedBatch]);

  const value = useMemo(
    () => ({
      milkPrice,
      chartData,
    }),
    [milkPrice, chartData],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = (): IValue => useContext(DataContext);
