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
      {/* 로고 및 사이트 주소 표시 */}
      <div className="flex items-center space-x-4 mb-4">
        <img src="/logo.png" alt="Dabin Logo" className="w-32 h-auto" />
        <div className="text-sm text-gray-600">www.dabinenc.com</div>
      </div>

      <h1 className="text-2xl font-bold mb-4">태양광 수익성 계산기</h1>
      <CalculatorForm onDataChange={handleDataChange} />
      <ProfitChart data={chartData} breakEvenYear={breakEvenYear} />
      <PDFButton />
    </main>
  );
}