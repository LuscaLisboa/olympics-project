import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function CentralLimitChart() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/central_limit?distribution=uniform")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Carregando...</p>;

  const populationData = data.population.map((v: number) => ({ value: v }));
  const sampleMeansData = data.sample_means.map((v: number) => ({ value: v }));

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* População Original */}
        <div className="bg-white rounded-xl p-2 shadow">
          <h3 className="text-lg font-semibold mb-2">Distribuição Populacional</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={populationData} margin={{ top: 0, right: 0, left: -57, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="value" tick={false} />
              <YAxis tick={false} />
              <Tooltip />
              <Area dataKey="value" stroke="#6366f1" fill="#c7d2fe" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Médias Amostrais */}
        <div className="bg-white rounded-xl p-2 shadow">
          <h3 className="text-lg font-semibold mb-2">Distribuição das Médias Amostrais</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={sampleMeansData} margin={{ top: 0, right: 0, left: -57, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="value" tick={false} />
              <YAxis tick={false} />
              <Tooltip />
              <Area dataKey="value" stroke="#10b981" fill="#a7f3d0" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}