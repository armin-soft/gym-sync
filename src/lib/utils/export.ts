import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Student, Exercise, Meal, Supplement } from '@/components/students/StudentTypes';
import { TrainerProfile } from '@/types/trainer';

const FONT_SIZE = 12;
const LINE_HEIGHT = 1.15;
const MARGIN = 10;
const ROW_HEIGHT = 12;

// Create a PDF document
const createDoc = () => {
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4'
  });
  
  doc.setFontSize(FONT_SIZE);
  doc.setFont('IRANSans', 'normal');
  
  return doc;
};

// Function to create a single PDF for a student
export const generateStudentPDF = (
  student: Student, 
  exercises: Exercise[], 
  meals: Meal[], 
  supplements: Supplement[],
  trainerProfile: TrainerProfile
) => {
  const doc = createDoc();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Add header with gym and trainer info
  let currentY = MARGIN;
  doc.setFontSize(16);
  doc.setFont('IRANSans', 'bold');
  
  // Add gym name
  const gymText = trainerProfile.gymName || 'باشگاه';
  const gymWidth = doc.getTextWidth(gymText);
  const gymX = (pageWidth - gymWidth) / 2;
  doc.text(gymText, gymX, currentY + 10);
  
  currentY += 15;
  
  // Add trainer name
  if (trainerProfile.fullName) {
    doc.setFontSize(12);
    const trainerText = `مربی: ${trainerProfile.fullName}`;
    const trainerWidth = doc.getTextWidth(trainerText);
    const trainerX = (pageWidth - trainerWidth) / 2;
    doc.text(trainerText, trainerX, currentY);
    currentY += 10;
  }
  
  // Add dividing line
  doc.setDrawColor(100, 100, 100);
  doc.line(MARGIN, currentY, pageWidth - MARGIN, currentY);
  currentY += 10;

  // Add student info header
  doc.setFontSize(14);
  doc.setFont('IRANSans', 'bold');
  const headerText = 'مشخصات فردی شاگرد';
  const headerWidth = doc.getTextWidth(headerText);
  const headerX = (pageWidth - headerWidth) / 2;
  doc.text(headerText, headerX, currentY);
  currentY += 10;

  // Add student info
  const lineHeight = 7;
  doc.setFontSize(10);

  const addInfoLine = (label: string, value: string) => {
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
  
  if (student.exercises && student.exercises.length > 0) {
    const studentExercises = student.exercises.map(id => 
      exercises.find(ex => ex.id === id)
    ).filter(Boolean);
    
    doc.setFontSize(FONT_SIZE);
    doc.setFont('IRANSans', 'bold');
    const exercisesHeaderText = 'برنامه تمرینی';
    const exercisesHeaderWidth = doc.getTextWidth(exercisesHeaderText);
    const exercisesHeaderX = (pageWidth - exercisesHeaderWidth) / 2;
    doc.text(exercisesHeaderText, exercisesHeaderX, currentY);

    currentY += 10;

    // Fix setGlobalAlpha issues by using setFillColor with RGBA values
    doc.setFillColor(255, 255, 255, 0.5); // Instead of setGlobalAlpha

    // Fix autoTable type issues by properly extending jsPDF type
    (doc as any).autoTable({
      head: [['نام تمرین', 'دسته‌بندی', 'توضیحات']],
      body: studentExercises.map((exercise: any) => [
        exercise.name, 
        exercise.category || '',
        exercise.description || ''
      ]),
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
    
    currentY = (doc as any).lastAutoTable.finalY + 10;
  }
  
  // Add meals table if available
  if (student.meals && student.meals.length > 0) {
    const studentMeals = student.meals.map(id => 
      meals.find(meal => meal.id === id)
    ).filter(Boolean);
    
    if (currentY > pageHeight - 60) {
      doc.addPage();
      currentY = MARGIN + 10;
    }
    
    doc.setFontSize(FONT_SIZE);
    doc.setFont('IRANSans', 'bold');
    const mealsHeaderText = 'برنامه غذایی';
    const mealsHeaderWidth = doc.getTextWidth(mealsHeaderText);
    const mealsHeaderX = (pageWidth - mealsHeaderWidth) / 2;
    doc.text(mealsHeaderText, mealsHeaderX, currentY);

    currentY += 10;

    // Add meals table
    (doc as any).autoTable({
      head: [['نام غذا', 'دسته‌بندی', 'توضیحات']],
      body: studentMeals.map((meal: any) => [
        meal.name, 
        meal.category || '',
        meal.description || ''
      ]),
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
    
    currentY = (doc as any).lastAutoTable.finalY + 10;
  }
  
  // Add supplements table if available
  if (student.supplements && student.supplements.length > 0) {
    const studentSupplements = student.supplements.map(id => 
      supplements.find(sup => sup.id === id)
    ).filter(Boolean);
    
    if (currentY > pageHeight - 60) {
      doc.addPage();
      currentY = MARGIN + 10;
    }
    
    doc.setFontSize(FONT_SIZE);
    doc.setFont('IRANSans', 'bold');
    const supplementsHeaderText = 'مکمل‌ها و ویتامین‌ها';
    const supplementsHeaderWidth = doc.getTextWidth(supplementsHeaderText);
    const supplementsHeaderX = (pageWidth - supplementsHeaderWidth) / 2;
    doc.text(supplementsHeaderText, supplementsHeaderX, currentY);

    currentY += 10;

    // Add supplements table
    (doc as any).autoTable({
      head: [['نام مکمل', 'نوع', 'میزان مصرف', 'زمان مصرف']],
      body: studentSupplements.map((supplement: any) => [
        supplement.name, 
        supplement.type || '',
        supplement.dosage || '',
        supplement.timing || ''
      ]),
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
  }
  
  // Add gym contact info at bottom if available
  if (trainerProfile.gymAddress || trainerProfile.phone) {
    const footerY = pageHeight - MARGIN;
    doc.setFontSize(8);
    doc.setFont('IRANSans', 'normal');
    
    let contactInfo = '';
    if (trainerProfile.gymAddress) contactInfo += `آدرس: ${trainerProfile.gymAddress} `;
    if (trainerProfile.phone) contactInfo += `تلفن: ${trainerProfile.phone}`;
    
    const contactWidth = doc.getTextWidth(contactInfo);
    const contactX = (pageWidth - contactWidth) / 2;
    doc.text(contactInfo, contactX, footerY);
  }
  
  return doc;
};

// Function to open a print window with student data
export const openPrintWindow = (
  student: Student, 
  exercises: Exercise[], 
  meals: Meal[], 
  supplements: Supplement[],
  trainerProfile: TrainerProfile
) => {
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    console.error('Could not open print window');
    return null;
  }
  
  const studentExercises = student.exercises?.map(id => 
    exercises.find(ex => ex.id === id)
  ).filter(Boolean) || [];
  
  const studentMeals = student.meals?.map(id => 
    meals.find(meal => meal.id === id)
  ).filter(Boolean) || [];
  
  const studentSupplements = student.supplements?.map(id => 
    supplements.find(sup => sup.id === id)
  ).filter(Boolean) || [];
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html dir="rtl">
    <head>
      <title>اطلاعات شاگرد - ${student.name}</title>
      <meta charset="UTF-8">
      <style>
        @font-face {
          font-family: 'IRANSans';
          src: url('/fonts/IRANSans.ttf') format('truetype');
        }
        * {
          box-sizing: border-box;
          font-family: 'IRANSans', Tahoma, Arial, sans-serif;
        }
        body {
          direction: rtl;
          text-align: right;
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 10px;
          border-bottom: 1px solid #ccc;
        }
        .gym-name {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .trainer-name {
          font-size: 16px;
          color: #666;
        }
        .section {
          margin-bottom: 30px;
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
          border-bottom: 1px solid #eee;
          padding-bottom: 5px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .info-item {
          margin-bottom: 5px;
        }
        .info-label {
          font-weight: bold;
          display: inline-block;
          min-width: 120px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: right;
        }
        th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .footer {
          margin-top: 40px;
          text-align: center;
          font-size: 12px;
          color: #666;
          padding-top: 10px;
          border-top: 1px solid #eee;
        }
        @media print {
          body {
            padding: 0;
            margin: 0;
          }
          button {
            display: none;
          }
          @page {
            margin: 1.5cm;
          }
        }
        .print-button {
          display: block;
          margin: 20px auto;
          padding: 10px 20px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
      </style>
    </head>
    <body>
      <button class="print-button" onclick="window.print(); window.close();">چاپ</button>
      
      <div class="header">
        <div class="gym-name">${trainerProfile.gymName || 'باشگاه'}</div>
        ${trainerProfile.fullName ? `<div class="trainer-name">مربی: ${trainerProfile.fullName}</div>` : ''}
      </div>
      
      <div class="section">
        <div class="section-title">مشخصات فردی شاگرد</div>
        <div class="info-grid">
          <div class="info-item"><span class="info-label">نام و نام خانوادگی:</span> ${student.name || 'وارد نشده'}</div>
          <div class="info-item"><span class="info-label">شماره تلفن:</span> ${student.phone || 'وارد نشده'}</div>
          <div class="info-item"><span class="info-label">قد:</span> ${student.height ? `${student.height} سانتی‌متر` : 'وارد نشده'}</div>
          <div class="info-item"><span class="info-label">وزن:</span> ${student.weight ? `${student.weight} کیلوگرم` : 'وارد نشده'}</div>
          <div class="info-item"><span class="info-label">مبلغ برنامه:</span> ${student.payment ? `${student.payment} تومان` : 'وارد نشده'}</div>
        </div>
      </div>
      
      ${studentExercises.length > 0 ? `
      <div class="section">
        <div class="section-title">برنامه تمرینی</div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>نام تمرین</th>
              <th>دسته‌بندی</th>
              <th>توضیحات</th>
            </tr>
          </thead>
          <tbody>
            ${studentExercises.map((exercise: any, index: number) => `
              <tr>
                <td>${index + 1}</td>
                <td>${exercise.name}</td>
                <td>${exercise.category || ''}</td>
                <td>${exercise.description || ''}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      ` : ''}
      
      ${studentMeals.length > 0 ? `
      <div class="section">
        <div class="section-title">برنامه غذایی</div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>نام غذا</th>
              <th>دسته‌بندی</th>
              <th>توضیحات</th>
            </tr>
          </thead>
          <tbody>
            ${studentMeals.map((meal: any, index: number) => `
              <tr>
                <td>${index + 1}</td>
                <td>${meal.name}</td>
                <td>${meal.category || ''}</td>
                <td>${meal.description || ''}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      ` : ''}
      
      ${studentSupplements.length > 0 ? `
      <div class="section">
        <div class="section-title">مکمل‌ها و ویتامین‌ها</div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>نام مکمل</th>
              <th>نوع</th>
              <th>میزان مصرف</th>
              <th>زمان مصرف</th>
            </tr>
          </thead>
          <tbody>
            ${studentSupplements.map((supplement: any, index: number) => `
              <tr>
                <td>${index + 1}</td>
                <td>${supplement.name}</td>
                <td>${supplement.type || ''}</td>
                <td>${supplement.dosage || ''}</td>
                <td>${supplement.timing || ''}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      ` : ''}
      
      <div class="footer">
        ${trainerProfile.gymAddress ? `آدرس: ${trainerProfile.gymAddress}` : ''}
        ${trainerProfile.phone ? ` | تلفن: ${trainerProfile.phone}` : ''}
      </div>
    </body>
    </html>
  `);
  
  printWindow.document.close();
  return printWindow;
};

// The original exportPDF function - keeping for backward compatibility
const exportPDF = async (student: Student) => {
  const doc = createDoc();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

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
    body: student.exercises?.map(exercise => [exercise.name, exercise.description || '']) || [],
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
  
  return doc;
};

export default exportPDF;
