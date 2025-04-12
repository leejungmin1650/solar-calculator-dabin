import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function PDFButton() {
  const handleDownload = () => {
    const input = document.body;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();

      const logo = new Image();
      logo.src = '/logo.png';
      logo.onload = () => {
        pdf.addImage(logo, 'PNG', 10, 10, 50, 15);
        pdf.setFontSize(10);
        pdf.text('www.dabinenc.com', 10, 30);

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        const marginTop = 35;

        pdf.addImage(imgData, 'PNG', 0, marginTop, pdfWidth, pdfHeight);

        const pageHeight = pdf.internal.pageSize.getHeight();
        pdf.setFontSize(9);
        pdf.text(
          "※ 본 수지분석표는 추정치를 기반으로 작성된 자료로,",
          10,
          pageHeight - 20
        );
        pdf.text(
          "실제 수익과 차이가 발생할 수 있습니다. 해당 자료는 참고용이며, 법적 효력이 없음을 안내드립니다.",
          10,
          pageHeight - 15
        );

        pdf.save('solar-calculator-report.pdf');
      };
    });
  };

  return (
    <button onClick={handleDownload} className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition">
      PDF 다운로드
    </button>
  );
}