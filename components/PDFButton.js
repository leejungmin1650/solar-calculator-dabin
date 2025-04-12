import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function PDFButton() {
  const handleDownload = () => {
    const input = document.body;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();

      // 로고 이미지
      const logo = new Image();
      logo.src = '/logo.png';
      logo.onload = () => {
        pdf.addImage(logo, 'PNG', 10, 10, 50, 15); // 로고 삽입
        pdf.setFontSize(10);
        pdf.text('www.dabinenc.com', 10, 30); // 홈페이지 주소

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 35, pdfWidth, pdfHeight);
        pdf.save('solar-calculator-report.pdf');
      };
    });
  };

  return (
    <button onClick={handleDownload} className="mt-4 p-2 bg-blue-500 text-white rounded">
      PDF 다운로드
    </button>
  );
}