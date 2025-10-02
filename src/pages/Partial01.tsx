import { ChevronRight, SquareSigma } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BlockMath } from "react-katex";
import { useEffect, useState } from "react";
import type { StatisticsValues } from "../types/statistics_values";
import { fetchStatisticsData } from "../functions/fetchStatisticsData";

export default function Partial01(){
    const navigate = useNavigate();

    const [statisticsData, setStatisticsData] = useState<StatisticsValues | null>(null)
    const [loadingStatistics, setLoadingStatistics] = useState(true);
    
    useEffect(() => {
        fetchStatisticsData({ setStatisticsData, setLoadingStatistics });
    }, [])

    const statisticsFormula = [
        {label: "Média (aritmética)", op: "average", desc: "valor médio das observações", formula: "\\bar{x}=\\frac 1 \\eta\\sum_{i=1}^n x_i"},
        {label: "Mediana", op: "median", desc: "valor central quando os dados ordenados", formula: "\\text{Se } \\eta \\text{ ímpar} \\rightarrow \\text{mediana} = x_{(k)} \\text{ com } K = \\frac{\\eta + 1}{2}", formula2: "\\text{Se } \\eta \\text{ par } \\rightarrow \\text{ média dos dois centrais } =  \\frac{x_{\\left(\\tfrac{\\eta}{2}\\right)} + x_{\\left(\\tfrac{\\eta}{2}+1\\right)}}{2}"},
        {label: "Moda", op: "moda", desc: "valor que ocorre com maior frequência (pode haver multimodalidade)", formula: "\\text{moda} = \\text{valor(es) com maior n° de contagem}"},
        {label: "Variância", op: "variance", desc: "média dos quadrados das diferenças em relação à média; mede dispersão", formula: "\\text{Populacional} \\quad \\sigma^{2} = \\frac{1}{N} \\sum_{i=1}^{N} \\left( x_{i} - \\bar{x} \\right)^{2}", formula2: "\\text{Amostral} \\quad S^{2} = \\frac{1}{\\eta - 1} \\sum_{i=1}^{\\eta} \\left( x_{i} - \\bar{x} \\right)^{2}"},
        {label: "Desvio padrão", op: "standard_deviation", desc: "raiz quadrada da variância; unidade original", formula: "\\text{Populacional} \\quad \\sigma = \\sqrt{\\sigma^{2}}", formula2: "\\text{Amostral} \\quad s = \\sqrt{s^{2}}"},
        {label: "Covariância", op: "covariance", desc: "mede direção conjunta entre duas variáveis X e Y", formula: "\\operatorname{cov}(X,Y) = \\frac{1}{\\eta - 1} \\sum_{i=1}^{\\eta} (x_i - \\bar{x})(y_i - \\bar{y})"},
        {label: "Correlação (Pearson)", op: "correlation", desc: "covariância normalizada entre -1 e 1", formula: "r_{XY} = \\frac{cov(X,Y)}{s_X s_Y}"}
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
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
                        <span className="text-slate-900">Parcial 01</span>
                    </div>
                </nav>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                        <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        Entrega Parcial 01
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Descrição da Governança Corporativa e de TI, implementação da LGPD, resumo breve e apresentação de cálculo comparativo da Estatística Descritiva
                    </p>
                </div>

                {/* Governança Corporativa */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white text-4xl">
                        📑
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Governança Corporativa</h2>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        <span className="font-bold">Visão de negócio:</span> transformar os dados históricos em análises e previsões que podem interessar a comitês esportivos, patrocinadores, jornalistas e torcedores. <br />
                        <span className="font-bold">Estratégia:</span> alinhar os objetivos do projeto com potenciais oportunidades de negócio, como relatórios para federações esportivas ou dashboards interativos para empresas de mídia. <br />
                        <span className="font-bold">Riscos:</span> gestão de riscos ligados à confiabilidade dos dados, segurança da informação e uso ético dos resultados. <br />
                        <span className="font-bold">Tomada de decisão:</span> basear decisões em dados auditáveis e confiáveis, com relatórios claros e objetivos.

                    </p>
                </div>

                {/* Governança de TI */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-4xl">
                        🖥️
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Governança de TI</h2>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        <span className="font-bold">Alinhamento estratégico:</span> entregar soluções que suportem as análises e previsões esportivas definidas na estratégia corporativa. <br />
                        <span className="font-bold">Infraestrutura tecnológica:</span> <br />
                            |<span className="font-bold ml-5">Hardware:</span> servidor local ou em nuvem (AWS, GCP, Azure) para processar datasets grandes (270k+ linhas). <br />
                            |<span className="font-bold ml-5">Software:</span> Python, Pandas. <br />
                            |<span className="font-bold ml-5">Rede:</span> conectividade estável e segura para acesso ao Kaggle, APIs esportivas e compartilhamento de dashboards. <br />
                            |<span className="font-bold ml-5">Banco de Dados:</span> PostgreSQL ou MySQL para armazenar os dados históricos e resultados de análises. <br />
                        <span className="font-bold">Segurança e compliance:</span> definir políticas de acesso aos dados, backup e versionamento do código (GitHub/GitLab). <br />
                        <span className="font-bold">Medição de desempenho (KPIs de TI):</span> tempo de resposta nas análises, confiabilidade do sistema, qualidade dos relatórios entregues. <br />
                    </p>
                </div>

                {/* LGPD */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-4xl">
                        👔
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Implementação da LGPD</h2>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        <span className="font-bold">Mapeamento e categorização dos dados:</span> identificar quais campos são dados pessoais (nome, idade, sexo) e quais podem ser anonimizados para análises (altura, peso, performance). <br />
                        <span className="font-bold">Finalidade e minimização:</span> utilizar os dados exclusivamente para fins acadêmicos/analíticos, evitando armazenar informações desnecessárias para os objetivos do estudo. <br />
                        <span className="font-bold">Anonimização/Pseudonimização:</span> para relatórios públicos e dashboards, apresentar resultados apenas em formato agregado (por país, modalidade, período), evitando exposição direta de atletas individuais. <br />
                        <span className="font-bold">Segurança da informação:</span> uso de banco de dados com autenticação, criptografia em repouso e em trânsito, controle de acesso por papéis e backups seguros. <br />
                        <span className="font-bold">Direitos dos titulares:</span> apesar do dataset ser histórico e público, o projeto deve prever que dados identificáveis sejam removidos/anonimizados caso um titular solicite. <br />
                        <span className="font-bold">Ética e transparência</span> não explorar dados de forma discriminatória, enviesada ou que exponha atletas de maneira negativa; garantir que o uso seja apenas para fins estatísticos. <br />
                        <span className="font-bold">Governança::</span> nomeação de responsável (DPO acadêmico ou líder do projeto) para manter políticas de uso, auditoria de acessos e conformidade com a legislação. <br />
                    </p>
                </div>

                {/* Estatística Descritiva */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-4xl">
                        <SquareSigma size={40}/>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Estatística Descritiva</h2>
                    </div>
                    <div className="grid gap-4">
                        {statisticsFormula.map((f, index) => (
                        <div key={index} className="bg-slate-50 rounded-xl border border-slate-100">
                            <div className="flex items-start gap-4 p-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg flex items-center justify-center text-white text-sm font-bold mt-1">
                                {index + 1}
                                </div>
                                <p className="text-slate-700 flex-1"><span className="font-bold">{f.label}</span><br /> {f.desc}</p>
                                <p className="text-slate-700 flex-1"><BlockMath math={f.formula}/> <br /> {f.formula2 && <BlockMath math={f.formula2}/>}</p>
                            </div>
                            <div className="p-4 flex flex-row">
                                <div className="w-full pl-1">
                                    Resultados: 
                                </div>
                                <div className="w-full pr-1 bg-green-300/20"> 
                                    {loadingStatistics ? (
                                        <p>Carregando...</p>
                                    ) : (
                                        <div>
                                            <ul>
                                            { /* Statistics */ }
                                            {Object.entries(statisticsData?.statistics ?? {}).map(([cKey, cValue]) => 
                                                Object.entries(cValue ?? {}).map(([sKey, sValue]) => 
                                                    sKey === f.op ? (
                                                        <li key={`${cKey}-${sKey}`}>
                                                        {cKey}: {sValue}
                                                        </li>
                                                    ) : null
                                                )
                                            )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 