import { useEffect, useState } from "react";
import type { AsymmetryData } from "../../../types/asymmetry_data";
import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { info } from "../../../functions/info_getColumnInfo";

interface Props{
    column: "Age" | "Height" | "Weight";
}

export default function AsymmetryChart({ column }: Props){
    const [data, setData] = useState<AsymmetryData>();

    useEffect(() => {
        try{
            fetch(`http://127.0.0.1:8000/asymmetry?column=${column}`)
            .then((res) => res.json())
            .then((json: AsymmetryData) => {
                setData(json);
            })
        }catch(error) {
            console.error("fetchDispersionData error: ", error);
        }
    }, [column]);

    if (!data) {
        return (
            <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-lg p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
                    <div className="h-64 bg-gray-300 rounded mb-4"></div>
                    <div className="h-80 bg-gray-300 rounded"></div>
                </div>
            </div>
        );
    }

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-1 rounded-lg shadow-xl border" style={{ borderColor: info(column)?.gradient[1] }}>
                    <p style={{ color: info(column)?.gradient[0] }}>
                        Frequência: {payload[0].value.toFixed(2)}
                    </p>
                </div>
            );
        }
        return null;
    };

    const SkewnessIndicator = ({ skewness }: { skewness: number }) => {
        // Normalizar skewness para posição no indicador (-2 a 2 mapeado para 0-100%)
        const clampedSkewness = Math.max(-2, Math.min(2, skewness));
        const position = ((clampedSkewness + 2) / 4) * 100;
        
        return (
            <div className="w-full grid gap-10 bg-white/60 backdrop-blur-sm rounded-xl p-2 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    Indicador de Assimetria
                </h3>
                
                {/* Escala visual */}
                <div className="relative h-16 mb-6">
                    {/* Barra de gradiente */}
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-red-500 via-gray-100 to-blue-500"></div>
                    </div>
                    
                    {/* Indicador */}
                    <div 
                        className="absolute top-0 bottom-0 w-1 transition-all duration-500 shadow-lg"
                        style={{ left: `${position}%`, transform: 'translateX(-50%)', backgroundColor: info(column)?.gradient[0] }}
                    >
                        <div 
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-900 rounded-full border-4 border-white shadow-xl"
                            style={{ backgroundColor: info(column)?.gradient[0] }}
                        ></div>
                    </div>
                    
                    {/* Labels */}
                    <div className="absolute -bottom-8 left-0 text-xs font-semibold text-red-600">
                        Negativa<br/>← Cauda à esquerda
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-600 text-center">
                        Simétrica
                    </div>
                    <div className="absolute -bottom-8 right-0 text-xs font-semibold text-blue-600 text-right">
                        Positiva<br/>Cauda à direita →
                    </div>
                </div>
                
                <div className="mt-12 text-center">
                    <p className="text-sm text-gray-600 mb-1">Coeficiente de Assimetria</p>
                    <p className="text-3xl font-bold" style={{ color: info(column)?.gradient[0] }}>{skewness.toFixed(4)}</p>
                </div>
            </div>
        );
    };

    const generateDistributionCurve = (skewness: number) => {
        const points = [];
        const numPoints = 50;
        
        for (let i = 0; i < numPoints; i++) {
            const x = (i / numPoints) * 10 - 5; // Range de -5 a 5
            
            // Simular distribuição normal ajustada pela assimetria
            let y = Math.exp(-0.5 * Math.pow(x, 2));
            
            // Ajustar pela assimetria
            if (skewness > 0) {
                y *= Math.exp(-skewness * x * 0.3);
            } else if (skewness < 0) {
                y *= Math.exp(skewness * x * 0.3);
            }
            
            points.push({
                x: x.toFixed(2),
                value: y * 100,
                label: i === 25 ? "Média" : ""
            });
        }
        
        return points;
    };

    const distributionData = generateDistributionCurve(data.skewness);

    const getInterpretationDetails = () => {
        const absSkewness = Math.abs(data.skewness);
        
        if (data.interpretation === "positive") {
            return {
                title: "Assimetria Positiva (à Direita)",
                color: "text-blue-600",
                bgColor: "bg-blue-50 border-blue-300/25",
                description: "A cauda da distribuição se estende para a direita",
                meaning: absSkewness < 0.5 
                    ? "Assimetria leve - distribuição quase simétrica"
                    : absSkewness < 1
                    ? "Assimetria moderada - maioria dos valores à esquerda"
                    : "Assimetria forte - concentração alta à esquerda",
                characteristics: [
                    "Média > Mediana > Moda",
                    "Valores extremos altos",
                    "Cauda alongada à direita"
                ]
            };
        } else if (data.interpretation === "negative") {
            return {
                title: "Assimetria Negativa (à Esquerda)",
                color: "text-red-600",
                bgColor: "bg-red-50 border-red-300/25",
                description: "A cauda da distribuição se estende para a esquerda",
                meaning: absSkewness < 0.5 
                    ? "Assimetria leve - distribuição quase simétrica"
                    : absSkewness < 1
                    ? "Assimetria moderada - maioria dos valores à direita"
                    : "Assimetria forte - concentração alta à direita",
                characteristics: [
                    "Moda > Mediana > Média",
                    "Valores extremos baixos",
                    "Cauda alongada à esquerda"
                ]
            };
        } else {
            return {
                title: "Distribuição Simétrica",
                color: "text-gray-600",
                bgColor: "bg-gray-50 border-gray-300/25",
                description: "A distribuição é equilibrada em torno da média",
                meaning: "Distribuição aproximadamente normal",
                characteristics: [
                    "Média ≈ Mediana ≈ Moda",
                    "Distribuição balanceada",
                    "Sem caudas alongadas"
                ]
            };
        }
    };

    const interpretation = getInterpretationDetails();

    return (
        <div className={`p-2 grid gap-2 bg-gradient-to-br ${info(column)?.bgGradient} rounded-2xl shadow-lg`}>
            <div className="">
                <h2 className="font-bold" style={{ color: info(column)?.gradient[0] }}>{info(column)?.title}</h2>
                <p className="text-sm text-gray-600">Medida de assimetria da distribuição dos dados</p>
            </div>
            {/* Card de Interpretação Principal */}
            <div className={`${interpretation.bgColor} rounded-xl p-2 border-2`}>
                <div className="flex items-start gap-4">
                    <div className="flex-1">
                        <h3 className={`font-bold ${interpretation.color}`}>
                            {interpretation.title}
                        </h3>
                        <p className="text-gray-700">{interpretation.description}</p>
                        <div className="bg-white/60 rounded-lg p-4 mb-3">
                            <p className="font-semibold text-gray-800 mb-2">Interpretação:</p>
                            <p className="text-gray-700">{interpretation.meaning}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            {interpretation.characteristics.map((char, i) => (
                                <div key={i} className="bg-white/60 rounded-lg p-3 text-sm">
                                    <span className="text-gray-700">✓ {char}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid com Indicador e Gráfico */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {/* Indicador de Skewness */}
                <SkewnessIndicator skewness={data.skewness} />

                {/* Curva de Distribuição */}
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        Curva de Distribuição Simulada
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={distributionData} margin={{ top: 5, right: 5, left: -30, bottom: 5 }}>
                            <defs>
                                <linearGradient id={`gradient-${column}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={info(column)?.gradient[0]} stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor={info(column)?.gradient[1]} stopOpacity={0.2}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis 
                                dataKey="x" 
                                tick={{ fill: '#4b5563', fontSize: 11 }}
                                label={{ value: 'Valores', position: 'insideBottom', offset: -5, fill: '#4b5563' }}
                            />
                            <YAxis tick={{ fill: '#4b5563', fontSize: 11 }} />
                            <Tooltip content={<CustomTooltip />} />
                            <ReferenceLine x="0.00" stroke="#ef4444" strokeDasharray="3 3" label="Média" />
                            <Area 
                                type="monotone" 
                                dataKey="value" 
                                stroke={info(column)?.gradient[0]} 
                                strokeWidth={2}
                                fill={`url(#gradient-${column})`}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Tabela de Referência */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2 border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    Guia de Interpretação
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-gray-300">
                                <th className="text-left py-3 px-4 font-bold text-gray-700">Valor de Skewness</th>
                                <th className="text-left py-3 px-4 font-bold text-gray-700">Classificação</th>
                                <th className="text-left py-3 px-4 font-bold text-gray-700">Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200 hover:bg-white/40">
                                <td className="py-3 px-4 font-mono">-1 a -0.5</td>
                                <td className="py-3 px-4 font-semibold text-red-600">Negativa Moderada</td>
                                <td className="py-3 px-4">Cauda esquerda alongada</td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-white/40">
                                <td className="py-3 px-4 font-mono">-0.5 a 0.5</td>
                                <td className="py-3 px-4 font-semibold text-gray-600">Aproximadamente Simétrica</td>
                                <td className="py-3 px-4">Distribuição balanceada</td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-white/40">
                                <td className="py-3 px-4 font-mono">0.5 a 1</td>
                                <td className="py-3 px-4 font-semibold text-blue-600">Positiva Moderada</td>
                                <td className="py-3 px-4">Cauda direita alongada</td>
                            </tr>
                            <tr className="hover:bg-white/40">
                                <td className="py-3 px-4 font-mono">&gt; 1 ou &lt; -1</td>
                                <td className="py-3 px-4 font-semibold text-purple-600">Forte Assimetria</td>
                                <td className="py-3 px-4">Distribuição altamente assimétrica</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                {/* Status atual */}
                <div className="p-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg border border-indigo-300">
                    <p className="text-sm font-semibold text-gray-700">
                        <span className={interpretation.color}>{interpretation.title}</span> com skewness de <span className="font-mono text-lg">{data.skewness.toFixed(4)}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}