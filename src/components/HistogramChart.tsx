import { useEffect, useState } from "react";
import { fetchHistogramData } from "../functions/fecthHistogramData";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props{
    column: "Age" | "Height" | "Weight";
    bins?: number;
}

export default function HistogramChart({ column, bins = 10 }: Props) {
    const [data, setData] = useState<{ bin: string, count: number }[]>([]);
    const [loadingHistogram, setLoadingHistogram] = useState(true);

    useEffect(() => {
        fetchHistogramData({column, bins, setData, setLoadingHistogram});
    }, [column, bins])

    const CustomTooltip = ({
        active,
        payload,
        label,
        unit,
    }: {
        active?: boolean;
        payload?: Array<{ value: number }>;
        label?: string;
        unit?: string;
    }) => {
    if (active && payload && payload.length) {
        return (
        <div className="bg-gray-900 text-white p-3 rounded-lg shadow-xl border border-gray-700">
            <p className="font-semibold">{label} {unit}</p>
            <p className="text-blue-400">Frequência: {payload[0].value}</p>
        </div>
        );
    }
    return null;
    };

    return (
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg">
            <div className="mb-4 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{column}</h2>
                <p className="text-sm text-gray-600">{column === "Age" ? "Faixa Etária" : column === "Height" ? "Altura" : column === "Weight" ? "Peso" : null}</p>
            </div>
            {!loadingHistogram && (
                <ResponsiveContainer width={300} height={350}>
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <defs>
                            <linearGradient id="ageGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.9}/>
                                <stop offset="100%" stopColor="#5b21b6" stopOpacity={0.7}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/>
                        <XAxis 
                            dataKey="bin"
                            tick={{ fill: '#4b5563', fontSize: 12 }}
                            axisLine={{ stroke: '#9ca3af' }}
                        />
                        <YAxis 
                            tick={{ fill: '#4b5563', fontSize: 12 }}
                            axisLine={{ stroke: '#9ca3af' }}
                            label={{ value: 'Frequência', angle: -90, position: 'insideLeft', fill: '#4b5563' }}
                        />
                        <Tooltip 
                            content={<CustomTooltip unit={column === "Age" ? "anos" : column === "Height" ? "cm" : column === "Weight" ? "kg" : ""} active={undefined} payload={undefined} label={undefined} />} 
                            cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
                        />
                        <Bar dataKey="count" fill="url(#ageGradient)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>                
            )}
        </div>
    );
}