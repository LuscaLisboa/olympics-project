import { useEffect, useMemo, useState } from "react";
import { fetchKurtosisData } from "../../functions/fetchKurtosisData";
import type { KurtosisData } from "../../types/kurtosis_data";
import { info } from "../../functions/info_getColumnInfo";
import { Area, CartesianGrid, ComposedChart, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props{
    column: "Age" | "Height" | "Weight";
}

export default function KurtosisChart({ column }: Props){
    const [data, setData] = useState<KurtosisData>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            fetchKurtosisData({column, setData, setLoading});
        }, [column])

    const generateDistributionCurves = (kurtosis: number) => {
        const points: { x: number; normal: number; adjusted: number }[] = [];
        const numPoints = 60;
        
        // garantir número válido
        const k = Number.isFinite(kurtosis) ? kurtosis : 3;
        // clamp em faixa razoável pra visual (ex: 0..10)
        const kClamped = Math.max(0, Math.min(10, k));

        for (let i = 0; i < numPoints; i++) {
            // x numérico de -6 a +6 (float)
            const x = (i / (numPoints - 1)) * 12 - 6;

            // densidade normal padrão
            const normal = Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);

            // ajuste simples pela curtose (controlado)
            const kurtosisAdjustment = (kClamped - 3) * 0.12; // fator menor para não explodir valores
            let adjusted = normal;

            if (Math.abs(x) < 1) {
                adjusted *= 1 + kurtosisAdjustment;
            } else {
                adjusted *= 1 + kurtosisAdjustment * 0.7;
            }

            // garantir número finito e não-negativo
            const adjVal = Math.max(0, Number.isFinite(adjusted) ? adjusted : 0);

            points.push({
                x: Number(x.toFixed(2)),                       // número, não string
                normal: Number((normal * 100).toFixed(6)),     // escala para visual
                adjusted: Number((adjVal * 100).toFixed(6)),   // escala para visual
            });
        }

        return points;
    };

    const kurtosisValue = useMemo(() => {
        if (!data) return 3;                 // fallback
        const n = Number(data.kurtosis);
        return Number.isFinite(n) ? n : 3;
    }, [data]);

    const generateComparisonData = () => {
        const points = [];
        const numPoints = 50;
        
        for (let i = 0; i < numPoints; i++) {
            const x = (i / numPoints) * 10 - 5;
            const normal = Math.exp(-0.5 * Math.pow(x, 2)) / Math.sqrt(2 * Math.PI);
            
            // Leptokurtic (pico alto)
            let lepto = normal;
            if (Math.abs(x) < 1) {
                lepto *= 1.5;
            }
            
            // Platykurtic (pico baixo)
            let platy = normal * 0.85;
            
            points.push({
                x: x.toFixed(1),
                normal: normal * 100,
                leptokurtic: lepto * 100,
                platykurtic: platy * 100
            });
        }
        
        return points;
    };

    const distributionData = useMemo(() => generateDistributionCurves(kurtosisValue), [kurtosisValue]);
    const comparisonData = useMemo(() => generateComparisonData(), []); // se for estático

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 rounded-lg shadow-xl border" style={{ borderColor: info(column)?.gradient[1]}}>
                    <p className="font-semibold text-sm mb-1">{payload[0].name}</p>
                    <p className="font-semibold" style={{ color: info(column)?.gradient[0] }}>
                        {payload[0].value.toFixed(2)}
                    </p>
                </div>
            );
        }
        return null;
    };

    type KurtosisIndicatorProps = { kurtosis?: number | null }; 

    const KurtosisIndicator = ({ kurtosis }: KurtosisIndicatorProps) => {
        // fallback seguro: se kurtosis não for número finito, usa 3 (mesocúrtica)
        const kRaw = Number(kurtosis);
        const k = Number.isFinite(kRaw) ? kRaw : 3;

        // clamp em faixa visual 0..6 (ajuste se preferir outra faixa)
        const minK = 0;
        const maxK = 6;
        const kClamped = Math.max(minK, Math.min(maxK, k));

        // posição em % (0..100)
        const position = ((kClamped - minK) / (maxK - minK)) * 100;

        // texto exibido com duas casas seguras
        const displayK = Number.isFinite(k) ? k.toFixed(2) : "N/A";
        
        return (
            <div className="w-full bg-white/60 backdrop-blur-sm rounded-xl p-2 border border-gray-200 grid gap-4">
                <h3 className="text-lg font-bold text-gray-800 items-center">
                    Indicador de Curtose
                </h3>

                <div className="grid">
                    <div className="flex justify-between text-xs font-bold text-gray-600 mb-2">
                        <span>Platykurtic (Picos baixos)</span>
                        <span>Mesokurtic (Normal)</span>
                        <span>Leptokurtic (Picos altos)</span>
                    </div>

                    <div className="relative h-12 bg-gradient-to-r from-amber-400 via-gray-300 to-purple-500 rounded-full overflow-hidden shadow-lg grid">
                        <div className="absolute inset-0 flex">
                            <div className="w-1/3 bg-gradient-to-r from-amber-400 to-transparent opacity-20"></div>
                            <div className="w-1/3 bg-gray-300 opacity-20"></div>
                            <div className="w-1/3 bg-gradient-to-r from-transparent to-purple-500 opacity-20"></div>
                        </div>
                        <div
                            className="absolute top-0 bottom-0 w-1.5 bg-gray-900 transition-all duration-500 shadow-xl"
                            style={{ left: `${position}%`, transform: "translateX(-50%)" }}
                        >
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-900 rounded-full border-4 border-white shadow-xl"></div>
                        </div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-600 mt-2 font-mono">
                        <span>0</span>
                        <span>3</span>
                        <span>6</span>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Coeficiente de Curtose</p>
                    <p className="text-3xl font-bold mb-2" style={{ color: info(column)?.bgGradient[1] }}>{displayK}</p>
                    <div className="inline-block bg-gray-100 rounded-lg px-4 py-2">
                        <p className="text-sm font-semibold text-gray-700">
                            {k > 3 ? "Leptokúrtica (K > 3)" : k < 3 ? "Platicúrtica (K < 3)" : "Mesocúrtica (K ≈ 3)"}
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    if (loading || !data) {
        return (
            <div className="bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 rounded-2xl shadow-lg p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="h-80 bg-gray-300 rounded"></div>
                        <div className="h-80 bg-gray-300 rounded"></div>
                    </div>
                    <div className="h-96 bg-gray-300 rounded"></div>
                </div>
            </div>
        );
    }

    const getInterpretationDetails = () => {
        if (data.interpretation === "leptokurtic") {
            return {
                title: "Leptokúrtica (K > 3)",
                color: "text-purple-600",
                bgColor: "bg-purple-50 border-purple-300",
                description: "Distribuição com picos altos e caudas pesadas",
                meaning: "Há maior concentração de valores próximos à média e valores extremos mais frequentes",
                characteristics: [
                    "Picos acentuados no centro",
                    "Caudas mais pesadas",
                    "Maior probabilidade de outliers",
                    "Concentração maior em torno da média"
                ]
            };
        } else if (data.interpretation === "platykurtic") {
            return {
                title: "Platicúrtica (K < 3)",
                color: "text-amber-600",
                bgColor: "bg-amber-50 border-amber-300",
                description: "Distribuição com picos baixos e caudas leves",
                meaning: "Os valores estão mais uniformemente distribuídos, com menos concentração no centro",
                characteristics: [
                    "Picos achatados no centro",
                    "Caudas mais leves",
                    "Menos probabilidade de outliers",
                    "Valores mais espalhados"
                ]
            };
        } else {
            return {
                title: "Mesocúrtica (K ≈ 3)",
                color: "text-cyan-600",
                bgColor: "bg-cyan-50 border-cyan-300",
                description: "Distribuição normal (similar à distribuição Gaussiana)",
                meaning: "Comportamento intermediário entre leptokúrtica e platicúrtica",
                characteristics: [
                    "Picos normais no centro",
                    "Caudas normais",
                    "Probabilidade moderada de outliers",
                    "Distribuição clássica"
                ]
            };
        }
    };

    const interpretation = getInterpretationDetails();

    return (
        <div className={`bg-gradient-to-br ${info(column)?.bgGradient} rounded-2xl shadow-lg p-2 grid gap-4`}>
            {/* Header */}
            <div className="">
                <h2 className="font-bold text-gray-800">{info(column)?.title}</h2>
                <p className="text-sm text-gray-600">Medida do grau de concentração de valores na cauda da distribuição</p>
            </div>

            {/* Interpretação Principal */}
            <div className={`${interpretation.bgColor} rounded-xl p-2 border-2`}>
                <div className="flex items-start gap-4">
                    <div className="flex-1">
                        <h3 className={`text-lg font-bold ${interpretation.color}`}>
                            {interpretation.title}
                        </h3>
                        <p className="text-gray-700">{interpretation.description}</p>
                        <div className="bg-white/60 rounded-lg p-4">
                            <p className="font-semibold text-gray-800">Interpretação:</p>
                            <p className="text-gray-700">{interpretation.meaning}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {interpretation.characteristics.map((char, i) => (
                                <div key={i} className="bg-white/60 rounded-lg p-3 text-sm">
                                    <span className="text-gray-700">✓ {char}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid com Indicador e Gráfico da Distribuição */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Indicador de Curtose */}
                <KurtosisIndicator kurtosis={data.kurtosis} />

                {/* Curva de Distribuição */}
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 items-center">
                        Curva de Distribuição
                    </h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <ComposedChart data={distributionData} margin={{ top: 0, right: 5, left: -30, bottom: 0 }}>
                            <defs>
                                <linearGradient id={`gradient-adjusted-${column}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={info(column)?.gradient[0]} stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor={info(column)?.gradient[1]} stopOpacity={0.2}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis 
                                dataKey="x" 
                                tick={{ fill: '#4b5563', fontSize: 10 }}
                            />
                            <YAxis tick={{ fill: '#4b5563', fontSize: 10 }} />
                            <Tooltip content={<CustomTooltip />} />
                            <ReferenceLine x="0.00" stroke="#ef4444" strokeDasharray="3 3" />
                            <Area 
                                type="monotone" 
                                dataKey="adjusted" 
                                stroke={info(column)?.gradient[0]} 
                                strokeWidth={2.5}
                                fill={`url(#gradient-adjusted-${column})`}
                                name="Sua distribuição"
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Gráfico Comparativo das Três Distribuições */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 items-center">
                    Comparação das Distribuições
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={comparisonData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                            dataKey="x" 
                            tick={{ fill: '#4b5563', fontSize: 11 }}
                        />
                        <YAxis tick={{ fill: '#4b5563', fontSize: 11 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <ReferenceLine x="0.0" stroke="#9ca3af" strokeDasharray="3 3" />
                        <Line 
                            type="monotone" 
                            dataKey="normal" 
                            stroke="#9ca3af" 
                            strokeWidth={2.5}
                            name="Mesocúrtica (Normal)"
                            dot={false}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="leptokurtic" 
                            stroke="#9333ea" 
                            strokeWidth={2.5}
                            name="Leptocúrtica (Picos altos)"
                            dot={false}
                            strokeDasharray="5 5"
                        />
                        <Line 
                            type="monotone" 
                            dataKey="platykurtic" 
                            stroke="#f59e0b" 
                            strokeWidth={2.5}
                            name="Platicúrtica (Picos baixos)"
                            dot={false}
                            strokeDasharray="5 5"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Tabela de Referência */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📋</span>
                    Guia de Interpretação
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-gray-300">
                                <th className="text-left py-3 px-4 font-bold text-gray-700">Tipo</th>
                                <th className="text-left py-3 px-4 font-bold text-gray-700">Valor K</th>
                                <th className="text-left py-3 px-4 font-bold text-gray-700">Características</th>
                                <th className="text-left py-3 px-4 font-bold text-gray-700">Exemplo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200 hover:bg-white/40">
                                <td className="py-3 px-4 font-semibold text-purple-600">🔺 Leptocúrtica</td>
                                <td className="py-3 px-4 font-mono">&gt; 3</td>
                                <td className="py-3 px-4">Picos altos, caudas pesadas, outliers frequentes</td>
                                <td className="py-3 px-4 text-xs text-gray-600">Dados muito concentrados</td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-white/40">
                                <td className="py-3 px-4 font-semibold text-cyan-600">➡️ Mesocúrtica</td>
                                <td className="py-3 px-4 font-mono">≈ 3</td>
                                <td className="py-3 px-4">Distribuição normal, comportamento clássico</td>
                                <td className="py-3 px-4 text-xs text-gray-600">Distribuição Gaussiana</td>
                            </tr>
                            <tr className="hover:bg-white/40">
                                <td className="py-3 px-4 font-semibold text-amber-600">🔻 Platicúrtica</td>
                                <td className="py-3 px-4 font-mono">&lt; 3</td>
                                <td className="py-3 px-4">Picos baixos, caudas leves, dados dispersos</td>
                                <td className="py-3 px-4 text-xs text-gray-600">Distribuição uniforme</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* Status atual */}
                <div className="p-2 bg-gradient-to-r from-violet-100 to-purple-100 rounded-lg border border-violet-300">
                    <p className="text-sm font-semibold text-gray-700">
                        <span className={interpretation.color}>{interpretation.title}</span> com curtose de <span className="font-mono text-lg font-bold">{data.kurtosis}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}