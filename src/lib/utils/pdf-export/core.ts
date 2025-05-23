import jsPDF from 'jspdf';
import { PDFOptions, TrainerProfile } from './types';
import { Student } from '@/components/students/StudentTypes';
import { getCurrentPersianDate } from '../persianDate';
import { toPersianNumbers } from '../numbers';
import autoTable from 'jspdf-autotable';

// Configure jsPDF options
export const PDF_OPTIONS: PDFOptions = {
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4',
  hotfixes: ["px_scaling"],
  compress: true,
};

// Add Vazirmatn font for Persian text
export const addFontToPdf = (doc: jsPDF): jsPDF => {
  try {
    // استفاده از فونت آنلاین به جای فونت‌های محلی
    doc.addFont("https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/ttf/Vazirmatn-Regular.ttf", "Vazirmatn", "normal");
    doc.addFont("https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/ttf/Vazirmatn-Bold.ttf", "Vazirmatn", "bold");
    
    // Set default font
    doc.setFont("Vazirmatn", "normal");
    
    // Set font size for better readability
    doc.setFontSize(12);
  } catch (e) {
    console.error("Failed to load custom font:", e);
    // Fallback to standard font if custom font fails
    doc.setFont("helvetica");
  }
  
  return doc;
};

// Create the header for each page
export function createDocumentHeader(doc: jsPDF, student: Student, trainerProfile: TrainerProfile, pageTitle: string) {
  // Background for header - gradient effect
  const gradient = doc.setFillColor(124, 58, 237); // Primary color
  doc.rect(0, 0, 210, 50, 'F');
  doc.setFillColor(100, 40, 200); // Secondary color
  doc.rect(0, 35, 210, 15, 'F');
  
  // Add gym logo/name
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.setFont("Vazirmatn", "bold");
  doc.text(trainerProfile.gymName || "باشگاه بدنسازی", 105, 20, { align: 'center' });
  
  // Add trainer name
  doc.setFontSize(14);
  doc.setTextColor(230, 230, 230);
  doc.setFont("Vazirmatn", "normal");
  doc.text(`مربی: ${trainerProfile.name || "-"}`, 105, 30, { align: 'center' });
  
  // Add page title with badge-like style
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(75, 42, 60, 10, 5, 5, 'F');
  doc.setFontSize(14);
  doc.setTextColor(124, 58, 237);
  doc.setFont("Vazirmatn", "bold");
  doc.text(pageTitle, 105, 48, { align: 'center' });
  
  // Add divider line
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(15, 60, 195, 60);
  
  // Add student info section with modern styling
  doc.setFillColor(250, 250, 255);
  doc.roundedRect(15, 65, 180, 25, 3, 3, 'F');
  
  doc.setFontSize(13);
  doc.setTextColor(80, 80, 80);
  doc.setFont("Vazirmatn", "bold");
  
  // Student name with icon-like indicator
  doc.setFillColor(124, 58, 237, 0.1);
  doc.circle(30, 72, 3, 'F');
  doc.text(`نام: ${student.name || "-"}`, 40, 73);
  
  // Gender with icon-like indicator
  if (student.gender) {
    const genderText = student.gender === 'male' ? 'مرد' : 'زن';
    doc.setFillColor(124, 58, 237, 0.1);
    doc.circle(30, 82, 3, 'F');
    doc.text(`جنسیت: ${genderText}`, 40, 83);
  }
  
  // Date with icon-like indicator
  const today = getCurrentPersianDate();
  doc.setFillColor(124, 58, 237, 0.1);
  doc.circle(120, 82, 3, 'F');
  doc.text(`تاریخ: ${today}`, 130, 83);
  
  // Add measurements in an elegant card
  if (student.height && student.weight) {
    doc.setFillColor(250, 250, 255);
    doc.roundedRect(15, 95, 180, 15, 3, 3, 'F');
    
    // Height
    doc.setFontSize(11);
    doc.setTextColor(90, 90, 90);
    doc.text(`قد: ${toPersianNumbers(student.height)} سانتی‌متر`, 40, 103);
    
    // Weight
    doc.text(`وزن: ${toPersianNumbers(student.weight)} کیلوگرم`, 110, 103);
    
    // BMI calculation
    if (student.height && student.weight) {
      const height = Number(student.height);
      const weight = Number(student.weight);
      if (height > 0 && weight > 0) {
        const bmi = weight / ((height / 100) * (height / 100));
        doc.text(`شاخص توده بدنی: ${toPersianNumbers(bmi.toFixed(1))}`, 180, 103);
      }
    }
  }
}

