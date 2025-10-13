export type KurtosisData = {
    column: string;
    kurtosis: number;
    interpretation: "leptokurtic" | "platykurtic" | "mesokurtic";
}