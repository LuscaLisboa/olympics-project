import { useState, useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface RegressionData {
  x: number[];
  y_real: number[];
  y_pred: number[];
  slope?: number;
  intercept?: number;
  r2?: number;
  latex?: string;
  a?: number;
  b?: number;
}

interface RegressionChartProps {
  title?: string;
  isNonLinear?: boolean;
}

const isValidNumber = (num: any): boolean =>
  typeof num === "number" && isFinite(num) && !isNaN(num);

// 🔹 Função helper para limitar o número de pontos
const limitDataPoints = <T,>(data: T[], maxPoints: number): T[] => {
  if (data.length <= maxPoints) return data;
  const step = Math.ceil(data.length / maxPoints);
  return data.filter((_, i) => i % step === 0);
};

export default function RegressionChart({
  title = "Análise de Regressão",
  isNonLinear = false,
}: RegressionChartProps) {
  const [data, setData] = useState<RegressionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const MAX_POINTS = 2000; // Limite máximo de pontos no gráfico

  useEffect(() => {
    const endpoint = isNonLinear
      ? "nonlinear_regression"
      : "linear_regression";

    setLoading(true);
    setError(null);

    fetch(`http://127.0.0.1:8000/${endpoint}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((fetchedData) => {
        if (!fetchedData.x || !fetchedData.y_real || !fetchedData.y_pred) {
          throw new Error("Estrutura de dados inválida");
        }

        interface RegressionPoint {
          x: number;
          y_real: number;
          y_pred: number;
        }

        const validPoints: RegressionPoint[] = fetchedData.x
          .map((x: number, i: number): RegressionPoint => ({
            x,
            y_real: fetchedData.y_real[i],
            y_pred: fetchedData.y_pred[i],
          }))
          .filter(
            (p: RegressionPoint) =>
              isValidNumber(p.x) &&
              isValidNumber(p.y_real) &&
              isValidNumber(p.y_pred)
          );

        // 🔹 Reduzir número de pontos
        const limitedPoints = limitDataPoints(validPoints, MAX_POINTS);

        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        renderChart(limitedPoints, fetchedData);
        setData(fetchedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro:", err);
        setError(err.message);
        setLoading(false);
      });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [isNonLinear]);

  const renderChart = (points: any[], fetchedData: RegressionData) => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const sortedPoints = [...points].sort((a, b) => a.x - b.x);

    chartInstanceRef.current = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Dados Reais (amostrados)",
            data: sortedPoints.map((p) => ({ x: p.x, y: p.y_real })),
            backgroundColor: "#10b981",
            pointRadius: 2,
          },
          {
            label: "Predição",
            data: sortedPoints.map((p) => ({ x: p.x, y: p.y_pred })),
            borderColor: "#6366f1",
            borderWidth: 2,
            showLine: true,
            fill: false,
            pointRadius: 0,
            tension: 0.15,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "#e2e8f0",
            },
          },
          tooltip: {
            backgroundColor: "#1e293b",
            titleColor: "#f1f5f9",
            bodyColor: "#f1f5f9",
          },
        },
        scales: {
          x: {
            type: "linear",
            title: {
              display: true,
              text: "X",
              color: "#e2e8f0",
            },
            ticks: {
              color: "#cbd5e1",
            },
            grid: {
              color: "rgba(148, 163, 184, 0.2)",
            },
          },
          y: {
            title: {
              display: true,
              text: "Y",
              color: "#e2e8f0",
            },
            ticks: {
              color: "#cbd5e1",
            },
            grid: {
              color: "rgba(148, 163, 184, 0.2)",
            },
          },
        },
      },
    });
  };

  return (
    <div className="p-6 bg-slate-900 rounded-xl shadow-lg flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-white">{title}</h2>

      {loading && (
        <div className="h-80 flex items-center justify-center text-slate-400">
          Carregando...
        </div>
      )}

      {error && (
        <div className="h-80 flex items-center justify-center text-red-400">
          Erro: {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="bg-slate-800 p-4 rounded-lg h-96">
            <canvas ref={chartRef}></canvas>
          </div>

          {data && (
            <div className="grid grid-cols-3 gap-4 text-slate-200 text-sm">
              {isNonLinear ? (
                <>
                  <div>a = {data.a?.toFixed(3)}</div>
                  <div>b = {data.b?.toFixed(3)}</div>
                </>
              ) : (
                <>
                  <div>Inclinação = {data.slope?.toFixed(3)}</div>
                  <div>Intercepto = {data.intercept?.toFixed(3)}</div>
                  <div>R² = {data.r2?.toFixed(3)}</div>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
