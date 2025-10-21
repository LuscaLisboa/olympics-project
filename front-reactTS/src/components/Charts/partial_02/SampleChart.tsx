import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import "katex/dist/katex.min.css";

interface SampleData {
  latex: string;
  x: number[];
  y: number[];
  distribution: "normal" | "poisson";
}

export default function SampleChart({ type = "normal" }: { type?: "normal" | "poisson" }) {
  const [data, setData] = useState<SampleData>();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/sample?distribution=${type}`)
      .then((res) => res.json())
      .then(setData);
  }, [type]);

  if (!data) return <p>Carregando...</p>;

  const chartData = data.x.map((x, i) => ({ x, y: data.y[i] }));

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold mb-2 capitalize">Distribuição {type === "normal" ? "Normal" : "de Poisson"}</h3>

      <ResponsiveContainer width="100%" height={250}>
        {type === "normal" ? (
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="y" stroke="#10b981" fill="#a7f3d0" />
          </AreaChart>
        ) : (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="y" fill="#f59e0b" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
