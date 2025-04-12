
import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine
} from "recharts";

export default function Home() {
  const [capacity, setCapacity] = useState("");
  const [sunHours, setSunHours] = useState("");
  const [smp, setSmp] = useState("");
  const [rec, setRec] = useState("");
  const [recWeight, setRecWeight] = useState("");
  const [opex, setOpex] = useState("");
  const [capex, setCapex] = useState("");
  const [loan, setLoan] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");

  
  const parse = (v) => isNaN(parseFloat((v || '').toString().replace(/,/g, ''))) ? 0 : parseFloat((v || '').toString().replace(/,/g, ''));
  const parsed = {

    capacity: parse(capacity),
    sunHours: parse(sunHours),
    smp: parse(smp),
    rec: parse(rec),
    recWeight: parse(recWeight),
    opex: parse(opex),
    capex: parse(capex),
    loan: parse(loan),
    rate: parse(rate),
    years: parse(years),
  };

  const generation = parsed.capacity * parsed.sunHours * 365;
  const smpProfit = generation * parsed.smp;
  const recProfit = generation * parsed.rec * parsed.recWeight;
  const totalProfit = smpProfit + recProfit;
  
  const r = parsed.rate / 100;
  const n = parsed.years;
  const annualRepayment = r > 0
    ? parsed.loan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    : parsed.loan / n;

  const netProfit = totalProfit - parsed.opex - annualRepayment;
  const selfCapital = parsed.capex - parsed.loan;
  const payback = selfCapital / netProfit;

  const yearly = Array.from({ length: parsed.years }, (_, i) => ({
    name: `${i + 1}년`,
    순수익: netProfit,
    누적수익: netProfit * (i + 1),
  }));

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <img src="/logo.png" alt="DABIN" className="h-10" />
        <a href="http://www.dabinenc.com" target="_blank" className="text-blue-600 underline">www.dabinenc.com</a>
      </div>

      <h1 className="text-2xl font-bold mb-4">태양광 수익성 계산기 + 대출/그래프</h1>
      <div className="grid grid-cols-1 gap-2 mb-4">
        <label>설치용량 (kW)<input value={capacity} onChange={e => setCapacity(e.target.value)} className="border p-1 w-full" /></label>
        <label>발전시간 (h/day)<input value={sunHours} onChange={e => setSunHours(e.target.value)} className="border p-1 w-full" /></label>
        <label>SMP 단가 (원)<input value={smp} onChange={e => setSmp(e.target.value)} className="border p-1 w-full" /></label>
        <label>REC 단가 (원)<input value={rec} onChange={e => setRec(e.target.value)} className="border p-1 w-full" /></label>
        <label>REC 가중치<input value={recWeight} onChange={e => setRecWeight(e.target.value)} className="border p-1 w-full" /></label>
        <label>운영비 (원)<input value={opex} onChange={e => setOpex(e.target.value)} className="border p-1 w-full" /></label>
        <label>자기자본 (원)<input value={capex} onChange={e => setCapex(e.target.value)} className="border p-1 w-full" /></label>
        <label>대출금 (원)<input value={loan} onChange={e => setLoan(e.target.value)} className="border p-1 w-full" /></label>
        <label>이자율 (%)<input value={rate} onChange={e => setRate(e.target.value)} className="border p-1 w-full" /></label>
        <label>상환기간 (년)<input value={years} onChange={e => setYears(e.target.value)} className="border p-1 w-full" /></label>
      </div>

      <p>예상 발전량: {isNaN(generation) ? '-' : generation.toLocaleString(undefined, {maximumFractionDigits: 2})} kWh</p>
      <p>총 수익: {isNaN(totalProfit) ? '-' : totalProfit.toLocaleString(undefined, {maximumFractionDigits: 2})} 원</p>
      <p>운영비: {isNaN(parsed.opex) ? '-' : parsed.opex.toLocaleString(undefined, {maximumFractionDigits: 2})} 원</p>
      <p>연간 원리금 상환: {isNaN(annualRepayment) ? '-' : annualRepayment.toLocaleString(undefined, {maximumFractionDigits: 2})} 원</p>
      <p>순수익: {isNaN(netProfit) ? '-' : netProfit.toLocaleString(undefined, {maximumFractionDigits: 2})} 원</p>
      <p>회수기간: {isNaN(payback) ? '-' : payback.toFixed(2)} 년</p>

      <h2 className="mt-6 font-bold">📈 연간 순수익 및 누적 수익</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={yearly}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`} />
          <Tooltip formatter={(v) => v.toLocaleString()} />
          <Line type="monotone" dataKey="순수익" stroke="#00b894" strokeWidth={2} dot />
          <Line type="monotone" dataKey="누적수익" stroke="#0984e3" strokeWidth={2} dot />
          <ReferenceLine y={selfCapital} stroke="red" strokeDasharray="5 3" label="자기자본" />
          <ReferenceLine x={`${Math.ceil(payback)}년`} stroke="gray" strokeDasharray="3 3" label="회수시점" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
