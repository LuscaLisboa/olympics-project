import math
from numbers import Number

from fastapi import Query, HTTPException


def _ensure_non_empty(series, column):
    cleaned = series.dropna()
    if cleaned.empty:
        raise HTTPException(
            status_code=422,
            detail=f"Column '{column}' does not contain valid numerical data.",
        )
    return cleaned


def _to_serializable_number(value):
    if value is None:
        return None
    if isinstance(value, Number):
        value = float(value)
        if math.isnan(value) or math.isinf(value):
            return None
        return value
    return None


def statistics_func(numericals, df_num):
    results = {}

    for col in numericals:
        serie = _ensure_non_empty(df_num[col], col)

        mode_series = serie.mode()
        mode_value = _to_serializable_number(mode_series.iloc[0]) if not mode_series.empty else None

        results[col] = {
            "average": float(serie.mean()),
            "median": float(serie.median()),
            "mode": mode_value,
            "variance": _to_serializable_number(serie.var(ddof=1)),
            "standard_deviation": _to_serializable_number(serie.std(ddof=1)),
        }

    # Covariance
    covariance = {
        row: {col: _to_serializable_number(value) for col, value in values.items()}
        for row, values in df_num.cov().to_dict().items()
    }

    # Pearson Correlation
    correlation = {
        row: {col: _to_serializable_number(value) for col, value in values.items()}
        for row, values in df_num.corr(method="pearson").to_dict().items()
    }

    return {
        "statistics": results,
        "covariance": covariance,
        "correlation": correlation,
    }


def histogram_func(df, pd, column: str = Query(..., regex="^(Age|Height|Weight)$"), bins: int = 10):
    if column not in df.columns:
        raise HTTPException(status_code=400, detail="Invalid Column")

    series = df[column].dropna()

    series = _ensure_non_empty(df[column], column)

    decimals = 0 if column == "Age" else 1
    hist, _ = pd.cut(series, bins=bins, retbins=True, include_lowest=True)
    counts = hist.value_counts().sort_index()

    bins_formatted = []
    for interval in counts.index:
        left = round(interval.left, decimals)
        right = round(interval.right, decimals)
        if decimals == 0:
            left, right = int(left), int(right)
        bins_formatted.append(f"{left}-{right}")

    return {
        "column": column,
        "bins": bins_formatted,
        "counts": counts.values.tolist()
    }


def percentile_func(df, np, column: str = Query(..., regex="^(Age|Height|Weight)$")):
    if column not in df.columns:
        raise HTTPException(status_code=400, detail="Invalid Column")

    series = _ensure_non_empty(df[column], column)

    percentiles = [0, 10, 25, 50, 75, 90, 95, 99, 100]
    values = np.percentile(series, percentiles)

    precision = 0 if column == "Age" else 1
    values = [round(float(v), precision) for v in values]

    return {
        "column": column,
        "percentiles": percentiles,
        "values": values
    }


def dispersion_mearures_func(df, column: str = Query(..., regex="^(Age|Height|Weight)$")):
    if column not in df.columns:
        raise HTTPException(status_code=400, detail="Invalid Column")

    series = _ensure_non_empty(df[column], column)

    amplitude = float(series.max() - series.min())
    variance = _to_serializable_number(series.var(ddof=1))
    standard_deviation = _to_serializable_number(series.std(ddof=1))

    mean_value = series.mean()
    if abs(mean_value) < 1e-12 or standard_deviation is None:
        coef_var = None
    else:
        coef_var = float((standard_deviation / mean_value) * 100)

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

    series = _ensure_non_empty(df[column], column)

    skewness = float(series.skew())

    tolerance = 1e-4
    if skewness > tolerance:
        interpretation = "positive"
    elif skewness < -tolerance:
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

    series = _ensure_non_empty(df[column], column)

    kurtosis = float(series.kurt())

    tolerance = 1e-4
    if kurtosis > tolerance:
        interpretation = "leptokurtic"
    elif kurtosis < -tolerance:
        interpretation = "platykurtic"
    else:
        interpretation = "mesokurtic"

    return {
        "column": column,
        "kurtosis": round(kurtosis, 4),
        "interpretation": interpretation
    }

