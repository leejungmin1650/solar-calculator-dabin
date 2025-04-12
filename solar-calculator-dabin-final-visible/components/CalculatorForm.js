import React, { useState, useEffect } from 'react';

function calculatePMT(rate, nper, pv) {
  return (rate * pv) / (1 - Math.pow(1 + rate, -nper));
}

export function CalculatorForm({ onDataChange }) {
  const [form, setForm] = useState({
    capacity: 100,
    hours: 3.5,
    smp: 140,
    rec: 70,
    weight: 1.5,
    operationCost: 0,
    equity: 70000000,
    loan: 150000000,
    interest: 5.8,
    term: 10,
    totalCost: 220000000
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const capacity = parseFloat(form.capacity) || 0;
  const hours = parseFloat(form.hours) || 0;
  const smp = parseFloat(form.smp) || 0;
  const rec = parseFloat(form.rec) || 0;
  const weight = parseFloat(form.weight) || 0;
  const operationCost = parseFloat(form.operationCost) || 0;
  const equity = parseFloat(form.equity) || 0;
  const loan = parseFloat(form.loan) || 0;
  const interest = parseFloat(form.interest) || 0;
  const term = parseFloat(form.term) || 0;
  const totalCost = parseFloat(form.totalCost) || 0;

  const yearlyGen = capacity * 365 * hours;
  const revenue = yearlyGen * (smp + rec * weight);
  const monthlyRate = interest / 100 / 12;
  const nper = term * 12;
  const pmt = calculatePMT(monthlyRate, nper, loan);
  const yearlyRepayment = Math.round(pmt * 12);
  const netProfit = revenue - operationCost - yearlyRepayment;
  const payback = netProfit > 0 ? Math.ceil(equity / netProfit) : '-';

  useEffect(() => {
    // 수익 그래프용 데이터 전달
    const data = [];
    let cumulative = 0;
    let breakEvenYear = null;
    for (let y = 1; y <= 20; y++) {
      const yearly = netProfit;
      cumulative += yearly;
      data.push({ year: y, netProfit: yearly, cumulativeProfit: cumulative });
      if (breakEvenYear === null && cumulative >= equity) {
        breakEvenYear = y;
      }
    }
    onDataChange?.(data, breakEvenYear);
  }, [form]);

  return (
    <div className="grid grid-cols-1 gap-4">
      <label>설치용량 (kW)
        <input name="capacity" value={form.capacity} onChange={handleChange} className="border p-2 w-full" />
      </label>
      <label>일일 발전시간 (h)
        <input name="hours" value={form.hours} onChange={handleChange} className="border p-2 w-full" />
      </label>
      <label>SMP 단가 (원/kWh)
        <input name="smp" value={form.smp} onChange={handleChange} className="border p-2 w-full" />
      </label>
      <label>REC 단가 (원/kWh)
        <input name="rec" value={form.rec} onChange={handleChange} className="border p-2 w-full" />
      </label>
      <label>REC 가중치
        <input name="weight" value={form.weight} onChange={handleChange} className="border p-2 w-full" />
      </label>
      <label>운영비용 (연간, 원)
        <input name="operationCost" value={form.operationCost} onChange={handleChange} className="border p-2 w-full" />
      </label>
      <label>자기자본 (원)
        <input name="equity" value={form.equity} onChange={handleChange} className="border p-2 w-full" />
      </label>
      <label>대출금 (원)
        <input name="loan" value={form.loan} onChange={handleChange} className="border p-2 w-full" />
      </label>
      <label>이자율 (%)
        <input name="interest" value={form.interest} onChange={handleChange} className="border p-2 w-full" />
      </label>
      <label>상환기간 (년)
        <input name="term" value={form.term} onChange={handleChange} className="border p-2 w-full" />
      </label>
      <label>총투자비 (원)
        <input name="totalCost" value={form.totalCost} onChange={handleChange} className="border p-2 w-full" />
      </label>

      <div className="mt-2 text-gray-700 font-semibold space-y-1">
        <div>예상 발전량: {yearlyGen.toLocaleString()} kWh</div>
        <div>총 수익: {revenue.toLocaleString()} 원</div>
        <div>운영비: {operationCost.toLocaleString()} 원</div>
        <div>연간 원리금 상환: {isNaN(yearlyRepayment) ? '-' : yearlyRepayment.toLocaleString()} 원</div>
        <div>순수익: {isNaN(netProfit) ? '-' : netProfit.toLocaleString()} 원</div>
        <div>회수기간 (자기자본 기준): {typeof payback === 'number' ? `${payback} 년` : '-'} </div>
      </div>
    </div>
  );
}