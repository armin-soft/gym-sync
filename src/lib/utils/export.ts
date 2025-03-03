
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { toPersianNumbers } from "@/lib/utils/numbers";
import { TrainerProfile } from "@/types/trainer";
import { Supplement } from "@/types/supplement";

// Add type declarations for jspdf-autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable: {
      finalY: number;
    };
  }
}

interface StudentData {
  id: number;
  name: string;
  phone: string;
  height: string;
  weight: string;
  image?: string;
  exercises?: number[];
  meals?: number[];
  supplements?: number[];
  vitamins?: number[];
}

export const generateStudentPDF = (
  student: StudentData, 
  exercises: any[], 
  meals: any[], 
  supplements: any[],
  trainerProfile: TrainerProfile
): jsPDF => {
  // Create PDF with jsPDF
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  // Add gym logo and header with modern design
  doc.setFillColor(249, 250, 251); // light gray background
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setDrawColor(0, 48, 73);
  doc.setLineWidth(0.5);
  doc.line(10, 40, 200, 40);

  // Add gym info with modern styling
  doc.setFontSize(20);
  doc.setTextColor(0, 48, 73); // #003049 - dark blue
  doc.text(`${trainerProfile.gymName}`, 15, 15);
  
  doc.setFontSize(11);
  doc.setTextColor(102, 119, 136); // #667788 - medium gray
  doc.text(`آدرس: ${trainerProfile.gymAddress}`, 15, 22);
  
  if (trainerProfile.phone) {
    doc.text(`تلفن: ${toPersianNumbers(trainerProfile.phone)}`, 15, 29);
  }
  
  let contactLine = "";
  if (trainerProfile.website) {
    contactLine += `وب‌سایت: ${trainerProfile.website}`;
  }
  if (trainerProfile.instagram) {
    if (contactLine) contactLine += " | ";
    contactLine += `اینستاگرام: ${trainerProfile.instagram}`;
  }
  
  if (contactLine) {
    doc.text(contactLine, 15, 36);
  }

  // Add the trainer name if available
  if (trainerProfile.fullName) {
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text(`مربی: ${trainerProfile.fullName}`, 140, 15);
  }

  // Student info section with colored background
  doc.setFillColor(240, 249, 255); // light blue background
  doc.rect(0, 50, 210, 15, 'F');
  
  // Main title with improved styling
  doc.setFontSize(16);
  doc.setTextColor(0, 48, 73); // #003049
  doc.text(`پروفایل شاگرد: ${student.name}`, 15, 60);

  let currentY = 75;

  // Personal information with modern card styling
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(230, 230, 240);
  doc.setLineWidth(0.5);
  doc.roundedRect(15, currentY - 10, 180, 40, 3, 3, 'FD');

  doc.setFontSize(14);
  doc.setTextColor(0, 48, 73); // Dark blue
  doc.text("اطلاعات فردی", 25, currentY);

  // Two-column personal data layout
  const personalInfoWidth = 80;
  
  // Left column
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  doc.text("نام:", 25, currentY + 10);
  doc.text("شماره تماس:", 25, currentY + 20);
  
  doc.setTextColor(40, 40, 40);
  doc.text(student.name || '', 45, currentY + 10);
  doc.text(student.phone ? toPersianNumbers(student.phone) : '', 55, currentY + 20);

  // Right column
  doc.setTextColor(80, 80, 80);
  doc.text("قد (سانتی‌متر):", 115, currentY + 10);
  doc.text("وزن (کیلوگرم):", 115, currentY + 20);
  
  doc.setTextColor(40, 40, 40);
  doc.text(student.height ? toPersianNumbers(student.height) : '', 155, currentY + 10);
  doc.text(student.weight ? toPersianNumbers(student.weight) : '', 155, currentY + 20);

  currentY += 40;

  // Exercise program with visual card
  if (student.exercises && student.exercises.length > 0 && exercises && exercises.length > 0) {
    // Add card background
    doc.setFillColor(243, 244, 254); // Light indigo background
    doc.setDrawColor(90, 120, 250); // Indigo border
    doc.roundedRect(15, currentY, 180, Math.min(student.exercises.length * 10 + 20, 100), 3, 3, 'FD');

    // Add card header
    doc.setFontSize(14);
    doc.setTextColor(63, 81, 181); // Indigo
    doc.text("برنامه تمرینی", 25, currentY + 10);
    
    currentY += 20;

    const studentExercises = exercises.filter((exercise) => 
      student.exercises && student.exercises.includes(exercise.id)
    );

    // Add items with icon-like indicators
    doc.setFontSize(10);
    studentExercises.forEach((exercise, index) => {
      // Don't exceed page height
      if (currentY > 250) {
        doc.addPage();
        currentY = 20;
        
        // Add page header
        doc.setFillColor(243, 244, 254);
        doc.setDrawColor(90, 120, 250);
        doc.roundedRect(15, currentY, 180, Math.min((studentExercises.length - index) * 10 + 10, 100), 3, 3, 'FD');
        
        doc.setFontSize(14);
        doc.setTextColor(63, 81, 181);
        doc.text("برنامه تمرینی (ادامه)", 25, currentY + 10);
        
        currentY += 20;
      }

      // Add circle indicator
      doc.setFillColor(63, 81, 181);
      doc.circle(25, currentY, 1.5, 'F');
      
      // Add text
      doc.setTextColor(40, 40, 40);
      doc.text(exercise.name || "", 30, currentY);
      
      if (exercise.description) {
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(exercise.description, 30, currentY + 4, { maxWidth: 150 });
        doc.setFontSize(10);
        currentY += 8;
      } else {
        currentY += 6;
      }
    });

    currentY += 10;
  }

  // Diet program with visual card
  if (student.meals && student.meals.length > 0 && meals && meals.length > 0) {
    // Add new page if near bottom
    if (currentY > 240) {
      doc.addPage();
      currentY = 20;
    }
    
    // Add card background
    doc.setFillColor(239, 250, 242); // Light green background
    doc.setDrawColor(76, 175, 80); // Green border
    doc.roundedRect(15, currentY, 180, Math.min(student.meals.length * 10 + 20, 100), 3, 3, 'FD');

    // Add card header
    doc.setFontSize(14);
    doc.setTextColor(56, 142, 60); // Green
    doc.text("برنامه غذایی", 25, currentY + 10);
    
    currentY += 20;

    const studentMeals = meals.filter((meal) => 
      student.meals && student.meals.includes(meal.id)
    );

    // Add items with icon-like indicators
    doc.setFontSize(10);
    studentMeals.forEach((meal, index) => {
      // Don't exceed page height
      if (currentY > 250) {
        doc.addPage();
        currentY = 20;
        
        // Add page header
        doc.setFillColor(239, 250, 242);
        doc.setDrawColor(76, 175, 80);
        doc.roundedRect(15, currentY, 180, Math.min((studentMeals.length - index) * 10 + 10, 100), 3, 3, 'FD');
        
        doc.setFontSize(14);
        doc.setTextColor(56, 142, 60);
        doc.text("برنامه غذایی (ادامه)", 25, currentY + 10);
        
        currentY += 20;
      }

      // Add circle indicator
      doc.setFillColor(56, 142, 60);
      doc.circle(25, currentY, 1.5, 'F');
      
      // Add text
      doc.setTextColor(40, 40, 40);
      doc.text(meal.name || "", 30, currentY);
      
      if (meal.description) {
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(meal.description, 30, currentY + 4, { maxWidth: 150 });
        doc.setFontSize(10);
        currentY += 8;
      } else {
        currentY += 6;
      }
    });

    currentY += 10;
  }

  // Supplements and vitamins with visual card
  if ((student.supplements && student.supplements.length > 0) || 
      (student.vitamins && student.vitamins.length > 0) && 
      supplements && supplements.length > 0) {
    
    // Add new page if near bottom
    if (currentY > 240) {
      doc.addPage();
      currentY = 20;
    }
    
    const supplementItems = supplements
      .filter((supplement) => 
        (student.supplements && student.supplements.includes(supplement.id)) || 
        (student.vitamins && student.vitamins.includes(supplement.id))
      );
      
    if (supplementItems.length > 0) {
      // Add card background
      doc.setFillColor(249, 242, 254); // Light purple background
      doc.setDrawColor(156, 39, 176); // Purple border
      doc.roundedRect(15, currentY, 180, Math.min(supplementItems.length * 10 + 20, 100), 3, 3, 'FD');

      // Add card header
      doc.setFontSize(14);
      doc.setTextColor(123, 31, 162); // Purple
      doc.text("مکمل‌ها و ویتامین‌ها", 25, currentY + 10);
      
      currentY += 20;

      // Add items with icon-like indicators
      doc.setFontSize(10);
      supplementItems.forEach((supplement, index) => {
        // Don't exceed page height
        if (currentY > 250) {
          doc.addPage();
          currentY = 20;
          
          // Add page header
          doc.setFillColor(249, 242, 254);
          doc.setDrawColor(156, 39, 176);
          doc.roundedRect(15, currentY, 180, Math.min((supplementItems.length - index) * 10 + 10, 100), 3, 3, 'FD');
          
          doc.setFontSize(14);
          doc.setTextColor(123, 31, 162);
          doc.text("مکمل‌ها و ویتامین‌ها (ادامه)", 25, currentY + 10);
          
          currentY += 20;
        }

        // Add circle indicator
        doc.setFillColor(123, 31, 162);
        doc.circle(25, currentY, 1.5, 'F');
        
        // Add text
        doc.setTextColor(40, 40, 40);
        doc.text(supplement.name || "", 30, currentY);
        
        if (supplement.description) {
          doc.setFontSize(8);
          doc.setTextColor(100, 100, 100);
          doc.text(supplement.description, 30, currentY + 4, { maxWidth: 150 });
          doc.setFontSize(10);
          currentY += 8;
        } else {
          currentY += 6;
        }
      });
    }
  }

  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Footer line
    doc.setDrawColor(230, 230, 240);
    doc.setLineWidth(0.5);
    doc.line(15, 280, 195, 280);
    
    // Footer text
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`صفحه ${toPersianNumbers(i)} از ${toPersianNumbers(pageCount)}`, 185, 285);
    
    // Gym name in footer
    doc.text(trainerProfile.gymName, 15, 285);
  }

  return doc;
};

