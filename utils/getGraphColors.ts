import { BatchCombobox } from "@/providers/FilterContext";

const colors = [
  "#3498DB",
  "#2ECC71",
  "#E74C3C",
  "#9B59B6",
  "#E67E22",
  "#F1C40F",
];

export const getBarColor = (index: number) => {
  return colors[index];
};

export const getBarColorByName = (
  batches: BatchCombobox[],
  selectedBatch: any,
) => {
  const index =
    batches.findIndex((batch) => batch.value === selectedBatch) || 0;

  return colors[index];
};
