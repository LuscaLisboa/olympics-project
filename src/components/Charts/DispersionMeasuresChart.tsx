import { useEffect, useState } from "react";
import { fetchDispersionData } from "../../functions/fetchDispersionData";
import type { DispersionData } from "../../types/dispersion_data";
import { info } from "../../functions/info_getColumnInfo";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip} from "recharts";

interface Props {
    column: "Age" | "Height" | "Weight";
}

export default function DispersionMeasuresChart({ column }: Props){
    const [data, setData] = useState<DispersionData>();
    const [loadingDispersionMeasures, setLoadingDispersionMeasures] = useState(true);

    useEffect(() => {
        fetchDispersionData({column, setData, setLoadingDispersionMeasures})
    }, [column]);

    if (loadingDispersionMeasures || !data) {
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

    const maxValues = {
        amplitude: 100,
        standard_deviation: 20,
        coef_var: 50,
        variance: 300
    };

    const radarData = [
        {
            measure: "Amplitude",
            value: (data.amplitude / maxValues.amplitude) * 100,
            fullMark: 100
        },
        {
            measure: "Desvio Padrão",
            value: (data.standard_deviation / maxValues.standard_deviation) * 100,
            fullMark: 100
        },
        {
            measure: "Coeficiente de Variação",
            value: (data.coef_var / maxValues.coef_var) * 100,
            fullMark: 100
        },
        {
            measure: "Variãncia",
            value: (data.variance / maxValues.variance) * 100,
            fullMark: 100
        }
    ];

    const StatCard = ({ label, value, description }: any) => (
        <div className={`bg-white/80 backdrop-blur-sm rounded-xl p-2 border shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105`} style={{ borderColor: info(column)?.gradient[1] }}>
            <p className="text-sm text-gray-600 font-medium">{label}</p>
            <p className="text-lg font-bold text-gray-800" style={{ color: info(column)?.gradient[0] }}>{value}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
        </div>
    );

    const CustomTooltip = ({ active, payload, column }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 rounded-lg shadow-xl border border-gray-700" style={{ borderColor: info(column)?.gradient[1] }}>
                    <p className="font-bold text-sm">{payload[0].payload.label}</p>
                    <p className={`text-[${info(column)?.gradient[0]}] font-semibold`}>
                        {payload[0].value.toFixed(2)}
                    </p>
                    {payload[0].payload.description && (
                        <p className="text-gray-400 text-xs max-w-xs">
                            {payload[0].payload.description}
                        </p>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <div className={`w-full p-2 bg-gradient-to-br ${info(column)?.bgGradient} rounded-2xl shadow-lg `}>
            {/* Header */}
            <div className="pb-2">
                <h2 className={`text-xm font-bold`} style={{ color: info(column)?.gradient[0] }}>{info(column)?.title}</h2>
                <p className="text-sm text-gray-600">Análise de variabilidade e dispersão dos dados</p>
            </div>

            <div className="flex gap-4">

                {/* Cards de Estatísticas */}
                <div className="flex-shrink-0 w-80 grid grid-cols-1 gap-1">
                    <StatCard
                        label="Amplitude"
                        value={`${data.amplitude.toFixed(1)} ${info(column)?.unit}`}
                        description="Diferença entre o valor máximo e mínimo"
                    />
                    <StatCard
                        label="Variância"
                        value={data.variance.toFixed(2)}
                        description="Média dos quadrados das diferenças"
                    />
                    <StatCard
                        label="Desvio Padrão"
                        value={`${data.standard_deviation.toFixed(2)} ${info(column)?.unit}`}
                        description="Raiz quadrada da variância"
                    />
                    <StatCard
                        label="Coef. de Variação"
                        value={`${data.coef_var.toFixed(2)}%`}
                        description="Dispersão relativa em percentual"
                    />
                </div>
            

                {/* Gráficos */}
                <div className="flex-1">
                    
                    {/* Gráfico Radar */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2 border border-gray-200">
                        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                            Distribuição Normalizada
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <RadarChart data={radarData}>
                                <PolarGrid stroke="#e5e7eb" />
                                <PolarAngleAxis 
                                    dataKey="measure" 
                                    tick={{ fill: '#4b5563', fontSize: 12 }}
                                />
                                <PolarRadiusAxis 
                                    angle={90} 
                                    domain={[0, 100]}
                                    tick={{ fill: '#4b5563', fontSize: 10 }}
                                />
                                <Radar 
                                    name="Dispersão" 
                                    dataKey="value" 
                                    stroke={info(column)?.gradient[0]} 
                                    fill={info(column)?.gradient[1]} 
                                    fillOpacity={0.6}
                                    strokeWidth={2}
                                />
                                <Tooltip content={<CustomTooltip column={column} />} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}