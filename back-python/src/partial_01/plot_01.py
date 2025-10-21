import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns


def plot_histogram(df, column, bins=10):
    plt.figure(figsize=(8, 5))
    plt.hist(df[column].dropna(), bins=bins, edgecolor='black')
    plt.title(f'Histograma de {column}')
    plt.xlabel(column)
    plt.ylabel('Frequência')
    plt.grid(True, linestyle='--', alpha=0.5)
    plt.show()


def plot_percentiles(df, column):
    series = df[column].dropna()
    percentiles = [0, 10, 25, 50, 75, 90, 95, 99, 100]
    values = np.percentile(series, percentiles)

    plt.figure(figsize=(8, 5))
    plt.plot(percentiles, values, marker='o')
    plt.title(f'Percentis de {column}')
    plt.xlabel('Percentil (%)')
    plt.ylabel(column)
    plt.grid(True, linestyle='--', alpha=0.5)
    plt.show()


def plot_dispersion(df, column):
    plt.figure(figsize=(5, 6))
    plt.boxplot(df[column].dropna(), vert=True, patch_artist=True)
    plt.title(f'Dispersão de {column}')
    plt.ylabel(column)
    plt.grid(True, linestyle='--', alpha=0.5)
    plt.show()


def plot_distribution(df, column):
    plt.figure(figsize=(8, 5))
    sns.histplot(df[column].dropna(), kde=True, bins=20)
    plt.title(f'Distribuição de {column}')
    plt.xlabel(column)
    plt.ylabel('Frequência')
    plt.grid(True, linestyle='--', alpha=0.5)
    plt.show()


def plot_correlation(df):
    corr = df.corr(method='pearson')
    plt.figure(figsize=(6, 5))
    sns.heatmap(corr, annot=True, cmap='coolwarm', fmt=".2f")
    plt.title('Matriz de Correlação')
    plt.show()
