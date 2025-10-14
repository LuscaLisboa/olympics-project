import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { info } from "../../../functions/info_getColumnInfo";
import type { HistogramData } from "../../../types/histogram_data";

interface Props{
    column: "Age" | "Height" | "Weight";
    bins?: number;
}

export default function HistogramChart({ column, bins = 10 }: Props) {
    const [data, setData] = useState<{ bin: string, count: number }[]>([]);

    useEffect(() => {
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
        }
    }, [column, bins])

    const CustomTooltip = ({active, payload, label}: any) => {
    if (active && payload && payload.length) {
        return (
        <div className="bg-white text-white p-3 rounded-lg shadow-xl border" style={{ borderColor: info(column)?.gradient[1] }}>
            <p className="text-gray-800 font-semibold">{label} {info(column)?.unit}</p>
            <p style={{ color: info(column)?.gradient[0] }}>Frequência: {payload[0].value}</p>
        </div>
        );
    }
    return null;
    };

    return (
        <div className={`bg-gradient-to-br ${info(column)?.bgGradient} rounded-2xl shadow-lg`}>
            <div className="p-4 pb-0">
                <p className={`text-sm font-semibold`} style={{ color: info(column)?.gradient[0] }}>{info(column)?.title}</p>
                <p className="text-sm text-gray-600">{info(column)?.subtitle}</p>
            </div>
            {!data && (
                <ResponsiveContainer width={900} height={350}>
                    <BarChart data={data} margin={{ top: 5, right: 5, left: 1, bottom: 5 }}>
                        <defs>
                            <linearGradient id={`gradient-histogram-${column}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={info(column)?.gradient[0]} stopOpacity={0.5}/>
                                <stop offset="95%" stopColor={info(column)?.gradient[1]} stopOpacity={1}/>
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
                        <Tooltip content={<CustomTooltip column={column} />} />
                        <Bar dataKey="count" fill={`url(#gradient-histogram-${column})`} radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>                
            )}
        </div>
    );
}