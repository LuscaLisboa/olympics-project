import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { info } from "../../../functions/info_getColumnInfo";
import type { PercentileData } from "../../../types/percentile_data";

interface Props{
    column: "Age" | "Height" | "Weight";
}

export default function PercentileChart({ column }: Props){
    const [data, setData] = useState<{ percentile: number, value: number }[]>([]);

    useEffect(() => {
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
            }
        }, [column])

    const CustomTooltip = ({ active, payload, column }: any) => {
        if (active && payload && payload.length) {
            const unit = column === "Age" ? "anos" : column === "Height" ? "cm" : "kg";
            return (
                <div className="bg-white p-3 rounded-lg shadow-xl border" style={{ borderColor: info(column)?.gradient[1] }}>
                    <p className="font-bold text-gray-800">{payload[0].payload.percentile}%</p>
                    <p className={`text-[${info(column)?.gradient[0]}] font-semibold`}>
                        {payload[0].value.toFixed(column === "Age" ? 0 : 1)} {unit}
                    </p>
                </div>
            );
        }
        return null;
    };

    if (!data) {
        return (
            <div className={`bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-lg p-6`}>
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-6"></div>
                    <div className="h-80 bg-gray-300 rounded"></div>
                </div>
            </div>
        );
    }

    const medianValue = data.find(d => d.percentile === 50)?.value || 0;

    return (
        <div className={`bg-gradient-to-br ${info(column)?.bgGradient} rounded-2xl shadow-lg`}>
            <div className="pt-4 pb-2">
                <div className="pl-4 pr-4">
                    <h2 className={`text-sm font-semibold text-[${info(column)?.gradient[0]}]`}>{info(column)?.titlePercentile}</h2>
                    <p className="text-sm text-gray-600 mb-4">{info(column)?.subtitle}</p>
                
                    {/* Estatísticas rápidas */}
                    <div className="grid grid-cols-3 gap-0.5 mb-1">
                        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-gray-200">
                            <p className="text-[0.55rem] text-gray-600">Mínimo (P0)</p>
                            <p className="text-sm font-semibold text-gray-800">
                                {data[0]?.value.toFixed(column === "Age" ? 0 : 1)} {info(column)?.unit}
                            </p>
                        </div>
                        <div className={`bg-white/70 backdrop-blur-sm rounded-lg p-3 border`} style={{ borderColor: info(column)?.gradient[0] }}>
                            <p className="text-[0.55rem] text-gray-600">Mediana (P50)</p>
                            <p className={`text-sm font-semibold text-[${info(column)?.gradient[0]}]`}>
                                {medianValue.toFixed(column === "Age" ? 0 : 1)} {info(column)?.unit}
                            </p>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-gray-200">
                            <p className="text-[0.55rem] text-gray-600">Máximo (P100)</p>
                            <p className="text-sm font-semibold text-gray-800">
                                {data[data.length - 1]?.value.toFixed(column === "Age" ? 0 : 1)} {info(column)?.unit}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pl-0.5 pr-0.5">
                    <ResponsiveContainer width="100%" height={350}>
                        <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                            <defs>
                                <linearGradient id={`gradient-percentile-${column}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={info(column)?.gradient[0]} stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor={info(column)?.gradient[1]} stopOpacity={0.05}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis 
                                dataKey="percentile" 
                                tick={{ fill: '#4b5563', fontSize: 12 }}
                                label={{ value: 'Percentil', position: 'insideBottom', offset: -2, fill: '#4b5563' }}
                            />
                            <YAxis 
                                tick={{ fill: '#4b5563', fontSize: 12 }}
                                label={{ value: info(column)?.unit, angle: -90, position: 'insideLeft', fill: '#4b5563' }}
                            />
                            <Tooltip content={<CustomTooltip column={column} />} />
                            <ReferenceLine 
                                y={medianValue} 
                                stroke={info(column)?.gradient[1]} 
                                strokeDasharray="5 5"
                                label={{ value: 'Mediana', fill: info(column)?.gradient[1], fontSize: 12 }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="value" 
                                stroke={info(column)?.gradient[0]} 
                                strokeWidth={2}
                                fill={`url(#gradient-percentile-${column})`}
                                dot={{ fill: info(column)?.gradient[1], strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, strokeWidth: 2 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>

                    {/* Legenda de percentis importantes */}
                    <div className="flex justify-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                            <span className="text-[0.70rem] text-gray-600">P25: {data.find(d => d.percentile === 25)?.value.toFixed(column === "Age" ? 0 : 1)} {info(column)?.unit}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: info(column)?.gradient[1] }}></div>
                            <span className="text-[0.70rem] text-gray-700 font-semibold">P50: {medianValue.toFixed(column === "Age" ? 0 : 1)} {info(column)?.unit}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                            <span className="text-[0.70rem] text-gray-600">P75: {data.find(d => d.percentile === 75)?.value.toFixed(column === "Age" ? 0 : 1)} {info(column)?.unit}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}