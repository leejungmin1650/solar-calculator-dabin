import React, { useState } from 'react';
import { CalculatorForm } from '../components/CalculatorForm';
import { PDFButton } from '../components/PDFButton';
import { ProfitChart } from '../components/ProfitChart';

export default function Home() {
  const [chartData, setChartData] = useState([]);
  const [breakEvenYear, setBreakEvenYear] = useState(null);

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">태양광 수익성 계산기</h1>
      <CalculatorForm onDataChange={(data, breakEven) => {
        setChartData(data);
        setBreakEvenYear(breakEven);
      }} />
      <ProfitChart data={chartData} breakEvenYear={breakEvenYear} />
      <PDFButton />
    </main>
  );
}