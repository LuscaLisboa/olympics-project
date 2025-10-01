type Basic = {
        average: number,
        median: number,
        moda: number,
        variance: number,
        standard_deviation: number
}

type Complex = {
    Age: number,
    Height: number,
    Weight: number
}

export type StatisticsValues = {
    statistics: {
        Age: Basic,
        Height: Basic,
        Weight: Basic
    },
    covariance: {
        Age: Complex,
        Height: Complex,
        Weight: Complex
    },
    correlation: {
        Age: Complex,
        Height: Complex,
        Weight: Complex
    }
}