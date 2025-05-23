
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Student } from '@/components/students/StudentTypes';
import { toPersianNumbers } from '../numbers';
import { addPageFooter, createSectionHeader, configureTableStyles } from './core';
import { TrainerProfile } from './types';
import { getSupplementName, getSupplementType } from './data-helpers';

// Create the supplements and vitamins page with a 4-section layout
export async function createSupplementPlan(doc: jsPDF, student: Student, trainerProfile: TrainerProfile, showHeader = true) {
  // Define starting Y position
  let yPos = showHeader ? 120 : 20;
  
  // Add section header
  yPos = createSectionHeader(doc, "برنامه مکمل و ویتامین", yPos, [230, 126, 34]);
  
  // Define grid layout for supplements and vitamins
  const gridWidth = 85;
  const gridGap = 10;
  const gridColumns = 2;
  
  // Process supplements in a grid layout (2x2)
  if (student.supplements && student.supplements.length > 0) {
    // Add heading for supplements section
    doc.setFontSize(14);
    doc.setTextColor(230, 126, 34);
    doc.setFont("Vazirmatn", "bold");
    doc.text("مکمل‌های پیشنهادی", 105, yPos + 5, { align: 'center' });
    yPos += 10;
    
    // Create supplements table - first section (top-right)
    const supplementsData = student.supplements.map((suppId, index) => {
      const suppName = getSupplementName(suppId) || `مکمل ${toPersianNumbers(index + 1)}`;
      const suppType = getSupplementType(suppId) || '-';
      return [toPersianNumbers(index + 1), suppName, suppType];
    });
    
    // Position at top-right quadrant
    autoTable(doc, {
      startY: yPos,
      margin: { left: 15 },
      head: [['#', 'نام مکمل', 'نوع']],
      body: supplementsData,
      ...configureTableStyles('warning'),
      tableWidth: gridWidth,
      styles: {
        fontSize: 9,
        cellPadding: 2,
      },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 'auto', halign: 'right' },
        2: { cellWidth: 25, halign: 'center' },
      }
    });
    
    const supplementsHeight = (doc as any).lastAutoTable.finalY - yPos;
  }
  
  // Process vitamins
  if (student.vitamins && student.vitamins.length > 0) {
    // Position at top-left quadrant (next to supplements)
    const vitaminData = student.vitamins.map((vitaminId, index) => {
      const vitaminName = getSupplementName(vitaminId) || `ویتامین ${toPersianNumbers(index + 1)}`;
      const vitaminType = getSupplementType(vitaminId) || '-';
      return [toPersianNumbers(index + 1), vitaminName, vitaminType];
    });
    
    // Add heading for vitamins (top-left section)
    doc.setFontSize(14);
    doc.setTextColor(155, 89, 182);
    doc.setFont("Vazirmatn", "bold");
    doc.text("ویتامین‌های پیشنهادی", gridWidth + gridGap + 15 + gridWidth/2, yPos + 5, { align: 'center' });
    
    // Position at top-left quadrant
    autoTable(doc, {
      startY: yPos + 10,
      margin: { left: 15 + gridWidth + gridGap },
      head: [['#', 'نام ویتامین', 'نوع']],
      body: vitaminData,
      ...configureTableStyles('info'),
      tableWidth: gridWidth,
      styles: {
        fontSize: 9,
        cellPadding: 2,
      },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 'auto', halign: 'right' },
        2: { cellWidth: 25, halign: 'center' },
      }
    });
  }
  
  // Move down for the second row of the grid
  yPos = Math.max((doc as any).lastAutoTable?.finalY || yPos + 80) + 15;
  
  // Add any additional notes with modern styling
  if (student.supplementNotes) {
    // Create notes section with styled header
    yPos = createSectionHeader(doc, "نکات مصرف مکمل", yPos, [230, 126, 34]);
    
    // Add styled notes box
    doc.setFillColor(253, 242, 233);
    doc.roundedRect(15, yPos, 180, 30, 3, 3, 'F');
    
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.setFont("Vazirmatn", "normal");
    
    // Add notes text with line wrapping
    const splitNotes = doc.splitTextToSize(student.supplementNotes || "", 165);
    doc.text(splitNotes, 105, yPos + 7, { align: 'center' });
  }
  
  // Add footer
  await addPageFooter(doc, trainerProfile);
}
