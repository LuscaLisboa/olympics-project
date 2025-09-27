import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Introduction(){
    const navigate = useNavigate();
    
    const dataColumns = [
        { name: 'ID', description: 'Identificador único de cada atleta' },
        { name: 'Name', description: 'Nome do atleta' },
        { name: 'Sex', description: 'Sexo (M ou F)' },
        { name: 'Age', description: 'Idade do atleta' },
        { name: 'Height', description: 'Altura em centímetros' },
        { name: 'Weight', description: 'Peso em quilogramas' },
        { name: 'Team', description: 'Nome do time/país' },
        { name: 'NOC', description: 'Código de 3 letras do Comitê Olímpico Nacional' },
        { name: 'Games', description: 'Ano e estação (ex.: 2000 Summer)' },
        { name: 'Sport', description: 'Modalidade esportiva' },
        { name: 'Event', description: 'Evento específico' },
        { name: 'Medal', description: 'Medalha conquistada (Ouro, Prata, Bronze ou nenhuma)' }
    ];

    const analysisIdeas = [
        'Comparar o total de medalhas conquistadas por cada país, incluindo a divisão por ouro, prata e bronze',
        'Avaliar quais esportes são tradicionalmente dominados por determinadas nações',
        'Estudar a evolução da performance de um país em diferentes edições dos Jogos Olímpicos',
        'Investigar o impacto de características como idade, altura e peso no desempenho esportivo'
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
                        <span className="text-slate-900">Introdução</span>
                    </div>
                </nav>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                        <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        Introdução
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Análise do desempenho dos países nos Jogos Olímpicos ao longo da história moderna
                    </p>
                </div>

                {/* Objetivo Principal */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white text-2xl">
                        🎯
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Objetivo do Projeto</h2>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        Este projeto tem como objetivo analisar o desempenho dos países nos Jogos Olímpicos ao longo da história moderna. 
                        A proposta central é identificar padrões de performance, explorar o domínio de determinados esportes por países específicos 
                        e compreender quais fatores individuais podem influenciar no sucesso de um atleta.
                    </p>
                </div>

                {/* Ideias de Análise */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-2xl">
                        💡
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Ideias de Análise</h2>
                    </div>
                    <div className="grid gap-4">
                        {analysisIdeas.map((idea, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg flex items-center justify-center text-white text-sm font-bold mt-1">
                            {index + 1}
                            </div>
                            <p className="text-slate-700 flex-1">{idea}</p>
                        </div>
                        ))}
                    </div>
                </div>

                {/* Base de Dados */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white text-2xl">
                        📊
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Base de Dados</h2>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
                            CSV
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-green-900">athlete_events.csv</h3>
                            <p className="text-green-700 text-sm">Dataset principal do projeto</p>
                        </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-800">270k+</div>
                            <div className="text-green-600">Registros</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-800">1896-2016</div>
                            <div className="text-green-600">Período</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-800">12</div>
                            <div className="text-green-600">Colunas</div>
                        </div>
                        </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                        O dataset contém mais de 270 mil registros de atletas que competiram nas Olimpíadas entre 1896 e 2016. 
                        Cada linha representa a participação de um atleta em um evento específico.
                    </p>
                </div>

                {/* Colunas do Dataset */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-2xl">
                        🗂️
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Estrutura dos Dados</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {dataColumns.map((column, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                            {index + 1}
                            </div>
                            <div className="flex-1">
                            <div className="font-semibold text-slate-900">{column.name}</div>
                            <div className="text-sm text-slate-600">{column.description}</div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

                {/* Objetivo Final */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center text-2xl">
                        🏆
                        </div>
                        <h2 className="text-2xl font-bold">Resultado Esperado</h2>
                    </div>
                    <p className="text-orange-100 leading-relaxed text-lg">
                        Ao final, espera-se que o estudo traga uma visão clara e prática sobre como diferentes países se destacaram ao longo 
                        dos Jogos Olímpicos, quais fatores podem ter influenciado esses resultados e como esses dados podem ser utilizados 
                        para compreender a evolução do esporte em nível global.
                    </p>
                </div>

                {/* Botão de volta */}
                <div className="text-center">
                    <button 
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-slate-700 hover:to-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        <ChevronRight size={20} className="rotate-180" />
                        Voltar ao Início
                    </button>
                </div>
            </div>
        </div>
    );
}