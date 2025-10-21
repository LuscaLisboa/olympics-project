import { ChevronRight } from "lucide-react";
import { BlockMath } from "react-katex";
import { useNavigate } from "react-router-dom";
import CentralLimitChart from "../components/Charts/partial_02/CentralLimitChart";
import CorrelationChart from "../components/Charts/partial_02/CorrelationChart";
import SampleChart from "../components/Charts/partial_02/SampleChart";
import TStudentChart from "../components/Charts/partial_02/TStudentChart";
import ChiSquareChart from "../components/Charts/partial_02/ChiSquareChart";
import RegressionChart from "../components/Charts/partial_02/RegressionChart";

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
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Teorema Central do Limite</h2>
                            <span>Afirma que a média de várias amostras de uma população tende a seguir uma distribuição normal, mesmo que a população original não seja normal</span>
                        </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                        <span className="text-lg font-bold">• Independência da distribuição original:</span> Não importa se a população de onde as amostras são retiradas tem distribuição normal, uniforme, exponencial ou qualquer outra. <br />
                        <span className="text-lg font-bold">• Médias amostrais:</span> Ao calcularmos a média de várias amostras retiradas dessa população, a distribuição dessas médias seguirá uma curva em forma de sino, característica da distribuição normal. <br />
                        <span className="text-lg font-bold">• Tamanho da amostra:</span> Quanto maior o tamanho da amostra, mais próxima da normal será a distribuição das médias amostrais. <br />
                        <div className="grid grid-cols-2 gap-8">
                            <div className="justify-end grid gap-0">
                                <span><BlockMath math="\small \bar x \text{ é a média amostral}"/></span>
                                <span><BlockMath math="\small \mu \text{ é a média populacional}"/></span>
                                <span><BlockMath math="\small {\sigma_{\bar{x}}} \text{ é o erro padrão da média}"/></span>
                            </div>
                            <div>
                                <BlockMath math="\huge Z = \frac{\bar{x} - \mu}{\sigma_{\bar{x}}}"/>
                            </div>
                        </div>
                    </p> 
                    <div>
                        <CentralLimitChart />
                    </div>
                </div>

                {/* Correlação */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-4xl">
                        🖥️
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Correlação</h2>
                            <span>Mede a força e a direção da relação linear entre duas variáveis</span>
                        </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                        <span className="text-lg font-bold">• r = 1:</span> relação linear perfeita e positiva <br />
                        <span className="text-lg font-bold">• r = 0:</span> inexistência linear <br />
                        <span className="text-lg font-bold">• r = -1:</span> relação linear perfeita e negativa <br />
                        <div className="grid grid-cols-2 gap-8">
                            <div className="justify-end grid gap-0">
                                <span><BlockMath math="\small cov_{x_{i}y} \text{ : covariância entre } x \text{ e } y"/></span>
                                <span><BlockMath math="\small s_X \text{ e } s_Y \text{ : desvio padrão de } x \text{ e } y"/></span>
                            </div>
                            <div className="">
                                <BlockMath math="\huge r_{XY} = \frac{cov(X,Y)}{s_X s_Y}"/>
                            </div>
                        </div>
                    </p> 
                    <div>
                        <CorrelationChart />
                    </div>
                </div>

                {/* Amostragem */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-4xl">
                        🖥️
                        </div>
                        <div>
                        <h2 className="text-2xl font-bold text-slate-900">Amostragem</h2>
                        <span>Amostragem é o processo de selecionar parte de uma população para análise; a distribuição normal descreve dados simétricos em forma de sino, e a de Poisson modela ocorrências raras em certo intervalo</span>
                        </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                        <span className="text-lg font-bold">• x = μ:</span> ponto de máximo de f(x) <br />
                        <span className="text-lg font-bold">• x = μ + σ e x = μ - σ:</span> pontos de inflexão <br />
                        <span className="text-lg font-bold">• curva:</span> simétrico a μ <br />
                        <div className="grid grid-cols-2 gap-8">
                            <div className="justify-end grid gap-0">
                                <span><BlockMath math="\small \mu \text{ : média da distribuição}"/></span>
                                <span><BlockMath math="\small \sigma \text{ : desvio-padrão}"/></span>
                                <span><BlockMath math="\small e \text{ : constante de Euler}"/></span>
                            </div>
                            <div className="">
                                <BlockMath math="\huge f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{1}{2}\left(\frac{x - \mu}{\sigma}\right)^2}"/>
                            </div>
                        </div>
                    </p> 
                    <div>
                        <SampleChart />
                    </div>
                </div>

                {/* t_Student */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-4xl">
                        🖥️
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">t_Student</h2>
                            <span>Distribuição usada para estimar médias de pequenas amostras com variância desconhecida</span>
                        </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="justify-end grid gap-0">
                                <span><BlockMath math="\small Γ \text{ : função gama}"/></span>
                                <span><BlockMath math="\small \nu \text{ : grau de liberdade da distribuição}"/></span>
                            </div>
                            <div className="">
                                <BlockMath math="\huge f(t) = \frac{\Gamma\left(\frac{\nu+1}{2}\right)}{\sqrt{\nu\pi}\,\Gamma\left(\frac{\nu}{2}\right)} \left(1 + \frac{t^2}{\nu}\right)^{-\frac{\nu+1}{2}} "/>
                            </div>
                        </div>
                    </p> 
                    <div>
                        <TStudentChart />
                    </div>
                </div>

                {/* chi_square */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-4xl">
                        🖥️
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">qui-quadrado</h2>
                            <span>Distribuição usada para testar hipóteses sobre variâncias e independência entre variáveis categóricas</span>
                        </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="justify-end grid gap-0">
                                <span><BlockMath math="\small k \text{ : grau de liberdade}"/></span>
                                <span><BlockMath math="\small Γ \text{ : função gama}"/></span>
                            </div>
                            <div className="">
                                <BlockMath math="\huge f(x) = \frac{1}{2^{\frac{k}{2}}\Gamma\left(\frac{k}{2}\right)} x^{\frac{k}{2}-1} e^{-\frac{x}{2}}"/>
                            </div>
                        </div>
                    </p> 
                    <div>
                        <ChiSquareChart />
                    </div>
                </div>

                {/* Regressão */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-4xl">
                        🖥️
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Regressão</h2>
                            <span>Técnica que modela a relação entre uma variável dependente e uma ou mais variáveis independentes, permitindo quantificar e prever a relação entre elas</span>
                        </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="justify-end grid gap-0">
                                
                            </div>
                            <div className="">
                            </div>
                        </div>
                        <RegressionChart />
                    </p> 
                    <div>
                    </div>
                </div>
            </div>
        </div>
    );
}