// Add footer to each page
export function addPageFooter(doc: jsPDF, trainerProfile: TrainerProfile) {
  const pageCount = doc.getNumberOfPages();
  const currentPage = doc.getCurrentPageInfo().pageNumber;
  
  // Footer background
  doc.setFillColor(250, 250, 255);
  doc.rect(0, 275, 210, 22, 'F');
  
  // Add page number with modern style
  doc.setFontSize(10);
  doc.setTextColor(124, 58, 237);
  doc.setFont("Vazirmatn", "bold");
  
  // Page number pill
  doc.setFillColor(124, 58, 237, 0.1);
  doc.roundedRect(90, 279, 30, 6, 3, 3, 'F');
  doc.text(
    `صفحه ${toPersianNumbers(currentPage)} از ${toPersianNumbers(pageCount)}`, 
    105, 
    283, 
    { align: 'center' }
  );
  
  // Add app info and trainer contact
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.setFont("Vazirmatn", "normal");
  doc.text("تهیه شده توسط نرم‌افزار GymSync نسخه ۲.۱.۷", 105, 290, { align: 'center' });
  
  // Add trainer contact info if available
  if (trainerProfile.phone) {
    doc.text(`شماره تماس: ${toPersianNumbers(trainerProfile.phone)}`, 30, 290);
  }
}

// Create a styled section header
export function createSectionHeader(doc: jsPDF, title: string, yPos: number, color: number[]): number {
  // Add styled section header
  doc.setFillColor(color[0], color[1], color[2], 0.1);
  doc.roundedRect(15, yPos, 180, 10, 3, 3, 'F');
  
  doc.setFontSize(14);
  doc.setTextColor(color[0], color[1], color[2]);
  doc.setFont("Vazirmatn", "bold");
  doc.text(title, 105, yPos + 7, { align: 'center' });
  
  return yPos + 15; // Return updated Y position
}

// Configure table styles for consistent look
export function configureTableStyles(theme: string = 'primary'): any {
  const themes: Record<string, any> = {
    primary: {
      headColor: [124, 58, 237],
      altColor: [245, 240, 255]
    },
    success: {
      headColor: [39, 174, 96],
      altColor: [240, 250, 240]
    },
    warning: {
      headColor: [230, 126, 34],
      altColor: [253, 242, 233]
    },
    info: {
      headColor: [52, 152, 219],
      altColor: [235, 245, 255]
    }
  };
  
  const themeConfig = themes[theme] || themes.primary;
  
  return {
    headStyles: {
      fillColor: themeConfig.headColor,
      textColor: [255, 255, 255],
      halign: 'center',
      font: 'Vazirmatn',
      fontStyle: 'bold',
      fontSize: 12,
      cellPadding: 3,
    },
    bodyStyles: {
      halign: 'center',
      font: 'Vazirmatn',
      fontSize: 10,
      cellPadding: 3,
    },
    alternateRowStyles: {
      fillColor: themeConfig.altColor,
    },
    theme: 'grid',
    margin: { right: 15, left: 15 },
    tableWidth: 'auto',
    styles: {
      overflow: 'linebreak',
      cellWidth: 'wrap',
      fontSize: 10,
      direction: 'rtl',
    },
  };
}
