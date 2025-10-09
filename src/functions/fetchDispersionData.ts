import type { DispersionData } from "../types/dispersion_data";

interface Props{
    column: "Age" | "Height" | "Weight";
    setData(data: DispersionData): void;
    setLoadingDispersionMeasures(is: boolean): void;
} 

export async function fetchDispersionData({ column, setData, setLoadingDispersionMeasures }: Props){
    setLoadingDispersionMeasures(true);
    
    try{
        fetch(`http://127.0.0.1:8000/dispersion_measures?column=${column}`)
        .then((res) => res.json())
        .then((json: DispersionData) => {
            setData(json);
        })
    }catch(error) {
        console.error("fetchDispersionData error: ", error);
    }finally{
        setLoadingDispersionMeasures(false);
    }
}