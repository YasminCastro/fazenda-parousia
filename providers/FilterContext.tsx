"use client";

import batchesDefault, { BatchCombobox } from "@/constants/batches";
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

interface IValue {
  selectedBatch: string;
  setSelectedBatch: React.Dispatch<React.SetStateAction<string>>;
  batches: BatchCombobox[];
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  selectedCardIndex: number;
  setselectedCardIndex: React.Dispatch<React.SetStateAction<number>>;
}

const FilterContext = createContext({} as IValue);

export const FilterProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [selectedBatch, setSelectedBatch] = useState("all");
  const [batches] = useState<BatchCombobox[]>(batchesDefault);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(addDays(new Date(), -1)),
  });
  const [selectedCardIndex, setselectedCardIndex] = useState<number>(0);

  const value = useMemo(
    () => ({
      batches,
      setSelectedBatch,
      selectedBatch,
      date,
      setDate,
      selectedCardIndex,
      setselectedCardIndex,
    }),
    [
      batches,
      setSelectedBatch,
      selectedBatch,
      date,
      setDate,
      selectedCardIndex,
      setselectedCardIndex,
    ],
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilterContext = (): IValue => useContext(FilterContext);
