const getColumnInfo = (column: string) => {
    switch (column) {
        case "Age":
            return {
                title: "Idade",
                titlePercentile: "Idade por Percentis",
                titleDispersion: "Medidas de Dispersão - Idade",
                subtitle: "Análise de faixa etária",
                unit: "anos",
                gradient: ["#8b5cf6", "#6366f1"],
                bgGradient: "from-purple-50 to-indigo-50"
            };
        case "Height":
            return {
                title: "Altura",
                titlePercentile: "Altura por Percentis",
                titleDispersion: "Medidas de Dispersão - Altura",
                subtitle: "Análise de estatura",
                unit: "cm",
                gradient: ["#10b981", "#14b8a6"],
                bgGradient: "from-emerald-50 to-teal-50"
            };
        case "Weight":
            return {
                title: "Peso",
                titlePercentile: "Peso por Percentis",
                titleDispersion: "Medidas de Dispersão - Peso",
                subtitle: "Análise de massa corporal",
                unit: "kg",
                gradient: ["#f59e0b", "#ef4444"],
                bgGradient: "from-amber-50 to-orange-50"
            };
    }
};

export const info = (column: string) => getColumnInfo(column);