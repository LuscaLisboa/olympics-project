import type { PercentileData } from "../types/percentile_data";

interface Props{
    column: "Age" | "Height" | "Weight";
    setData(data: { percentile: number, value: number }[]): void;
    setLoadingPercentile(is: boolean): void;
} 

export async function fetchPercentileData({column, setData, setLoadingPercentile }: Props){
    setLoadingPercentile(true);

    try{
        fetch(`http://127.0.0.1:8000/percentile?column=${column}`)
        .then((res) => res.json())
        .then((json: PercentileData) => {
            const formatted = json.percentiles.map((p, i) => ({
                percentile: p,
                value: json.values[i],
            }));
            setData(formatted);
        });
    }catch(error) {
        console.error("fetchPercentileData error: ", error);
    }finally{
        setLoadingPercentile(false);
    }
}