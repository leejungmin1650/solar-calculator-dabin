import React, { useState } from 'react';
import { CalculatorForm } from '../components/CalculatorForm';
import { PDFButton } from '../components/PDFButton';
import { ProfitChart } from '../components/ProfitChart';

export default function Home() {
  const [chartData, setChartData] = useState([]);
  const [breakEvenYear, setBreakEvenYear] = useState(null);

  const handleDataChange = (data, breakEven) => {
    setChartData(data);
    setBreakEvenYear(breakEven);
  };

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">태양광 수익성 계산기</h1>
      <CalculatorForm onDataChange={handleDataChange} />
      <ProfitChart data={chartData} breakEvenYear={breakEvenYear} />
      <PDFButton />
    </main>
  );
}