export default function RenderStatistics(op: string, statisticsData: any){
    
    return (
    <ul  className="space-y-1">
        {statisticsData &&
        Object.entries(statisticsData).map(([type, value]) =>
            type === op ? (
                Object.entries(value as { [key: string]: any }).map(([outerKey, outerValue]) => (
                    <li 
                        key={outerKey}
                        className="bg-white rounded-lg p-2 border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200"
                    >
                        <span className="font-semibold text-sm text-indigo-900 block mb-3">{outerKey}</span>
                        <ul className="ml-6 space-y-2">
                            {Object.entries(outerValue as object).map(([innerKey, innerValue]) => (
                                <li 
                                    key={innerKey} 
                                    className="flex items-center text-xs text-gray-700 before:text-indigo-500 before:font-bold before:mr-3 before:text-xl"
                                >
                                    <span className="font-medium text-gray-800">{innerKey}</span>
                                    <span className="mx-2 text-gray-400">:</span>
                                    <span className="text-indigo-600">{innerValue as number}</span>  
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
                                className="bg-white rounded-lg p-2 text-xs border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200"
                            >
                                <span className="font-medium text-gray-700">{variable}</span>
                                <span className="mx-2 text-gray-400">:</span>
                                <span className="text-indigo-600">{statValue.toFixed(4)}</span>
                            </li>
                        ) : null
                    )
                )
            ) : null
        )}
    </ul>
    );
}