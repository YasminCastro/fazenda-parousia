"use client";

import axios from "axios";
import { addWeeks, addDays } from "date-fns";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DateRange } from "react-day-picker";

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
  selectedBatch: string;
  setSelectedBatch: React.Dispatch<React.SetStateAction<string>>;
  batches: BatchCombobox[];
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  selectedCard: number;
  setSelectedCard: React.Dispatch<React.SetStateAction<number>>;
}

const FilterContext = createContext({} as IValue);

export const FilterProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [selectedBatch, setSelectedBatch] = useState("all");
  const [batches, setBatches] = useState<BatchCombobox[]>([
    { value: "all", label: "Fazenda" },
  ]);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(addDays(new Date(), -1)),
    to: new Date(addWeeks(new Date(), -1)),
  });
  const [selectedCard, setSelectedCard] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/farm");
        setBatches(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const value = useMemo(
    () => ({
      batches,
      setSelectedBatch,
      selectedBatch,
      date,
      setDate,
      selectedCard,
      setSelectedCard,
    }),
    [
      batches,
      setSelectedBatch,
      selectedBatch,
      date,
      setDate,
      selectedCard,
      setSelectedCard,
    ],
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilterContext = (): IValue => useContext(FilterContext);
