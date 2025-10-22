from fastapi import FastAPI
import pandas as pd
from starlette.middleware.cors import CORSMiddleware

from src.partial_01.func_01 import *
from src.partial_02.func_02 import *

app = FastAPI()

origins = [
    "http://localhost:5173",
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Import
df = pd.read_csv("src/athlete_events.csv")

numericals = ["Age", "Height", "Weight"]
df_num = df[numericals].dropna()


# --- Start of Partial01 ---

@app.get("/statistics")
def get_statistics():
    return statistics_func(numericals, df_num)


@app.get("/histogram")
def get_histogram(column: str = Query(..., regex="^(Age|Height|Weight)$"), bins: int = 10):
    return histogram_func(df, pd, column, bins)


@app.get("/percentile")
def get_percentile(column: str = Query(..., regex="^(Age|Height|Weight)$")):
    return percentile_func(df, np, column)


@app.get("/dispersion_measures")
def get_dispersion_mearures(column: str = Query(..., regex="^(Age|Height|Weight)$")):
    return dispersion_mearures_func(df, column)


@app.get("/asymmetry")
def get_asymmetry(column: str = Query(..., regex="^(Age|Height|Weight)$")):
    return asymmetry_func(df, column)


@app.get("/kurtosis")
def get_kurtosis(column: str = Query(..., regex="^(Age|Height|Weight)$")):
    return kurtosis_func(df, column)


# --- Start of Partial02 ---

@app.get("/central_limit")
def get_central_limit(
        distribution: str = Query("uniform", regex="^(uniform|exponential)$"),
        n_samples: int = 1000,
        sample_size: int = 30
):
    return central_limit_func(distribution, n_samples, sample_size)


@app.get("/correlation")
def get_correlation():
    return correlation_func()


@app.get("/sample")
def get_sample(distribution: str = Query("normal", regex="^(normal|poisson)$")):
    return sample_func(distribution)


@app.get("/t_student")
def get_t_student(d_f: int = Query(10, ge=1, le=100)):
    return t_student_func(d_f)


@app.get("/chi_square")
def get_chi_square(d_f: int = Query(4, ge=1, le=50)):
    return chi_square_func(d_f)


@app.get("/linear_regression")
def get_linear_regression(
    x_col: str = Query("Height", regex="^(Age|Height|Weight)$"),
    y_col: str = Query("Weight", regex="^(Age|Height|Weight)$")
):
    return linear_regression_func(df, x_col, y_col)


@app.get("/non_linear_regression")
def get_non_linear_regression(
    x_col: str = Query("Height", regex="^(Age|Height|Weight)$"),
    y_col: str = Query("Weight", regex="^(Age|Height|Weight)$")
):
    return non_linear_regression_func(df, x_col, y_col)
