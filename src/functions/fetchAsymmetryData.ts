import type { AsymmetryData } from "../types/asymmetry_data";

interface Props{
    column: "Age" | "Height" | "Weight";
    setData(data: AsymmetryData): void;
    setLoadingAsymmetry(is: boolean): void;
} 

export async function fetchAsymmetryData({ column, setData, setLoadingAsymmetry }: Props) {
    setLoadingAsymmetry(true);

    try{
        fetch(`http://127.0.0.1:8000/asymmetry?column=${column}`)
        .then((res) => res.json())
        .then((json: AsymmetryData) => {
            setData(json);
        })
    }catch(error) {
        console.error("fetchDispersionData error: ", error);
    }finally{
        setLoadingAsymmetry(false);
    }
}