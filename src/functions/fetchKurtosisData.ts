import type { KurtosisData } from "../types/kurtosis_data";

interface Props{
    column: "Age" | "Height" | "Weight";
    setData(data: KurtosisData): void;
    setLoading(is: boolean): void;
} 

export async function fetchKurtosisData({ column, setData, setLoading }: Props){
    setLoading(true);
    
    try{
        fetch(`http://127.0.0.1:8000/dispersion_measures?column=${column}`)
        .then((res) => res.json())
        .then((json: KurtosisData) => {
            setData(json);
        })
    }catch(error) {
        console.error("fetchDispersionData error: ", error);
    }finally{
        setLoading(false);
    }
}