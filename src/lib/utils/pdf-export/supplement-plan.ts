
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Student } from '@/components/students/StudentTypes';
import { toPersianNumbers } from '../numbers';
import { addPageFooter, createDocumentHeader, createSectionHeader, configureTableStyles } from './core';
import { TrainerProfile } from './types';
import { getSupplementName, getSupplementType } from './data-helpers';

// Create the supplements and vitamins page
export function createSupplementPlan(doc: jsPDF, student: Student, trainerProfile: TrainerProfile) {
  // Add document header
  createDocumentHeader(doc, student, trainerProfile, "مکمل و ویتامین");
  
  // Define starting Y position after header
  let yPos = 120;
  
  // Process supplements
  if (student.supplements && student.supplements.length > 0) {
    // Add section header for supplements
    yPos = createSectionHeader(doc, "مکمل‌های پیشنهادی", yPos, [230, 126, 34]);
    
    // Create table for supplements with improved styling
    const tableData = student.supplements.map((suppId, index) => {
      const suppName = getSupplementName(suppId) || `مکمل ${toPersianNumbers(index + 1)}`;
      const suppType = getSupplementType(suppId) || '-';
      return [toPersianNumbers(index + 1), suppName, suppType];
    });
    
    // Apply table styling based on centralized configuration
    autoTable(doc, {
      startY: yPos,
      head: [['ردیف', 'نام مکمل', 'نوع']],
      body: tableData,
      ...configureTableStyles('warning'),
      columnStyles: {
        0: { cellWidth: 15, halign: 'center' },
        1: { cellWidth: 'auto', halign: 'right' },
        2: { cellWidth: 40, halign: 'center' },
      },
      didDrawCell: (data) => {
        // Add special styling for cells if needed
      },
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 15;
    
    // Check if we need to add a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
  }
  
  // Process vitamins
  if (student.vitamins && student.vitamins.length > 0) {
    // Add section header for vitamins
    yPos = createSectionHeader(doc, "ویتامین‌های پیشنهادی", yPos, [155, 89, 182]);
    
    // Create table for vitamins with improved styling
    const tableData = student.vitamins.map((vitaminId, index) => {
      const vitaminName = getSupplementName(vitaminId) || `ویتامین ${toPersianNumbers(index + 1)}`;
      const vitaminType = getSupplementType(vitaminId) || '-';
      return [toPersianNumbers(index + 1), vitaminName, vitaminType];
    });
    
    // Apply table styling based on centralized configuration
    autoTable(doc, {
      startY: yPos,
      head: [['ردیف', 'نام ویتامین', 'نوع']],
      body: tableData,
      ...configureTableStyles('info'),
      columnStyles: {
        0: { cellWidth: 15, halign: 'center' },
        1: { cellWidth: 'auto', halign: 'right' },
        2: { cellWidth: 40, halign: 'center' },
      },
      didDrawCell: (data) => {
        // Add special styling for cells if needed
      },
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 15;
  }
  
  // Add any additional notes with modern styling
  if (student.notes) {
    // Create notes section with styled header
    yPos = createSectionHeader(doc, "نکات مصرف مکمل", yPos, [230, 126, 34]);
    
    // Add styled notes box
    doc.setFillColor(253, 242, 233);
    doc.roundedRect(15, yPos, 180, 30, 3, 3, 'F');
    
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.setFont("Vazirmatn", "normal");
    
    // Add notes text with line wrapping
    const splitNotes = doc.splitTextToSize(student.notes || "", 165);
    doc.text(splitNotes, 105, yPos + 7, { align: 'center' });
  }
  
  // Add footer
  addPageFooter(doc, trainerProfile);
}
