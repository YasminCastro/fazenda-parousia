import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DateRange } from "react-day-picker";

interface BatchCombobox {
  value: string;
  label: string;
}

interface IValue {
  selectedBatch: string;
  setSelectedBatch: React.Dispatch<React.SetStateAction<string>>;
  batch: BatchCombobox[];
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

const FilterContext = createContext({} as IValue);

export const FilterProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [selectedBatch, setSelectedBatch] = useState("Fazenda");
  const [batch, setBatch] = useState<BatchCombobox[]>([
    { value: "Fazenda", label: "Fazenda" },
  ]);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/farms");
        setBatch(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const value = useMemo(
    () => ({
      batch,
      setSelectedBatch,
      selectedBatch,
      date,
      setDate,
    }),
    [batch, setSelectedBatch, selectedBatch, date, setDate],
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilterContext = (): IValue => useContext(FilterContext);
