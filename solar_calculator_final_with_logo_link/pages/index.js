
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

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

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <img src="/logo.png" alt="DABIN" className="h-10" />
        <a href="http://www.dabinenc.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          www.dabinenc.com
        </a>
      </div>
      <h1 className="text-2xl font-bold mb-4">태양광 수익 계산기</h1>
      <div className="grid grid-cols-1 gap-3 mb-6">
        <label>설치용량 (kW)<input value={capacity} onChange={(e) => setCapacity(e.target.value)} className="border p-1 w-full" /></label>
        <label>발전시간 (h/day)<input value={sunHours} onChange={(e) => setSunHours(e.target.value)} className="border p-1 w-full" /></label>
        <label>SMP 단가 (원)<input value={smp} onChange={(e) => setSmp(e.target.value)} className="border p-1 w-full" /></label>
        <label>REC 단가 (원)<input value={rec} onChange={(e) => setRec(e.target.value)} className="border p-1 w-full" /></label>
        <label>REC 가중치<input value={recWeight} onChange={(e) => setRecWeight(e.target.value)} className="border p-1 w-full" /></label>
        <label>운영비 (원)<input value={opex} onChange={(e) => setOpex(e.target.value)} className="border p-1 w-full" /></label>
        <label>총 투자비 (원)<input value={capex} onChange={(e) => setCapex(e.target.value)} className="border p-1 w-full" /></label>
        <label>대출금 (원)<input value={loan} onChange={(e) => setLoan(e.target.value)} className="border p-1 w-full" /></label>
        <label>이자율 (%)<input value={rate} onChange={(e) => setRate(e.target.value)} className="border p-1 w-full" /></label>
        <label>상환기간 (년)<input value={years} onChange={(e) => setYears(e.target.value)} className="border p-1 w-full" /></label>
      </div>
    </div>
  );
}
