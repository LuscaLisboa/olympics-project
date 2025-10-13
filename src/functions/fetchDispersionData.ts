import type { DispersionData } from "../types/dispersion_data";

interface Props{
    column: "Age" | "Height" | "Weight";
    setData(data: DispersionData): void;
    setLoading(is: boolean): void;
} 

export async function fetchDispersionData({ column, setData, setLoading }: Props){
    setLoading(true);
    
    try{
        fetch(`http://127.0.0.1:8000/dispersion_measures?column=${column}`)
        .then((res) => res.json())
        .then((json: DispersionData) => {
            setData(json);
        })
    }catch(error) {
        console.error("fetchDispersionData error: ", error);
    }finally{
        setLoading(false);
    }
}