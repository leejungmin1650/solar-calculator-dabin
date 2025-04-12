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
    <main className="px-4 py-4 max-w-full w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 space-y-2 sm:space-y-0">
        <img src="/logo.png" alt="Dabin Logo" className="w-24 h-auto sm:w-32" />
        <a href="https://solar-calculator-dabin77-pzxf.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 underline">
          www.dabinenc.com
        </a>
      </div>

      <h1 className="text-2xl font-bold mb-4">태양광 수익성 계산기</h1>
      <CalculatorForm onDataChange={handleDataChange} />
      <ProfitChart data={chartData} breakEvenYear={breakEvenYear} />
      <PDFButton />

      <div className="mt-10 text-xs text-gray-500 border-t pt-4">
        ※ 본 수지분석표는 추정치를 기반으로 작성된 자료로,<br />
        실제 수익과 차이가 발생할 수 있습니다. 해당 자료는 참고용이며, 법적 효력이 없음을 안내드립니다.
      </div>
    </main>
  );
}