
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Student } from '@/components/students/StudentTypes';
import { toPersianNumbers } from '../numbers';
import { getDayName } from '@/lib/utils';
import { addPageFooter, createDocumentHeader } from './core';
import { TrainerProfile } from './types';
import { getExerciseName } from './data-helpers';

// Create the exercise program page
export function createExerciseProgram(doc: jsPDF, student: Student, trainerProfile: TrainerProfile) {
  // Add document header
  createDocumentHeader(doc, student, trainerProfile, "برنامه تمرینی");
  
  // Define starting Y position after header
  let yPos = 60;
  
  doc.setFontSize(13);
  doc.setTextColor(51, 51, 153);
  doc.text("برنامه تمرینی", 105, yPos, { align: 'center' });
  yPos += 10;
  
  // Process each training day
  for (let day = 1; day <= 5; day++) {
    const dayKey = `exercisesDay${day}` as keyof Student;
    const daySetKey = `exerciseSetsDay${day}` as keyof Student;
    const dayRepsKey = `exerciseRepsDay${day}` as keyof Student;
    
    const exercises = student[dayKey] as number[] || [];
    const sets = student[daySetKey] as Record<number, number> || {};
    const reps = student[dayRepsKey] as Record<number, string> || {};
    
    if (exercises && exercises.length > 0) {
      // Add day header
      const dayName = getDayName(day);
      doc.setFontSize(12);
      doc.setTextColor(66, 66, 66);
      doc.text(`روز ${toPersianNumbers(day)}: ${dayName}`, 195, yPos, { align: 'right' });
      yPos += 8;
      
      // Create table for exercises
      const tableData = exercises.map((exerciseId, index) => {
        const exerciseName = getExerciseName(exerciseId) || `تمرین ${toPersianNumbers(index + 1)}`;
        const setCount = sets[exerciseId] ? toPersianNumbers(sets[exerciseId]) : '-';
        const repInfo = reps[exerciseId] || '-';
        return [toPersianNumbers(index + 1), exerciseName, setCount, repInfo];
      });
      
      autoTable(doc, {
        startY: yPos,
        head: [['ردیف', 'نام تمرین', 'ست', 'تکرار']],
        body: tableData,
        headStyles: {
          fillColor: [124, 58, 237],
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
          fillColor: [240, 240, 250],
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
  if (student.notes) {
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.text("نکات:", 195, yPos, { align: 'right' });
    yPos += 7;
    
    // Add notes text with line wrapping
    const splitNotes = doc.splitTextToSize(student.notes, 170);
    doc.text(splitNotes, 195, yPos, { align: 'right' });
  }
  
  // Add footer
  addPageFooter(doc);
}
