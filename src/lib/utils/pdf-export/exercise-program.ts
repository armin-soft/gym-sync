
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Student } from '@/components/students/StudentTypes';
import { toPersianNumbers } from '../numbers';
import { getDayName } from '@/lib/utils';
import { addPageFooter, createDocumentHeader, createSectionHeader, configureTableStyles } from './core';
import { TrainerProfile } from './types';
import { getExerciseName } from './data-helpers';

// Create the exercise program page
export function createExerciseProgram(doc: jsPDF, student: Student, trainerProfile: TrainerProfile) {
  // Add document header
  createDocumentHeader(doc, student, trainerProfile, "برنامه تمرینی");
  
  // Define starting Y position after header
  let yPos = 120;
  
  // Add program introduction
  yPos = createSectionHeader(doc, "برنامه تمرینی", yPos, [124, 58, 237]);
  
  // Process each training day
  for (let day = 1; day <= 5; day++) {
    const dayKey = `exercisesDay${day}` as keyof Student;
    const daySetKey = `exerciseSetsDay${day}` as keyof Student;
    const dayRepsKey = `exerciseRepsDay${day}` as keyof Student;
    
    const exercises = student[dayKey] as number[] || [];
    const sets = student[daySetKey] as Record<number, number> || {};
    const reps = student[dayRepsKey] as Record<number, string> || {};
    
    if (exercises && exercises.length > 0) {
      // Add day header with styled box
      const dayName = getDayName(day);
      doc.setFillColor(124, 58, 237, 0.05);
      doc.roundedRect(15, yPos - 5, 180, 10, 2, 2, 'F');
      
      doc.setFontSize(13);
      doc.setTextColor(124, 58, 237);
      doc.setFont("Vazirmatn", "bold");
      doc.text(`روز ${toPersianNumbers(day)}: ${dayName}`, 190, yPos + 2, { align: 'right' });
      yPos += 10;
      
      // Create table for exercises with improved styling
      const tableData = exercises.map((exerciseId, index) => {
        const exerciseName = getExerciseName(exerciseId) || `تمرین ${toPersianNumbers(index + 1)}`;
        const setCount = sets[exerciseId] ? toPersianNumbers(sets[exerciseId]) : '-';
        const repInfo = reps[exerciseId] || '-';
        return [toPersianNumbers(index + 1), exerciseName, setCount, repInfo];
      });
      
      // Apply table styling based on centralized configuration
      autoTable(doc, {
        startY: yPos,
        head: [['ردیف', 'نام تمرین', 'ست', 'تکرار']],
        body: tableData,
        ...configureTableStyles('primary'),
        columnStyles: {
          0: { cellWidth: 15 },
          1: { cellWidth: 'auto' },
          2: { cellWidth: 20 },
          3: { cellWidth: 30 },
        },
      });
      
      yPos = (doc as any).lastAutoTable.finalY + 15;
      
      // Check if we need to add a new page
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
    }
  }
  
  // Add notes if available with modern styling
  if (student.notes) {
    // Create notes section with styled header
    yPos = createSectionHeader(doc, "نکات تمرینی", yPos, [124, 58, 237]);
    
    // Add styled notes box
    doc.setFillColor(248, 246, 255);
    doc.roundedRect(15, yPos, 180, 30, 3, 3, 'F');
    
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.setFont("Vazirmatn", "normal");
    
    // Add notes text with line wrapping
    const splitNotes = doc.splitTextToSize(student.notes, 165);
    doc.text(splitNotes, 185, yPos + 7, { align: 'right' });
  }
  
  // Add footer
  addPageFooter(doc, trainerProfile);
}
