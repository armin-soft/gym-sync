
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Student } from '@/components/students/StudentTypes';
import { toPersianNumbers } from '../numbers';
import { getDayName } from '@/lib/utils';
import { addPageFooter, createSectionHeader, configureTableStyles } from './core';
import { TrainerProfile } from './types';
import { getMealName, getMealType } from './data-helpers';

// Create the diet plan page with all days on a single page
export async function createDietPlan(doc: jsPDF, student: Student, trainerProfile: TrainerProfile, showHeader = true) {
  // Define starting Y position
  let yPos = showHeader ? 120 : 20;
  
  // Add section header
  yPos = createSectionHeader(doc, "برنامه غذایی هفتگی", yPos, [39, 174, 96]);
  
  // Process each day's meal plan in a single page layout
  for (let day = 1; day <= 7; day++) {
    const dayKey = `mealsDay${day}` as keyof Student;
    const meals = student[dayKey] as number[] || [];
    
    if (meals && meals.length > 0) {
      // Add day header with styled box
      const dayName = getDayName(day);
      doc.setFillColor(39, 174, 96, 0.1);
      doc.roundedRect(15, yPos, 180, 10, 2, 2, 'F');
      
      doc.setFontSize(12);
      doc.setTextColor(39, 174, 96);
      doc.setFont("Vazirmatn", "bold");
      doc.text(`روز ${toPersianNumbers(day)}: ${dayName}`, 105, yPos + 7, { align: 'center' });
      yPos += 15;
      
      // Create table for meals with improved styling
      const tableData = meals.map((mealId, index) => {
        const mealName = getMealName(mealId) || `وعده ${toPersianNumbers(index + 1)}`;
        const mealType = getMealType(mealId) || '-';
        return [toPersianNumbers(index + 1), mealName, mealType];
      });
      
      // Apply table styling based on centralized configuration
      autoTable(doc, {
        startY: yPos,
        head: [['ردیف', 'نام وعده', 'نوع']],
        body: tableData,
        ...configureTableStyles('success'),
        columnStyles: {
          0: { cellWidth: 15, halign: 'center' },
          1: { cellWidth: 'auto', halign: 'right' },
          2: { cellWidth: 40, halign: 'center' },
        },
        styles: {
          fontSize: 9,
          cellPadding: 3,
        }
      });
      
      yPos = (doc as any).lastAutoTable.finalY + 10;
      
      // Check if we need to add a new page
      if (yPos > 250 && day < 7) {
        doc.addPage();
        yPos = 20;
      }
    }
  }
  
  // Add notes if available with modern styling
  if (student.mealNotes) {
    // Create notes section with styled header
    yPos = createSectionHeader(doc, "نکات تغذیه‌ای", yPos, [39, 174, 96]);
    
    // Add styled notes box
    doc.setFillColor(240, 250, 240);
    doc.roundedRect(15, yPos, 180, 30, 3, 3, 'F');
    
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.setFont("Vazirmatn", "normal");
    
    // Add notes text with line wrapping
    const splitNotes = doc.splitTextToSize(student.mealNotes, 165);
    doc.text(splitNotes, 105, yPos + 7, { align: 'center' });
  }
  
  // Add footer
  await addPageFooter(doc, trainerProfile);
}
