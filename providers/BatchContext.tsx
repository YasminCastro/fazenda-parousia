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

const BatchContext = createContext({} as IValue);

export const BatchProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [selectedBatch, setSelectedBatch] = useState("farm");
  const [batch, setBatch] = useState([{ value: "farm", label: "Fazenda" }]);

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

  useEffect(() => {
    console.log("BATCH CHANGED", batch);
  }, [batch]);

  const value = useMemo(
    () => ({
      batch,
      setSelectedBatch,
      selectedBatch,
    }),
    [batch, setSelectedBatch, selectedBatch],
  );

  return (
    <BatchContext.Provider value={value}>{children}</BatchContext.Provider>
  );
};

export const useBatch = (): IValue => useContext(BatchContext);
