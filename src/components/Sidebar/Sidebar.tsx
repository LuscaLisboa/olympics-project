import { BookOpen, ChartColumn, ChevronRight, Home, Menu, Tally1, Tally2, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar(){
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { path: '', label: 'Início', icon: Home },
        { path: 'introduction', label: 'Introdução', icon: BookOpen },
        { path: 'partial-01', label: 'Parcial 01', icon: Tally1 },
        { path: 'partial-02', label: 'Parcial 02', icon: Tally2 },
        { path: 'central-teorem', label: 'Teorema Central', icon: ChartColumn }
    ];

    return(
        <>
            {/* Botão mobile para abrir sidebar */}
            <button 
                className="lg:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            {/* Overlay para mobile */}
            {isOpen && (
                <div 
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                    fixed top-0 left-0 h-dvh w-72 bg-gradient-to-b from-slate-900 to-slate-800 
                    text-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                <div className="p-6 border-b border-slate-700">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Menu
                    </h2>
                </div>

                <nav className="p-4">
                    <ul className="space-y-2"> 
                        {menuItems.map(({ path, label, icon: Icon }) => (
                            
                            <li key={path}>
                                <button onClick={() => {
                                    navigate(`/${path}`);
                                    setIsOpen(false);
                                    }} className={`
                                        w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                                        ${location.pathname === `/${path}`
                                        ? 'bg-indigo-600 text-white shadow-lg' 
                                        : 'hover:bg-slate-700 text-slate-300 hover:text-white'
                                        }
                                    `}>
                                        <Icon size={20}/>
                                        <span className="font-medium">{label}</span>
                                        <ChevronRight size={16} className={`ml-auto transition-transform ${
                                        location.pathname === `/${path}` ? 'rotate-90' : 'group-hover:translate-x-1'
                                        }`} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Footer da sidebar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
                    <div className="text-sm text-slate-400 text-center">
                        Feito com ❤️ em React
                    </div>
                </div>
            </div>
        </>
    );
}