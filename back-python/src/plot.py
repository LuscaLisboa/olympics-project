
import pandas as pd

from partial_01.plot_01 import *

# Data Import
df = pd.read_csv("athlete_events.csv")

numericals = ["Age", "Height", "Weight"]
df_num = df[numericals].dropna()

# Plot
plot_histogram(df, "Age")
plot_percentiles(df, "Height")
plot_dispersion(df, "Weight")
plot_distribution(df, "Age")
plot_correlation(df[["Age", "Height", "Weight"]])
