export type PercentileData = {
  column: "Age" | "Height" | "Weight";
  percentiles: number[];
  values: number[];
};