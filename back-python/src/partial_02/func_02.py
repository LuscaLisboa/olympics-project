from fastapi import HTTPException
from scipy.optimize import curve_fit
from sklearn.linear_model import LinearRegression
import numpy as np
from scipy.stats import norm, poisson, t, chi2


def central_limit_func(
    distribution: str,
    n_samples: int = 1000,
    sample_size: int = 30
):
    # gera população
    if distribution == "uniform":
        population = np.random.uniform(0, 10, 10000)
    else:
        population = np.random.exponential(scale=3, size=10000)

    sample_means = [np.mean(np.random.choice(population, sample_size)) for _ in range(n_samples)]

    result = {
        "population": population.tolist(),
        "sample_means": sample_means,
        "population_mean": float(np.mean(population)),
        "population_std": float(np.std(population)),
        "sample_mean_mean": float(np.mean(sample_means)),
        "sample_mean_std": float(np.std(sample_means))
    }
    return result


def correlation_func():
    np.random.seed(42)
    x = np.random.normal(50, 10, 100)
    y = 2 * x + np.random.normal(0, 10, 100)

    corr_matrix = np.corrcoef(x, y)
    corr_value = float(corr_matrix[0, 1])

    return {
        "correlation": round(corr_value, 4),
        "interpretation": (
            "positive" if corr_value > 0.7 else
            "negative" if corr_value < -0.3 else
            "moderate"
        ),
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

    x = data[[x_col]].values
    y = data[y_col].values

    model = LinearRegression()
    model.fit(x, y)

    y_pred = model.predict(x)

    slope = model.coef_[0]
    intercept = model.intercept_
    r2 = model.score(x, y)

    latex_formula = rf"y = {round(slope, 3)}x + {round(intercept, 3)}"

    return {
        "x": x.flatten().tolist(),
        "y_real": y.tolist(),
        "y_pred": y_pred.tolist(),
        "slope": slope,
        "intercept": intercept,
        "r2": r2,
        "latex": latex_formula
    }


def exp_func(x, a, b):
    return a * np.exp(b * x)


def non_linear_regression_func(df, x_col, y_col):
    if x_col not in df.columns or y_col not in df.columns:
        raise HTTPException(status_code=400, detail="Colunas inválidas")

    data = df[[x_col, y_col]].dropna()
    x = data[x_col].values
    y = data[y_col].values

    try:
        popt, _ = curve_fit(exp_func, x, y, maxfev=10000)
        a, b = popt
    except RuntimeError:
        raise HTTPException(status_code=500, detail="Falha ao ajustar a curva")

    y_pred = exp_func(x, a, b)

    latex_formula = rf"y = {round(a, 3)} e^{{{round(b, 3)}x}}"

    return {
        "x": x.tolist(),
        "y_real": y.tolist(),
        "y_pred": y_pred.tolist(),
        "a": a,
        "b": b,
        "latex": latex_formula
    }
