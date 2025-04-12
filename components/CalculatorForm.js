import React, { useState } from 'react';

function calculatePMT(rate, nper, pv) {
  return (rate * pv) / (1 - Math.pow(1 + rate, -nper));
}

export function CalculatorForm() {
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

  const monthlyRate = (parseFloat(form.interest) || 0) / 100 / 12;
  const nper = (parseFloat(form.term) || 0) * 12;
  const pmt = calculatePMT(monthlyRate, nper, parseFloat(form.loan) || 0);
  const yearlyRepayment = Math.round(pmt * 12);

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

      <div className="mt-2 text-gray-700 font-semibold">
        연간 원리금 상환액: {yearlyRepayment.toLocaleString()} 원
      </div>
    </div>
  );
}