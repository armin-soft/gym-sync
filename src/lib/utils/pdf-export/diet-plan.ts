
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Student } from '@/components/students/StudentTypes';
import { toPersianNumbers } from '../numbers';
import { getDayName } from '@/lib/utils';
import { addPageFooter, createDocumentHeader } from './core';
import { TrainerProfile } from './types';
import { getMealName, getMealType } from './data-helpers';

// Create the diet plan page
export function createDietPlan(doc: jsPDF, student: Student, trainerProfile: TrainerProfile) {
  // Add document header
  createDocumentHeader(doc, student, trainerProfile, "برنامه غذایی");
  
  // Define starting Y position after header
  let yPos = 60;
  
  doc.setFontSize(13);
  doc.setTextColor(51, 153, 51);
  doc.text("برنامه غذایی", 105, yPos, { align: 'center' });
  yPos += 10;
  
  // Process each day's meal plan
  for (let day = 1; day <= 7; day++) {
    const dayKey = `mealsDay${day}` as keyof Student;
    const meals = student[dayKey] as number[] || [];
    
    if (meals && meals.length > 0) {
      // Add day header
      const dayName = getDayName(day);
      doc.setFontSize(12);
      doc.setTextColor(66, 66, 66);
      doc.text(`روز ${toPersianNumbers(day)}: ${dayName}`, 195, yPos, { align: 'right' });
      yPos += 8;
      
      // Create table for meals
      const tableData = meals.map((mealId, index) => {
        const mealName = getMealName(mealId) || `وعده ${toPersianNumbers(index + 1)}`;
        const mealType = getMealType(mealId) || '-';
        return [toPersianNumbers(index + 1), mealName, mealType];
      });
      
      autoTable(doc, {
        startY: yPos,
        head: [['ردیف', 'نام وعده', 'نوع']],
        body: tableData,
        headStyles: {
          fillColor: [39, 174, 96],
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
          fillColor: [240, 250, 240],
        },
        theme: 'grid',
        margin: { right: 15, left: 15 },
      });
      
      yPos = (doc as any).lastAutoTable.finalY + 15;
      
      // Check if we need to add a new page
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
    }
  }
  
  // Add notes if available
  if (student.mealNotes) {
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.text("نکات غذایی:", 195, yPos, { align: 'right' });
    yPos += 7;
    
    // Add notes text with line wrapping
    const splitNotes = doc.splitTextToSize(student.mealNotes, 170);
    doc.text(splitNotes, 195, yPos, { align: 'right' });
  }
  
  // Add footer
  addPageFooter(doc);
}
