from typing import Optional, Tuple, List, Dict
from fastapi import HTTPException
from scipy.optimize import curve_fit
from sklearn.linear_model import LinearRegression
from scipy.stats import norm, poisson, t, chi2
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

import numpy as np


def central_limit_func(
    distribution: str,
    n_samples: int = 1000,
    sample_size: int = 30
):
    if n_samples <= 0 or sample_size <= 0:
        raise HTTPException(status_code=400, detail="Parâmetros de amostragem inválidos")

    population_size = 10_000

    # gera população
    if distribution == "uniform":
        population = np.random.uniform(0, 10, population_size)
    else:
        population = np.random.exponential(scale=3, size=population_size)

    sample_means = [
        float(np.mean(np.random.choice(population, sample_size)))
        for _ in range(n_samples)
    ]

    result = {
        "population": population.tolist(),
        "sample_means": sample_means,
        "population_mean": float(np.mean(population)),
        "population_std": float(np.std(population, ddof=1)),
        "sample_mean_mean": float(np.mean(sample_means)),
        "sample_mean_std": float(np.std(sample_means, ddof=1))
    }
    return result


def correlation_func():
    np.random.seed(42)
    x = np.random.normal(50, 10, 100)
    y = 2 * x + np.random.normal(0, 10, 100)

    corr_matrix = np.corrcoef(x, y)
    corr_value = float(corr_matrix[0, 1])

    if corr_value >= 0.7:
        interpretation = "forte positiva"
    elif corr_value >= 0.3:
        interpretation = "moderada positiva"
    elif corr_value <= -0.7:
        interpretation = "forte negativa"
    elif corr_value <= -0.3:
        interpretation = "moderada negativa"
    else:
        interpretation = "fraca ou inexistente"

    return {
        "correlation": round(corr_value, 4),
        "interpretation": interpretation,
        "x": x.tolist(),
        "y": y.tolist()
    }


def sample_func(distribution):
    x = np.linspace(-5, 5, 300)
    if distribution == "normal":
        y = norm.pdf(x, 0, 1)
        description = "Normal Distribution (Gauss Curve)"
    else:
        x = np.arange(0, 15)
        y = poisson.pmf(x, mu=4)
        description = "Poisson Distribution (λ=4)"

    return {
        "distribution": distribution,
        "x": x.tolist(),
        "y": y.tolist(),
        "description": description
    }


def t_student_func(df):
    x = np.linspace(-5, 5, 300)
    y = t.pdf(x, df)

    return {
        "df": df,
        "x": x.tolist(),
        "y": y.tolist(),
        "description": f"t_Student distribution with {df} degrees of freedom"
    }


def chi_square_func(df):
    x = np.linspace(0, 20, 300)
    y = chi2.pdf(x, df)

    return {
        "df": df,
        "x": x.tolist(),
        "y": y.tolist(),
        "description": f"Chi-square distribution with {df} degrees of freedom"
    }


def linear_regression_func(df, x_col, y_col):
    if x_col not in df.columns or y_col not in df.columns:
        raise HTTPException(status_code=400, detail="Colunas inválidas")

    data = df[[x_col, y_col]].dropna()

    if data.empty:
        raise HTTPException(status_code=400, detail="Não há dados suficientes para regressão")

    x = data[[x_col]].values
    y = data[y_col].values

    model = LinearRegression()
    model.fit(x, y)

    y_pred = model.predict(x)

    slope = float(model.coef_[0])
    intercept = float(model.intercept_)
    r2 = float(model.score(x, y))

    return {
        "x": x.flatten().tolist(),
        "y_real": y.tolist(),
        "y_pred": y_pred.tolist(),
        "slope": slope,
        "intercept": intercept,
        "r2": r2,
    }


def exp_func(x, a, b):
    return a * np.exp(b * x)


def _evaluate_non_linear_method(
    x: np.ndarray,
    y: np.ndarray,
    method: str,
    bounds: Optional[Tuple[float, float]] = None,
    p0: Optional[List[float]] = None,
) -> Optional[Dict[str, float]]:
    try:
        if bounds is not None:
            params, _ = curve_fit(
                exp_func,
                x,
                y,
                maxfev=10000,
                method=method,
                bounds=bounds,
                p0=p0,
            )
        else:
            params, _ = curve_fit(
                exp_func,
                x,
                y,
                maxfev=10000,
                method=method,
                p0=p0,
            )
    except (RuntimeError, ValueError):
        return None

    a, b = params
    y_pred = exp_func(x, a, b)

    mse = mean_squared_error(y, y_pred)
    rmse = float(np.sqrt(mse))
    mae = float(mean_absolute_error(y, y_pred))
    r2 = float(r2_score(y, y_pred))

    return {
        "method": method,
        "a": float(a),
        "b": float(b),
        "rmse": rmse,
        "mae": mae,
        "r2": r2,
        "y_pred": y_pred.tolist(),
    }


def non_linear_regression_func(df, x_col, y_col):
    if x_col not in df.columns or y_col not in df.columns:
        raise HTTPException(status_code=400, detail="Colunas inválidas")

    data = df[[x_col, y_col]].dropna()

    if data.empty:
        raise HTTPException(status_code=400, detail="Não há dados suficientes para regressão")

    if len(data) > 5000:
        data = data.sample(5000, random_state=42)

    x = data[x_col].values
    y = data[y_col].values

    initial_guess = [max(y.min(), 1.0), 0.01]

    methods_to_try = [
        ("lm", None),
        ("trf", (0, np.inf)),
        ("dogbox", (0, np.inf)),
    ]

    evaluations: List[Dict[str, float]] = []

    for method, bounds in methods_to_try:
        result = _evaluate_non_linear_method(
            x,
            y,
            method=method,
            bounds=bounds,
            p0=initial_guess,
        )
        if result:
            evaluations.append(result)

    if not evaluations:
        raise HTTPException(status_code=500, detail="Falha ao ajustar a curva com os métodos testados")

    best_result = min(evaluations, key=lambda r: r["rmse"])

    comparisons = [
        {
            "method": eval_result["method"],
            "a": eval_result["a"],
            "b": eval_result["b"],
            "rmse": eval_result["rmse"],
            "mae": eval_result["mae"],
            "r2": eval_result["r2"],
        }
        for eval_result in sorted(evaluations, key=lambda r: r["rmse"])
    ]

    return {
        "x": x.tolist(),
        "y_real": y.tolist(),
        "y_pred": best_result["y_pred"],
        "a": best_result["a"],
        "b": best_result["b"],
        "best_method": best_result["method"],
        "method_comparisons": comparisons,
    }
