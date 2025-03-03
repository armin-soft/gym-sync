import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Student } from '@/types/student';

const FONT_SIZE = 12;
const LINE_HEIGHT = 1.15;
const MARGIN = 10;
const ROW_HEIGHT = 12;

const doc = new jsPDF({
  orientation: 'p',
  unit: 'mm',
  format: 'a4'
});

const pageWidth = doc.internal.pageSize.getWidth();
const pageHeight = doc.internal.pageSize.getHeight();

const exportPDF = async (student: Student) => {
  doc.setFontSize(FONT_SIZE);
  doc.setFont('IRANSans', 'normal');

  // Add header
  const headerText = 'مشخصات فردی شاگرد';
  const headerWidth = doc.getTextWidth(headerText);
  const headerX = (pageWidth - headerWidth) / 2;
  doc.text(headerText, headerX, MARGIN + 10);

  // Add student info
  let currentY = MARGIN + 20;
  const lineHeight = 7;

  const addInfoLine = (label: string, value: string) => {
    doc.setFontSize(10);
    doc.setFont('IRANSans', 'bold');
    const labelText = `${label}: `;
    const labelWidth = doc.getTextWidth(labelText);
    doc.text(labelText, pageWidth - MARGIN - labelWidth, currentY);

    doc.setFont('IRANSans', 'normal');
    const valueText = value;
    doc.text(valueText, pageWidth - MARGIN - labelWidth - doc.getTextWidth(valueText), currentY);

    currentY += lineHeight;
  };

  addInfoLine('نام و نام خانوادگی', student.name || 'وارد نشده');
  addInfoLine('شماره تلفن', student.phone || 'وارد نشده');
  addInfoLine('قد', student.height ? `${student.height} cm` : 'وارد نشده');
  addInfoLine('وزن', student.weight ? `${student.weight} kg` : 'وارد نشده');
  addInfoLine('مبلغ برنامه', student.payment ? `${student.payment} تومان` : 'وارد نشده');

  // Add exercises table
  currentY += 10;
  doc.setFontSize(FONT_SIZE);
  doc.setFont('IRANSans', 'normal');
  const exercisesHeaderText = 'برنامه تمرینی';
  const exercisesHeaderWidth = doc.getTextWidth(exercisesHeaderText);
  const exercisesHeaderX = (pageWidth - exercisesHeaderWidth) / 2;
  doc.text(exercisesHeaderText, exercisesHeaderX, currentY);

  currentY += 10;

  // Fix setGlobalAlpha issues by using setFillColor with RGBA values
  doc.setFillColor(255, 255, 255, 0.5); // Instead of setGlobalAlpha

  // Fix autoTable type issues by properly extending jsPDF type
  (doc as any).autoTable({
    head: [['نام تمرین', 'توضیحات']],
    body: student.exercises.map(exercise => [exercise.name, exercise.description || '']),
    startY: currentY,
    margin: { left: MARGIN, right: MARGIN },
    useCss: true,
    styles: {
      font: 'IRANSans',
      fontSize: 9,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      lineWidth: 0.2,
      cellPadding: 4,
      overflow: 'linebreak',
      halign: 'right',
      valign: 'middle',
      fontStyle: 'normal'
    },
    headStyles: {
      fillColor: [220, 220, 220],
      textColor: [0, 0, 0],
      fontStyle: 'bold',
      halign: 'center'
    },
    didParseCell: function(data: any) {
      if (data.section === 'head') {
        data.cell.styles.font = 'IRANSans';
      }
    }
  });

  // Save the PDF
  doc.save(`${student.name}.pdf`);
};

export default exportPDF;
