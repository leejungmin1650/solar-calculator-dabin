
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PDFButton({ reportRef }) {
  const generatePDF = async () => {
    const input = reportRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 10, width, height);
    pdf.setFontSize(10);
    pdf.text("※ 본 수지분석표는 추정치를 기반으로 작성된 자료로, 실제 수익과 차이가 발생할 수 있습니다. 해당 자료는 참고용이며, 법적 효력이 없음을 안내드립니다.", 10, pdf.internal.pageSize.getHeight() - 10);
    pdf.save("태양광_수익분석_보고서.pdf");
  };
  return (
    <button onClick={generatePDF} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
      📄 PDF 다운로드
    </button>
  );
}
