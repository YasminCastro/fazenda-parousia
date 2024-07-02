import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface BatchCombobox {
  value: string;
  label: string;
}

interface IValue {
  selectedBatch: string;
  setSelectedBatch: React.Dispatch<React.SetStateAction<string>>;
  batch: BatchCombobox[];
}

const FilterContext = createContext({} as IValue);

export const FilterProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [selectedBatch, setSelectedBatch] = useState("Fazenda");
  const [batch, setBatch] = useState([{ value: "Fazenda", label: "Fazenda" }]);

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
    }),
    [batch, setSelectedBatch, selectedBatch],
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilterContext = (): IValue => useContext(FilterContext);
