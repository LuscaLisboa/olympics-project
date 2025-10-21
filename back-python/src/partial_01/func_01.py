from fastapi import Query, HTTPException
from scipy import stats


def statistics_func(numericals, df_num):
    results = {}

    for col in numericals:
        serie = df_num[col]

        results[col] = {
            "average": float(serie.mean()),
            "median": float(serie.median()),
            "mode": float(stats.mode(serie, keepdims=True).mode[0]),
            "variance": float(serie.var(ddof=0)),     # sample
            "standard_deviation": float(serie.std(ddof=0)),
        }

    # Covariance
    covariance = df_num.cov().to_dict()

    # Pearson Correlation
    correlation = df_num.corr(method="pearson").to_dict()

    return {
        "statistics": results,
        "covariance": covariance,
        "correlation": correlation,
    }


def histogram_func(df, pd, column: str = Query(..., regex="^(Age|Height|Weight)$"), bins: int = 10):
    if column not in df.columns:
        raise HTTPException(status_code=400, detail="Invalid Column")

    series = df[column].dropna()

    if column == "Age":
        series = series.round().astype(int)
        hist, bin_edges = pd.cut(series, bins=bins, retbins=True)
        counts = hist.value_counts().sort_index()

        bins_formatted = []
        for interval in counts.index:
            left = int(interval.left)
            right = int(interval.right)
            bins_formatted.append(f"{left}-{right}")
    else:
        hist, bin_edges = pd.cut(series, bins=bins, retbins=True)
        counts = hist.value_counts().sort_index()

        bins_formatted = []
        for interval in counts.index:
            left = round(interval.left, 1)
            right = round(interval.right, 1)
            bins_formatted.append(f"{left}-{right}")

    return {
        "column": column,
        "bins": bins_formatted,
        "counts": counts.values.tolist()
    }


def percentile_func(df, np, column: str = Query(..., regex="^(Age|Height|Weight)$")):
    if column not in df.columns:
        raise HTTPException(status_code=400, detail="Invalid Column")

    series = df[column].dropna()

    percentiles = [0, 10, 25, 50, 75, 90, 95, 99, 100]
    values = np.percentile(series, percentiles)

    precision = 0 if column == "Age" else 1
    values = [round(v, precision) for v in values]

    return {
        "column": column,
        "percentiles": percentiles,
        "values": values
    }


def dispersion_mearures_func(df, column: str = Query(..., regex="^(Age|Height|Weight)$")):
    if column not in df.columns:
        raise HTTPException(status_code=400, detail="Invalid Column")

    series = df[column].dropna()

    amplitude = series.max() - series.min()
    variance = series.var(ddof=1)
    standard_deviation = series.std(ddof=1)
    coef_var = (standard_deviation / series.mean()) * 100

    return {
        "column": column,
        "amplitude": amplitude,
        "variance": variance,
        "standard_deviation": standard_deviation,
        "coef_var": coef_var
    }


def asymmetry_func(df, column: str = Query(..., regex="^(Age|Height|Weight)$")):
    if column not in df.columns:
        raise HTTPException(status_code=400, detail="Invalid Column")

    series = df[column].dropna()

    # Asymetry calc (skewness)
    skewness = series.skew()

    # Basic interpretation
    if skewness > 0:
        interpretation = "positive"
    elif skewness < 0:
        interpretation = "negative"
    else:
        interpretation = "symmetric"

    return {
        "column": column,
        "skewness": round(skewness, 4),
        "interpretation": interpretation
    }


def kurtosis_func(df, column: str = Query(..., regex="^(Age|Height|Weight)$")):
    if column not in df.columns:
        raise HTTPException(status_code=400, detail="Invalid Column")

    series = df[column].dropna()

    kurtosis = series.kurt()

    if kurtosis > 3:
        interpretation = "leptokurtic"
    elif kurtosis < 3:
        interpretation = "platykurtic"
    else:
        interpretation = "mesokurtic"

    return {
        "column": column,
        "kurtosis": kurtosis,
        "interpretation": interpretation
    }