export const openPrintWindow = (
  student: StudentData, 
  exercises: any[], 
  meals: any[], 
  supplements: any[],
  trainerProfile: TrainerProfile
): Window | null => {
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    return null;
  }

  // HTML content for printing with modern styling
  printWindow.document.write(`
    <html dir="rtl">
    <head>
      <title>اطلاعات شاگرد: ${student.name}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700&display=swap');
        
        @media print {
          @page { 
            size: A4 portrait; 
            margin: 1.5cm; 
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print-button {
            display: none !important;
          }
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Vazirmatn', 'Tahoma', 'Arial', sans-serif;
          color: #333;
          background-color: #f9fafb;
          padding: 0;
          margin: 0;
          direction: rtl;
        }
        
        .page {
          background: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          padding: 2rem;
          max-width: 210mm;
          margin: 0 auto 2rem;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .gym-info {
          flex: 2;
        }
        
        .trainer-info {
          flex: 1;
          text-align: left;
        }
        
        .gym-name {
          font-size: 24px;
          font-weight: bold;
          color: #003049;
          margin-bottom: 0.5rem;
        }
        
        .gym-detail {
          color: #667788;
          font-size: 14px;
          margin-bottom: 0.25rem;
        }
        
        .trainer-name {
          font-size: 16px;
          font-weight: bold;
          color: #4b5563;
          margin-bottom: 0.25rem;
        }
        
        .student-header {
          background-color: #f0f9ff;
          color: #003049;
          padding: 0.75rem 1rem;
          font-size: 18px;
          margin: 2rem 0 1.5rem 0;
          border-radius: 6px;
        }
        
        .section {
          margin-bottom: 2rem;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
        }
        
        .section-personal {
          background-color: #ffffff;
          border: 1px solid #e6e8eb;
        }
        
        .section-exercises {
          background-color: #f3f4fe;
          border: 1px solid #d1d5f6;
        }
        
        .section-meals {
          background-color: #effef2;
          border: 1px solid #c6ecc8;
        }
        
        .section-supplements {
          background-color: #f9f2fe;
          border: 1px solid #e9d5f5;
        }
        
        .section-title {
          font-size: 16px;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .title-exercises {
          color: #3f51b5;
        }
        
        .title-meals {
          color: #388e3c;
        }
        
        .title-supplements {
          color: #7b1fa2;
        }
        
        .icon {
          width: 1.5rem;
          height: 1.5rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          margin-left: 0.5rem;
          flex-shrink: 0;
        }
        
        .icon-exercises {
          background-color: #c5cae9;
          color: #3949ab;
        }
        
        .icon-meals {
          background-color: #c8e6c9;
          color: #2e7d32;
        }
        
        .icon-supplements {
          background-color: #e1bee7;
          color: #6a1b9a;
        }
        
        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        
        .info-row {
          margin-bottom: 0.75rem;
        }
        
        .info-label {
          font-weight: 500;
          color: #6b7280;
          margin-bottom: 0.25rem;
        }
        
        .info-value {
          font-weight: 400;
          color: #111827;
        }
        
        .item-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
          gap: 0.75rem;
        }
        
        .item {
          background-color: rgba(255, 255, 255, 0.7);
          border-radius: 6px;
          padding: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .item-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-left: 0.25rem;
          flex-shrink: 0;
        }
        
        .indicator-exercises {
          background-color: #3949ab;
        }
        
        .indicator-meals {
          background-color: #2e7d32;
        }
        
        .indicator-supplements {
          background-color: #6a1b9a;
        }
        
        .item-description {
          color: #6b7280;
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }
        
        .footer {
          text-align: center;
          font-size: 0.75rem;
          color: #9ca3af;
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }
        
        .print-button {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          padding: 0.75rem 2rem;
          background-color: #003049;
          color: white;
          border: none;
          border-radius: 6px;
          font-family: 'Vazirmatn', 'Tahoma', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0, 48, 73, 0.2);
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .print-button:hover {
          background-color: #002036;
          box-shadow: 0 6px 8px rgba(0, 48, 73, 0.3);
        }
        
        .print-icon {
          width: 1.25rem;
          height: 1.25rem;
        }
      </style>
    </head>
    <body>
      <div class="page">
        <div class="header">
          <div class="gym-info">
            <div class="gym-name">${trainerProfile.gymName}</div>
            <div class="gym-detail">آدرس: ${trainerProfile.gymAddress}</div>
            ${trainerProfile.phone ? `<div class="gym-detail">تلفن: ${toPersianNumbers(trainerProfile.phone)}</div>` : ''}
            ${trainerProfile.website ? `<div class="gym-detail">وب‌سایت: ${trainerProfile.website}</div>` : ''}
            ${trainerProfile.instagram ? `<div class="gym-detail">اینستاگرام: ${trainerProfile.instagram}</div>` : ''}
          </div>
          <div class="trainer-info">
            ${trainerProfile.fullName ? `
              <div class="trainer-name">${trainerProfile.fullName}</div>
              <div class="gym-detail">مربی</div>
            ` : ''}
          </div>
        </div>

        <div class="student-header">پروفایل شاگرد: ${student.name}</div>

        <div class="section section-personal">
          <div class="grid">
            <div class="info-row">
              <div class="info-label">نام</div>
              <div class="info-value">${student.name || ''}</div>
            </div>
            <div class="info-row">
              <div class="info-label">شماره موبایل</div>
              <div class="info-value">${student.phone ? toPersianNumbers(student.phone) : ''}</div>
            </div>
            <div class="info-row">
              <div class="info-label">قد (سانتی متر)</div>
              <div class="info-value">${student.height ? toPersianNumbers(student.height) : ''}</div>
            </div>
            <div class="info-row">
              <div class="info-label">وزن (کیلوگرم)</div>
              <div class="info-value">${student.weight ? toPersianNumbers(student.weight) : ''}</div>
            </div>
          </div>
        </div>
  `);

  // Add exercise section if exists
  if (student.exercises && student.exercises.length > 0 && exercises && exercises.length > 0) {
    const studentExercises = exercises.filter(exercise => 
      student.exercises?.includes(exercise.id)
    );

    if (studentExercises.length > 0) {
      printWindow.document.write(`
        <div class="section section-exercises">
          <div class="section-title title-exercises">
            <span class="icon icon-exercises">T</span>برنامه تمرینی
          </div>
          <div class="item-list">
      `);

      studentExercises.forEach(exercise => {
        printWindow.document.write(`
          <div class="item">
            <span class="item-indicator indicator-exercises"></span>
            <div>
              <div>${exercise.name || ''}</div>
              ${exercise.description ? `<div class="item-description">${exercise.description}</div>` : ''}
            </div>
          </div>
        `);
      });

      printWindow.document.write(`</div></div>`);
    }
  }

  // Add diet section if exists
  if (student.meals && student.meals.length > 0 && meals && meals.length > 0) {
    const studentMeals = meals.filter(meal => 
      student.meals?.includes(meal.id)
    );

    if (studentMeals.length > 0) {
      printWindow.document.write(`
        <div class="section section-meals">
          <div class="section-title title-meals">
            <span class="icon icon-meals">F</span>برنامه غذایی
          </div>
          <div class="item-list">
      `);

      studentMeals.forEach(meal => {
        printWindow.document.write(`
          <div class="item">
            <span class="item-indicator indicator-meals"></span>
            <div>
              <div>${meal.name || ''}</div>
              ${meal.description ? `<div class="item-description">${meal.description}</div>` : ''}
            </div>
          </div>
        `);
      });

      printWindow.document.write(`</div></div>`);
    }
  }

  // Add supplements section if exists
  if (((student.supplements && student.supplements.length > 0) || 
      (student.vitamins && student.vitamins.length > 0)) && 
      supplements && supplements.length > 0) {
    
    const studentSupplements = supplements.filter(supplement => 
      (student.supplements?.includes(supplement.id)) || 
      (student.vitamins?.includes(supplement.id))
    );

    if (studentSupplements.length > 0) {
      printWindow.document.write(`
        <div class="section section-supplements">
          <div class="section-title title-supplements">
            <span class="icon icon-supplements">S</span>مکمل‌ها و ویتامین‌ها
          </div>
          <div class="item-list">
      `);

      studentSupplements.forEach(supplement => {
        printWindow.document.write(`
          <div class="item">
            <span class="item-indicator indicator-supplements"></span>
            <div>
              <div>${supplement.name || ''}</div>
              ${supplement.description ? `<div class="item-description">${supplement.description}</div>` : ''}
            </div>
          </div>
        `);
      });

      printWindow.document.write(`</div></div>`);
    }
  }

  // End HTML and add print command
  printWindow.document.write(`
        <div class="footer">
          ${trainerProfile.gymName} © ${new Date().getFullYear()}
        </div>
      </div>
      
      <button onclick="window.print();" class="print-button">
        <svg class="print-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
        </svg>
        چاپ
      </button>
    </body>
    </html>
  `);

  printWindow.document.close();
  
  // Auto-trigger print after window loads
  printWindow.onload = function() {
    setTimeout(() => {
      printWindow.focus();
      // Don't auto-print to let user see the preview first
      // printWindow.print();
    }, 1000);
  };

  return printWindow;
};
