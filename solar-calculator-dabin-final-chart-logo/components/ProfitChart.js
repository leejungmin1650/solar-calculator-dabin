import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';

export function ProfitChart({ data, breakEvenYear }) {
  return (
    <div className="mt-10">
      <h2 className="text-lg font-bold mb-2">연간 수익 및 손익분기점</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="year" />
          <YAxis tickFormatter={(tick) => `${tick / 1000000}M`} />
          <Tooltip formatter={(value) => `${value.toLocaleString()} 원`} />
          <Line type="monotone" dataKey="netProfit" name="연간 순이익" stroke="#82ca9d" />
          <Line type="monotone" dataKey="cumulativeProfit" name="누적 수익" stroke="#8884d8" />
          <ReferenceLine x={breakEvenYear} label="손익분기점" stroke="red" strokeDasharray="3 3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}