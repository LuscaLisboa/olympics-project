import type { HistogramData } from "../types/histogram_data";

interface Props{
    column: "Age" | "Height" | "Weight";
    bins?: number;
    setData(data: { bin: string, count: number }[]): void;
    setLoadingHistogram(is: boolean): void;
} 

export async function fetchHistogramData({column, bins, setData, setLoadingHistogram }: Props){
    setLoadingHistogram(true);
    
    try{
        fetch(`http://127.0.0.1:8000/histogram?column=${column}&bins=${bins}`)
        .then((res) => res.json())
        .then((json: HistogramData) => {
            const formatted = json.bins.map((bin, i) => ({
                bin,
                count: json.counts[i],
            }));
            setData(formatted);
        });
    }catch(error) {
        console.error("fetchHistogramData error: ", error);
    }finally{
        setLoadingHistogram(false);
    }
}