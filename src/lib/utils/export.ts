
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Student, Exercise, Meal, Supplement } from '@/components/students/StudentTypes';
import { TrainerProfile } from '@/types/trainer';
import { toPersianNumbers } from './numbers';

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
  trainerProfile: TrainerProfile,
  exportStyle: "modern" | "classic" | "minimal" = "modern"
) => {
  const doc = createDoc();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Apply styling based on exportStyle
  const styleConfig = getStyleConfig(exportStyle);
  
  // Add header with gym and trainer info
  let currentY = MARGIN;
  doc.setFontSize(16);
  doc.setFont('IRANSans', 'bold');
  
  // Add gym logo/header based on style
  if (exportStyle === "modern") {
    // Modern style with gradient header
    doc.setFillColor(styleConfig.headerBgColor[0], styleConfig.headerBgColor[1], styleConfig.headerBgColor[2], styleConfig.headerBgColor[3]);
    doc.rect(0, 0, pageWidth, 30, 'F');
    doc.setTextColor(styleConfig.headerTextColor[0], styleConfig.headerTextColor[1], styleConfig.headerTextColor[2]);
  } else if (exportStyle === "classic") {
    // Classic style with border
    doc.setDrawColor(styleConfig.borderColor[0], styleConfig.borderColor[1], styleConfig.borderColor[2]);
    doc.setLineWidth(0.5);
    doc.rect(MARGIN-5, MARGIN-5, pageWidth-2*(MARGIN-5), 25, 'S');
    doc.setTextColor(styleConfig.headerTextColor[0], styleConfig.headerTextColor[1], styleConfig.headerTextColor[2]);
  } else {
    // Minimal style - just text
    doc.setTextColor(styleConfig.headerTextColor[0], styleConfig.headerTextColor[1], styleConfig.headerTextColor[2]);
  }
  
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
  
  // Reset text color after header
  doc.setTextColor(0, 0, 0);
  
  // Add dividing line
  if (exportStyle !== "minimal") {
    doc.setDrawColor(styleConfig.dividerColor[0], styleConfig.dividerColor[1], styleConfig.dividerColor[2]);
    doc.setLineWidth(styleConfig.dividerWidth);
    doc.line(MARGIN, currentY, pageWidth - MARGIN, currentY);
  }
  currentY += 10;

  // Add student info header
  doc.setFontSize(14);
  doc.setFont('IRANSans', 'bold');
  
  if (exportStyle === "modern") {
    doc.setTextColor(styleConfig.sectionTitleColor[0], styleConfig.sectionTitleColor[1], styleConfig.sectionTitleColor[2]);
  }
  
  const headerText = 'مشخصات فردی شاگرد';
  const headerWidth = doc.getTextWidth(headerText);
  const headerX = (pageWidth - headerWidth) / 2;
  doc.text(headerText, headerX, currentY);
  currentY += 10;

  // Reset color
  doc.setTextColor(0, 0, 0);

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

  // Convert numbers to Persian and add units
  addInfoLine('نام و نام خانوادگی', student.name || 'وارد نشده');
  addInfoLine('شماره تلفن', student.phone ? toPersianNumbers(student.phone) : 'وارد نشده');
  addInfoLine('قد', student.height ? `${toPersianNumbers(student.height)} سانتی‌متر` : 'وارد نشده');
  addInfoLine('وزن', student.weight ? `${toPersianNumbers(student.weight)} کیلوگرم` : 'وارد نشده');
  addInfoLine('مبلغ برنامه', student.payment ? `${toPersianNumbers(student.payment)} تومان` : 'وارد نشده');

  // Add exercises table
  currentY += 10;
  
  if (student.exercises && student.exercises.length > 0) {
    const studentExercises = student.exercises.map(id => 
      exercises.find(ex => ex.id === id)
    ).filter(Boolean);
    
    doc.setFontSize(FONT_SIZE);
    doc.setFont('IRANSans', 'bold');
    
    if (exportStyle === "modern") {
      doc.setTextColor(styleConfig.sectionTitleColor[0], styleConfig.sectionTitleColor[1], styleConfig.sectionTitleColor[2]);
    }
    
    const exercisesHeaderText = 'برنامه تمرینی';
    const exercisesHeaderWidth = doc.getTextWidth(exercisesHeaderText);
    const exercisesHeaderX = (pageWidth - exercisesHeaderWidth) / 2;
    doc.text(exercisesHeaderText, exercisesHeaderX, currentY);

    // Reset color
    doc.setTextColor(0, 0, 0);
    
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
        fontSize: styleConfig.tableFontSize,
        textColor: [0, 0, 0],
        lineColor: [styleConfig.tableLineColor[0], styleConfig.tableLineColor[1], styleConfig.tableLineColor[2]],
        lineWidth: styleConfig.tableLineWidth,
        cellPadding: styleConfig.tableCellPadding,
        overflow: 'linebreak',
        halign: 'right',
        valign: 'middle',
        fontStyle: 'normal'
      },
      headStyles: {
        fillColor: [styleConfig.tableHeaderFillColor[0], styleConfig.tableHeaderFillColor[1], styleConfig.tableHeaderFillColor[2]],
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
    
    if (exportStyle === "modern") {
      doc.setTextColor(styleConfig.sectionTitleColor[0], styleConfig.sectionTitleColor[1], styleConfig.sectionTitleColor[2]);
    }
    
    const mealsHeaderText = 'برنامه غذایی';
    const mealsHeaderWidth = doc.getTextWidth(mealsHeaderText);
    const mealsHeaderX = (pageWidth - mealsHeaderWidth) / 2;
    doc.text(mealsHeaderText, mealsHeaderX, currentY);

    // Reset color
    doc.setTextColor(0, 0, 0);
    
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
        fontSize: styleConfig.tableFontSize,
        textColor: [0, 0, 0],
        lineColor: [styleConfig.tableLineColor[0], styleConfig.tableLineColor[1], styleConfig.tableLineColor[2]],
        lineWidth: styleConfig.tableLineWidth,
        cellPadding: styleConfig.tableCellPadding,
        overflow: 'linebreak',
        halign: 'right',
        valign: 'middle',
        fontStyle: 'normal'
      },
      headStyles: {
        fillColor: [styleConfig.tableHeaderFillColor[0], styleConfig.tableHeaderFillColor[1], styleConfig.tableHeaderFillColor[2]],
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
    
    if (exportStyle === "modern") {
      doc.setTextColor(styleConfig.sectionTitleColor[0], styleConfig.sectionTitleColor[1], styleConfig.sectionTitleColor[2]);
    }
    
    const supplementsHeaderText = 'مکمل‌ها و ویتامین‌ها';
    const supplementsHeaderWidth = doc.getTextWidth(supplementsHeaderText);
    const supplementsHeaderX = (pageWidth - supplementsHeaderWidth) / 2;
    doc.text(supplementsHeaderText, supplementsHeaderX, currentY);

    // Reset color
    doc.setTextColor(0, 0, 0);
    
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
        fontSize: styleConfig.tableFontSize,
        textColor: [0, 0, 0],
        lineColor: [styleConfig.tableLineColor[0], styleConfig.tableLineColor[1], styleConfig.tableLineColor[2]],
        lineWidth: styleConfig.tableLineWidth,
        cellPadding: styleConfig.tableCellPadding,
        overflow: 'linebreak',
        halign: 'right',
        valign: 'middle',
        fontStyle: 'normal'
      },
      headStyles: {
        fillColor: [styleConfig.tableHeaderFillColor[0], styleConfig.tableHeaderFillColor[1], styleConfig.tableHeaderFillColor[2]],
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
    if (trainerProfile.phone) contactInfo += `تلفن: ${toPersianNumbers(trainerProfile.phone)}`;
    
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
  trainerProfile: TrainerProfile,
  exportStyle: "modern" | "classic" | "minimal" = "modern"
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
  
  // Get style-specific CSS classes
  const styleClasses = getPrintStyleClasses(exportStyle);
  
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
          ${styleClasses.body}
        }
        .persian-numbers {
          -moz-font-feature-settings: "ss01";
          -webkit-font-feature-settings: "ss01";
          font-feature-settings: "ss01";
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 10px;
          border-bottom: 1px solid #ccc;
          ${styleClasses.header}
        }
        .gym-name {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 5px;
          ${styleClasses.gymName}
        }
        .trainer-name {
          font-size: 16px;
          color: #666;
          ${styleClasses.trainerName}
        }
        .section {
          margin-bottom: 30px;
          ${styleClasses.section}
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
          border-bottom: 1px solid #eee;
          padding-bottom: 5px;
          ${styleClasses.sectionTitle}
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          ${styleClasses.infoGrid}
        }
        .info-item {
          margin-bottom: 5px;
          ${styleClasses.infoItem}
        }
        .info-label {
          font-weight: bold;
          display: inline-block;
          min-width: 120px;
          ${styleClasses.infoLabel}
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          ${styleClasses.table}
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: right;
          ${styleClasses.tableCell}
        }
        th {
          background-color: #f2f2f2;
          font-weight: bold;
          ${styleClasses.tableHeader}
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
          ${styleClasses.tableRowEven}
        }
        .footer {
          margin-top: 40px;
          text-align: center;
          font-size: 12px;
          color: #666;
          padding-top: 10px;
          border-top: 1px solid #eee;
          ${styleClasses.footer}
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
          <div class="info-item"><span class="info-label">شماره تلفن:</span> <span class="persian-numbers">${student.phone ? toPersianNumbers(student.phone) : 'وارد نشده'}</span></div>
          <div class="info-item"><span class="info-label">قد:</span> <span class="persian-numbers">${student.height ? `${toPersianNumbers(student.height)} سانتی‌متر` : 'وارد نشده'}</span></div>
          <div class="info-item"><span class="info-label">وزن:</span> <span class="persian-numbers">${student.weight ? `${toPersianNumbers(student.weight)} کیلوگرم` : 'وارد نشده'}</span></div>
          <div class="info-item"><span class="info-label">مبلغ برنامه:</span> <span class="persian-numbers">${student.payment ? `${toPersianNumbers(student.payment)} تومان` : 'وارد نشده'}</span></div>
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
                <td class="persian-numbers">${toPersianNumbers(index + 1)}</td>
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
                <td class="persian-numbers">${toPersianNumbers(index + 1)}</td>
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
                <td class="persian-numbers">${toPersianNumbers(index + 1)}</td>
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
        ${trainerProfile.phone ? ` | تلفن: <span class="persian-numbers">${toPersianNumbers(trainerProfile.phone)}</span>` : ''}
      </div>
    </body>
    </html>
  `);
  
  printWindow.document.close();
  return printWindow;
};

// Helper function to get style configuration based on export style
function getStyleConfig(exportStyle: "modern" | "classic" | "minimal") {
  switch(exportStyle) {
    case "modern":
      return {
        headerBgColor: [100, 100, 255, 0.7] as [number, number, number, number],  // RGBA for modern gradient header
        headerTextColor: [255, 255, 255] as [number, number, number],
        dividerColor: [100, 100, 255] as [number, number, number],
        dividerWidth: 0.5,
        sectionTitleColor: [100, 100, 255] as [number, number, number],
        tableHeaderFillColor: [220, 230, 255] as [number, number, number],
        tableLineColor: [50, 100, 200] as [number, number, number],
        tableLineWidth: 0.2,
        tableFontSize: 9,
        tableCellPadding: 4,
        borderColor: [100, 100, 255] as [number, number, number]
      };
    case "classic":
      return {
        headerBgColor: [255, 255, 255, 1] as [number, number, number, number],
        headerTextColor: [0, 0, 0] as [number, number, number],
        borderColor: [0, 0, 0] as [number, number, number],
        dividerColor: [0, 0, 0] as [number, number, number],
        dividerWidth: 0.5,
        sectionTitleColor: [0, 0, 0] as [number, number, number],
        tableHeaderFillColor: [240, 240, 240] as [number, number, number],
        tableLineColor: [0, 0, 0] as [number, number, number],
        tableLineWidth: 0.2,
        tableFontSize: 10,
        tableCellPadding: 5
      };
    case "minimal":
    default:
      return {
        headerBgColor: [255, 255, 255, 1] as [number, number, number, number],
        headerTextColor: [0, 0, 0] as [number, number, number],
        dividerColor: [200, 200, 200] as [number, number, number],
        dividerWidth: 0.2,
        sectionTitleColor: [0, 0, 0] as [number, number, number],
        tableHeaderFillColor: [245, 245, 245] as [number, number, number],
        tableLineColor: [200, 200, 200] as [number, number, number],
        tableLineWidth: 0.1,
        tableFontSize: 8,
        tableCellPadding: 3,
        borderColor: [200, 200, 200] as [number, number, number]
      };
  }
}

// Helper function to get print window style classes based on export style
function getPrintStyleClasses(exportStyle: "modern" | "classic" | "minimal") {
  switch(exportStyle) {
    case "modern":
      return {
        body: 'background-color: #fafbff;',
        header: 'background: linear-gradient(135deg, #6464ff, #8a64ff); padding: 20px; color: white; border-radius: 10px; margin-bottom: 25px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);',
        gymName: 'color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);',
        trainerName: 'color: rgba(255,255,255,0.9);',
        section: 'background: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);',
        sectionTitle: 'color: #5050ff; border-bottom: 2px solid #e0e0ff;',
        infoGrid: 'background: #f8f9ff; border-radius: 8px; padding: 10px;',
        infoItem: 'padding: 5px; border-bottom: 1px solid #eef0ff;',
        infoLabel: 'color: #5050ff;',
        table: 'border-radius: 5px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);',
        tableHeader: 'background: linear-gradient(to right, #e0e5ff, #d0d8ff); color: #4040cc;',
        tableCell: 'border: 1px solid #e0e5ff;',
        tableRowEven: 'background-color: #f5f7ff;',
        footer: 'color: #8888aa; border-top: 1px solid #e0e5ff;'
      };
    case "classic":
      return {
        body: 'background-color: #fff; font-family: serif;',
        header: 'border: 2px solid #000; padding: 15px;',
        gymName: 'font-family: serif; letter-spacing: 1px;',
        trainerName: 'font-style: italic;',
        section: 'margin-bottom: 30px; border: 1px solid #ddd;',
        sectionTitle: 'font-family: serif; text-align: center; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #000;',
        infoGrid: '',
        infoItem: 'padding: 5px; border-bottom: 1px solid #eee;',
        infoLabel: 'text-transform: uppercase; letter-spacing: 0.5px;',
        table: 'border: 2px solid #000;',
        tableHeader: 'background-color: #eee; border: 1px solid #000;',
        tableCell: 'border: 1px solid #000;',
        tableRowEven: 'background-color: #f5f5f5;',
        footer: 'font-style: italic; border-top: 2px solid #000;'
      };
    case "minimal":
    default:
      return {
        body: 'background-color: #fff; color: #333;',
        header: 'padding: 10px; border-bottom: 1px solid #eee;',
        gymName: '',
        trainerName: '',
        section: '',
        sectionTitle: 'font-size: 16px; color: #555;',
        infoGrid: '',
        infoItem: '',
        infoLabel: '',
        table: 'border: 1px solid #eee;',
        tableHeader: 'background-color: #f9f9f9; font-weight: normal;',
        tableCell: 'border: 1px solid #eee;',
        tableRowEven: 'background-color: #fcfcfc;',
        footer: 'color: #999; font-size: 11px;'
      };
  }
}

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
  addInfoLine('شماره تلفن', student.phone ? toPersianNumbers(student.phone) : 'وارد نشده');
  addInfoLine('قد', student.height ? `${toPersianNumbers(student.height)} سانتی‌متر` : 'وارد نشده');
  addInfoLine('وزن', student.weight ? `${toPersianNumbers(student.weight)} کیلوگرم` : 'وارد نشده');
  addInfoLine('مبلغ برنامه', student.payment ? `${toPersianNumbers(student.payment)} تومان` : 'وارد نشده');

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

  if (student.exercises && student.exercises.length > 0) {
    // Fix autoTable type issues by properly extending jsPDF type
    (doc as any).autoTable({
      head: [['نام تمرین', 'توضیحات']],
      body: student.exercises.map((exerciseId) => {
        // Since exercises is an array of IDs, we don't have direct access to exercise objects here
        // This is a placeholder that prevents errors - in real usage, exercises should be fetched
        return ["Exercise", "Description"];
      }),
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

  // Create Persian filename with current date
  const persianDate = new Date().toLocaleDateString('fa-IR').replace(/\//g, '-');
  const fileName = `برنامه_${student.name}_${persianDate}.pdf`;
  
  // Save the PDF with Persian name
  doc.save(fileName);
  
  return doc;
};

export default exportPDF;
