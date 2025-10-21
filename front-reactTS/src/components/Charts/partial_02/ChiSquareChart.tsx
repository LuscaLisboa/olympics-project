import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "katex/dist/katex.min.css";

interface ChiData {
  latex: string;
  x: number[];
  y: number[];
  df: number;
}

export default function ChiSquareChart({ df = 4 }: { df?: number }) {
  const [data, setData] = useState<ChiData>();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/chi_square?df=${df}`)
      .then((res) => res.json())
      .then(setData);
  }, [df]);

  if (!data) return <p>Carregando...</p>;

  const chartData = data.x.map((x, i) => ({ x, y: data.y[i] }));

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold mb-2">Distribuição Qui-Quadrado (df = {data.df})</h3>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="y" stroke="#8b5cf6" fill="#ddd6fe" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
