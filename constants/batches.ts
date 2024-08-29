const batchesDefault: BatchCombobox[] = [
  { value: "all", label: "Fazenda", key: "fazenda", color: "#3498DB" },
  { value: "a", label: "Lote A", key: "loteA", color: "#2ECC71" },
  { value: "b", label: "Lote B", key: "loteB", color: "#E74C3C" },
  { value: "c", label: "Lote C", key: "loteC", color: "#9B59B6" },
  { value: "d", label: "Lote D", key: "loteD", color: "#E67E22" },
  { value: "n", label: "Lote N", key: "loteN", color: "#F1C40F" },
];

export interface BatchCombobox {
  value: string;
  label: string;
  key: string;
  color: string;
}

export default batchesDefault;
