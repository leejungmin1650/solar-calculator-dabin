import React from 'react';
import { CalculatorForm } from '../components/CalculatorForm';

export default function Home() {
  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">태양광 수익성 계산기</h1>
      <CalculatorForm />
    </main>
  );
}