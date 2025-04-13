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
    <main className="max-w-4xl mx-auto px-6 py-8">
      <header className="flex items-center justify-between mb-6">
        <img src="/logo.png" alt="Dabin Logo" className="h-10 drop-shadow-md" />
        <a href="http://www.dabinenc.com" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 underline hover:text-blue-800 transition">
          www.dabinenc.com
        </a>
      </header>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">태양광 수익성 계산기</h1>

      <section className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <CalculatorForm onDataChange={handleDataChange} />
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-gray-700">결과 요약</h2>
      </section>

      <section className="mt-10">
        <ProfitChart data={chartData} breakEvenYear={breakEvenYear} />
      </section>

      <div className="flex justify-center mt-8">
        <PDFButton />
      </div>

      <footer className="mt-10 text-xs text-gray-500 text-center border-t pt-4 leading-relaxed">
        ※ 본 수지분석표는 추정치를 기반으로 작성된 자료로,<br />
        실제 수익과 차이가 발생할 수 있습니다. 해당 자료는 참고용이며, 법적 효력이 없음을 안내드립니다.
      </footer>
    </main>
  );
}