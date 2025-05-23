
import jsPDF from 'jspdf';
import { PDFOptions, TrainerProfile } from './types';
import { Student } from '@/components/students/StudentTypes';
import { getCurrentPersianDate } from '../persianDate';
import { toPersianNumbers } from '../numbers';

// Configure jsPDF with right-to-left support
export const PDF_OPTIONS: PDFOptions = {
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4',
  hotfixes: ["px_scaling"],
  compress: true,
};

// Add Vazirmatn font for Persian text
export const addFontToPdf = (doc: jsPDF): jsPDF => {
  // Font would be added here in a real implementation
  doc.setFont("helvetica"); // Fallback to standard font
  return doc;
};

// Create the header for each page
export function createDocumentHeader(doc: jsPDF, student: Student, trainerProfile: TrainerProfile, pageTitle: string) {
  // Background for header
  doc.setFillColor(250, 250, 255);
  doc.rect(0, 0, 210, 40, 'F');
  
  // Add logo/gym name
  doc.setFontSize(16);
  doc.setTextColor(124, 58, 237);
  doc.text(trainerProfile.gymName || "برنامه مدیریت باشگاه", 105, 15, { align: 'center' });
  
  // Add trainer name
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`مربی: ${trainerProfile.name || "-"}`, 105, 25, { align: 'center' });
  
  // Add page title
  doc.setFontSize(14);
  doc.setTextColor(80, 80, 80);
  doc.text(pageTitle, 15, 15);
  
  // Add divider line
  doc.setDrawColor(220, 220, 220);
  doc.line(15, 40, 195, 40);
  
  // Add student info
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  
  // Right side info
  doc.text(`نام: ${student.name || "-"}`, 195, 50, { align: 'right' });
  
  // Middle info
  if (student.gender) {
    const genderText = student.gender === 'male' ? 'مرد' : 'زن';
    doc.text(`جنسیت: ${genderText}`, 120, 50, { align: 'right' });
  }
  
  // Left side info
  const today = getCurrentPersianDate();
  doc.text(`تاریخ: ${today}`, 60, 50, { align: 'right' });
}

// Add footer to each page
export function addPageFooter(doc: jsPDF) {
  const pageCount = doc.getNumberOfPages();
  const currentPage = doc.getCurrentPageInfo().pageNumber;
  
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  
  // Add page number
  doc.text(
    `صفحه ${toPersianNumbers(currentPage)} از ${toPersianNumbers(pageCount)}`, 
    105, 
    285, 
    { align: 'center' }
  );
  
  // Add app info
  doc.text("تهیه شده توسط نرم‌افزار GymSync", 105, 290, { align: 'center' });
}
