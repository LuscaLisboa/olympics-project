import type { StatisticsValues } from "../types/statistics_values";

interface Props{
    setStatisticsData(data : StatisticsValues): void;
    setLoadingStatistics(is: boolean): void;
}

export async function fetchStatisticsData({ setStatisticsData, setLoadingStatistics } : Props){
    try{
        const res = await fetch('http://127.0.0.1:8000/statistics');
        const data: StatisticsValues = await res.json();
        setStatisticsData(data);
    } catch(error) {
        console.error("fetchStatisticsData error: ", error);
    } finally{
        setLoadingStatistics(false);
    }
}