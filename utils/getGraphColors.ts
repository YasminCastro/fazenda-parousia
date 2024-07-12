import { BatchCombobox } from "@/providers/FilterContext";

const colors = [
  "#8280ff",
  "#fec53d",
  "#5cdd9c",
  "#ff9871",
  "#ff80ca",
  "#A6A4FF",
  "#FFE073",
  "#89F2C2",
  "#FFBDA2",
  "#FFA3DF",
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
