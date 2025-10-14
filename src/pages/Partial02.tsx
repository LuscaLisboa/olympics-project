import { ChevronRight } from "lucide-react";
import { BlockMath } from "react-katex";
import { useNavigate } from "react-router-dom";
import CentralLimitChart from "../components/Charts/partial_02/CentralLimitChart";

export default function Partial02(){
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <nav className="mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <button onClick={() => navigate('/')} className="hover:text-orange-600 transition-colors">
                        Projeto Olímpico
                        </button>
                        <ChevronRight size={16} />
                        <button onClick={() => navigate('/introduction')} className="hover:text-orange-600 transition-colors">
                        Introdução
                        </button>
                        <ChevronRight size={16} />
                        <button onClick={() => navigate('/partial-01')} className="hover:text-orange-600 transition-colors">
                        Parcial 01
                        </button>
                        <ChevronRight size={16} />
                        <span className="text-slate-900">Parcial 02</span>
                    </div>
                </nav>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                        <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        Entrega Parcial 02
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Infográfico do Teorema Central do Limite, Correlação, Amostrgem, Distribuição Normal (Curva de gauss), T-Student, Qui-Quadrado, com suas respectivas fórmulas
                    </p>
                </div>

                {/* Teorema Central do Limite */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-4xl">
                        🖥️
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Teorema Central do Limite</h2>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                        <span className="text-lg font-bold">•Independência da distribuição original:</span> Não importa se a população de onde as amostras são retiradas tem distribuição normal, uniforme, exponencial ou qualquer outra. <br />
                        <span className="text-lg font-bold">•Médias amostrais:</span> Ao calcularmos a média de várias amostras retiradas dessa população, a distribuição dessas médias seguirá uma curva em forma de sino, característica da distribuição normal. <br />
                        <span className="text-lg font-bold">•Tamanho da amostra:</span> Quanto maior o tamanho da amostra, mais próxima da normal será a distribuição das médias amostrais. <br />
                        <div className="grid grid-cols-2 gap-8">
                            <div className="justify-end grid gap-0">
                                <span><BlockMath math="\small \bar x \text{ é a média amostral}"/></span>
                                <span><BlockMath math="\small \mu \text{ é a média populacional}"/></span>
                                <span><BlockMath math="\small {\sigma_{\bar{x}}} \text{ é o erro padrão da média}"/></span>
                            </div>
                            <div>
                                <BlockMath math="\Huge Z = \frac{\bar{x} - \mu}{\sigma_{\bar{x}}}"/>
                            </div>
                        </div>
                    </p> 
                    <div>
                        <CentralLimitChart />
                    </div>
                </div>

            </div>
        </div>
    );
}