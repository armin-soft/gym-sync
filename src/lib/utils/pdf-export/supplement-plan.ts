
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Student } from '@/components/students/StudentTypes';
import { toPersianNumbers } from '../numbers';
import { addPageFooter, createDocumentHeader } from './core';
import { TrainerProfile } from './types';
import { getSupplementName, getSupplementType } from './data-helpers';

// Create the supplements and vitamins page
export function createSupplementPlan(doc: jsPDF, student: Student, trainerProfile: TrainerProfile) {
  // Add document header
  createDocumentHeader(doc, student, trainerProfile, "مکمل و ویتامین");
  
  // Define starting Y position after header
  let yPos = 60;
  
  doc.setFontSize(13);
  doc.setTextColor(230, 126, 34);
  doc.text("مکمل و ویتامین", 105, yPos, { align: 'center' });
  yPos += 10;
  
  // Process supplements
  if (student.supplements && student.supplements.length > 0) {
    doc.setFontSize(12);
    doc.setTextColor(66, 66, 66);
    doc.text("مکمل‌ها:", 195, yPos, { align: 'right' });
    yPos += 8;
    
    const tableData = student.supplements.map((suppId, index) => {
      const suppName = getSupplementName(suppId) || `مکمل ${toPersianNumbers(index + 1)}`;
      const suppType = getSupplementType(suppId) || '-';
      return [toPersianNumbers(index + 1), suppName, suppType];
    });
    
    autoTable(doc, {
      startY: yPos,
      head: [['ردیف', 'نام مکمل', 'نوع']],
      body: tableData,
      headStyles: {
        fillColor: [230, 126, 34],
        textColor: [255, 255, 255],
        halign: 'right',
        font: 'helvetica',
        fontStyle: 'bold',
      },
      bodyStyles: {
        halign: 'right',
        font: 'helvetica',
      },
      alternateRowStyles: {
        fillColor: [253, 242, 233],
      },
      theme: 'grid',
      margin: { right: 15, left: 15 },
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 15;
  }
  
  // Process vitamins
  if (student.vitamins && student.vitamins.length > 0) {
    doc.setFontSize(12);
    doc.setTextColor(66, 66, 66);
    doc.text("ویتامین‌ها:", 195, yPos, { align: 'right' });
    yPos += 8;
    
    const tableData = student.vitamins.map((vitaminId, index) => {
      const vitaminName = getSupplementName(vitaminId) || `ویتامین ${toPersianNumbers(index + 1)}`;
      const vitaminType = getSupplementType(vitaminId) || '-';
      return [toPersianNumbers(index + 1), vitaminName, vitaminType];
    });
    
    autoTable(doc, {
      startY: yPos,
      head: [['ردیف', 'نام ویتامین', 'نوع']],
      body: tableData,
      headStyles: {
        fillColor: [155, 89, 182],
        textColor: [255, 255, 255],
        halign: 'right',
        font: 'helvetica',
        fontStyle: 'bold',
      },
      bodyStyles: {
        halign: 'right',
        font: 'helvetica',
      },
      alternateRowStyles: {
        fillColor: [242, 235, 253],
      },
      theme: 'grid',
      margin: { right: 15, left: 15 },
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 15;
  }
  
  // Add any additional notes
  if (student.notes) {
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.text("نکات تکمیلی:", 195, yPos, { align: 'right' });
    yPos += 7;
    
    // Add notes text with line wrapping
    const splitNotes = doc.splitTextToSize(student.notes, 170);
    doc.text(splitNotes, 195, yPos, { align: 'right' });
  }
  
  // Add footer
  addPageFooter(doc);
}
