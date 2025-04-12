
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
const PDFButton = dynamic(() => import("../components/PDFButton"), { ssr: false });

export default function Home() {
  const reportRef = useRef();
  const [capacity, setCapacity] = useState(100);
  const [sunHours, setSunHours] = useState(3.5);
  const [smp, setSmp] = useState(140);
  const [rec, setRec] = useState(70);
  const [recWeight, setRecWeight] = useState(1.2);
  const [opex, setOpex] = useState(0);
  const [loan, setLoan] = useState(70000000);
  const [interest, setInterest] = useState(5.8);
  const [years, setYears] = useState(20);

  const energy = capacity * sunHours * 365;
  const smpIncome = energy * smp;
  const recIncome = energy * rec * recWeight;
  const totalIncome = smpIncome + recIncome;

  const i = interest / 100 / 12;
  const n = years * 12;
  const monthlyPayment = i === 0 ? loan / n : loan * i * Math.pow(1 + i, n) / (Math.pow(1 + i, n) - 1);
  const annualPayment = monthlyPayment * 12;
  const netIncome = totalIncome - opex - annualPayment;
  const payback = (totalIncome - opex - annualPayment > 0) ? (loan / netIncome).toFixed(2) : "-";

  const format = num => num.toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <div className="p-4 max-w-3xl mx-auto" ref={reportRef}>
      <h1 className="text-2xl font-bold mb-4">태양광 수익성 계산기 + 대출/그래프</h1>
      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
        <label>설치용량 (kW)<input type="number" value={capacity} onChange={e => setCapacity(+e.target.value)} /></label>
        <label>발전시간 (h/day)<input type="number" step="0.1" value={sunHours} onChange={e => setSunHours(+e.target.value)} /></label>
        <label>SMP 단가<input type="number" value={smp} onChange={e => setSmp(+e.target.value)} /></label>
        <label>REC 단가<input type="number" value={rec} onChange={e => setRec(+e.target.value)} /></label>
        <label>REC 가중치<input type="number" value={recWeight} onChange={e => setRecWeight(+e.target.value)} /></label>
        <label>운영비<input type="number" value={opex} onChange={e => setOpex(+e.target.value)} /></label>
        <label>대출금<input type="number" value={loan} onChange={e => setLoan(+e.target.value)} /></label>
        <label>이자율 (%)<input type="number" value={interest} step="0.1" onChange={e => setInterest(+e.target.value)} /></label>
        <label>상환기간 (년)<input type="number" value={years} onChange={e => setYears(+e.target.value)} /></label>
      </div>

      <p>예상 발전량: <b>{format(energy)}</b> kWh</p>
      <p>총 수익: <b>{format(totalIncome)}</b> 원</p>
      <p>운영비: <b>{format(opex)}</b> 원</p>
      <p>연간 원리금 상환: <b>{format(annualPayment)}</b> 원</p>
      <p>순수익: <b>{format(netIncome)}</b> 원</p>
      <p>회수기간 (자기자본 기준): <b>{payback}</b> 년</p>

      <PDFButton reportRef={reportRef} />
    </div>
  );
}
