import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage(){
    const navigate = useNavigate();

    const activities = [
        {
            id: '1.1',
            title: 'Teorema Central do Limite',
            description: 'Infográfico explicativo com definições, fórmulas e exemplos',
            status: 'pendente',
            icon: '📊',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: '1.2', 
            title: 'Correlação',
            description: 'Análise das relações entre variáveis',
            status: 'pendente',
            icon: '📈',
            color: 'from-green-500 to-emerald-500'
        },
        {
            id: '1.3',
            title: 'Amostragem e Distribuição Normal',
            description: 'Curva de Gauss e distribuição de Poisson',
            status: 'pendente',
            icon: '📉',
            color: 'from-purple-500 to-pink-500'
        },
        {
            id: '1.4',
            title: 'T-Student',
            description: 'Teste t para amostras pequenas',
            status: 'pendente',
            icon: '📐',
            color: 'from-orange-500 to-red-500'
        },
        {
            id: '1.5',
            title: 'Qui-quadrado',
            description: 'Teste de independência e aderência',
            status: 'pendente',
            icon: '📏',
            color: 'from-teal-500 to-cyan-500'
        },
        {
            id: '2',
            title: 'Regressão Linear e Não Linear',
            description: 'Programação em Python com dados olímpicos',
            status: 'pendente',
            icon: '🐍',
            color: 'from-indigo-500 to-purple-500'
        },
        {
            id: '3',
            title: 'Relatório e Dashboard',
            description: 'Documentação geral e visualizações em Python',
            status: 'pendente',
            icon: '📋',
            color: 'from-slate-500 to-gray-500'
        }
    ];
    
    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                        Análise Estatística dos
                        <span className="block bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            Jogos Olímpicos
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Projeto de análise de dados olímpicos com teorias estatísticas e programação em Python
                    </p>
                </div>

            {/* Status da Entrega */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 mb-8 text-white">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center text-3xl">
                        🏆
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-2">ENTREGA 02</h2>
                        <p className="text-orange-100">
                            Análises estatísticas, infográficos e programação em Python
                        </p>
                    </div>
                </div>
            </div>

            {/* Atividades */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Atividades do Projeto</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activities.map((activity) => (
                        <div 
                            key={activity.id}
                            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-orange-200 group"
                        >
                            <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${activity.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                                {activity.icon}
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                activity.status === 'concluído' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                                {activity.status}
                            </span>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                            {activity.id}. {activity.title}
                            </h3>
                            <p className="text-slate-600 text-sm">{activity.description}</p>
                        </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Seções principais */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
                            1
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">Infográficos</h3>
                    </div>
                    <p className="text-slate-600 text-sm mb-4">
                    Visualizações das principais teorias estatísticas com definições, fórmulas e exemplos práticos.
                    </p>
                    <div className="text-xs text-slate-500">
                        Plataforma: Canva.com
                    </div>
                </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">
                        2
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Programação</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                Implementação de regressões linear e não linear usando Python com dados olímpicos.
                </p>
                <div className="text-xs text-slate-500">
                    Linguagem: Python
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                        3
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Relatório</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                    Dashboard interativo e documentação completa das análises realizadas.
                </p>
                <div className="text-xs text-slate-500">
                    Formato: ZIP com todos os arquivos
                </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Sobre o Projeto</h2>
                    <p className="text-slate-600 mb-6">
                        Conheça mais detalhes sobre a análise de dados dos Jogos Olímpicos e a metodologia utilizada
                    </p>
                    <button 
                    onClick={() => navigate('introduction')}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Ver Introdução do Projeto
                    <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}