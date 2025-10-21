import { useEffect, useState } from "react";
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";

interface CorrelationData {
  latex: string;
  x: number[];
  y: number[];
  correlation: number;
}

export default function CorrelationChart() {
  const [data, setData] = useState<CorrelationData>();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/correlation")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Carregando...</p>;

  const points = data.x.map((x, i) => ({ x, y: data.y[i] }));

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold mb-2">Correlação (r = {data.correlation})</h3>
      <ResponsiveContainer width="100%" height={250}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" name="X" />
          <YAxis dataKey="y" name="Y" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={points} fill="#6366f1" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}