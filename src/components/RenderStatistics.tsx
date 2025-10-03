export default function RenderStatistics(op: string, statisticsData: any){
    const getColumnInfo = (column: string) => {
        switch (column) {
            case "Age":
                return {
                    txtColor: "text-[#8b5cf6]",
                    valColor: "text-indigo-600",
                    bgGradient: "from-purple-50/50 to-indigo-50/50"
                };
            case "Height":
                return {
                    txtColor: "text-[#10b981]",
                    valColor: "text-teal-600",
                    bgGradient: "from-emerald-50/50 to-teal-50/50"
                };
            case "Weight":
                return {
                    txtColor: "text-[#f59e0b]",
                    valColor: "text-orange-600",
                    bgGradient: "from-amber-50/50 to-orange-50/50"
                };
        }
    };
    const info = (column: string) => getColumnInfo(column);

    return (
    <ul  className="space-y-1">
        {statisticsData &&
        Object.entries(statisticsData).map(([type, value]) =>
            type === op ? (
                Object.entries(value as { [key: string]: any }).map(([outerKey, outerValue]) => (
                    <li 
                        key={outerKey}
                        className={`bg-gradient-to-br ${info(outerKey)?.bgGradient} rounded-lg p-2 border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200`}
                    >
                        <span className={`font-semibold text-sm ${info(outerKey)?.txtColor} block`}>{outerKey}</span>
                        <ul className="ml-6 space-y-2">
                            {Object.entries(outerValue as object).map(([innerKey, innerValue]) => (
                                <li 
                                    key={innerKey} 
                                    className="flex items-center text-xs text-gray-700 before:text-indigo-500 before:font-bold before:mr-3 before:text-xl"
                                >
                                    <span className="font-medium text-gray-800">{innerKey}</span>
                                    <span className="mx-2 text-gray-400">:</span>
                                    <span className={info(outerKey)?.valColor}>{innerValue as number}</span>  
                                </li>
                            ))}
                        </ul>
                    </li>
                ))
            ) : type === 'statistics' ? (
                Object.entries(statisticsData.statistics).map(([variable, stats]) =>
                    Object.entries(stats as { [key: string]: any }).map(([statKey, statValue]) =>
                        statKey === op ? (
                            <li 
                                key={`statistics-${variable}-${statKey}`}
                                className={`bg-gradient-to-br ${info(variable)?.bgGradient} rounded-lg p-2 text-xs border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200`}
                            >
                                <span className={info(variable)?.txtColor}>● </span>
                                <span className={`font-medium tex-gray-800`}>{variable}</span>
                                <span className="mx-2 text-gray-400">:</span>
                                <span className={info(variable)?.valColor}>{statValue.toFixed(4)}</span>
                            </li>
                        ) : null
                    )
                )
            ) : null
        )}
    </ul>
    );
}