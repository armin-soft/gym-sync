
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Student } from '@/components/students/StudentTypes';
import { toPersianNumbers } from '../numbers';
import { getDayName } from '@/lib/utils';
import { addPageFooter, createSectionHeader, configureTableStyles } from './core';
import { TrainerProfile } from './types';
import { getExerciseName } from './data-helpers';

// Create the exercise program page with all days on a single page
export async function createExerciseProgram(doc: jsPDF, student: Student, trainerProfile: TrainerProfile, showHeader = true) {
  // Define starting Y position
  let yPos = showHeader ? 120 : 20;
  
  // Add program introduction
  yPos = createSectionHeader(doc, "برنامه تمرینی هفتگی", yPos, [124, 58, 237]);
  
  // Calculate number of exercise days (max 5)
  const totalDays = 5;
  const daysPerRow = 2;
  const tableWidth = 85; // Width for each table
  const gap = 10; // Gap between tables
  
  // Process each training day in a grid layout
  for (let row = 0; row < Math.ceil(totalDays / daysPerRow); row++) {
    let maxRowHeight = 0;
    
    for (let col = 0; col < daysPerRow; col++) {
      const day = row * daysPerRow + col + 1;
      
      if (day > totalDays) break;
      
      const dayKey = `exercisesDay${day}` as keyof Student;
      const daySetKey = `exerciseSetsDay${day}` as keyof Student;
      const dayRepsKey = `exerciseRepsDay${day}` as keyof Student;
      
      const exercises = student[dayKey] as number[] || [];
      const sets = student[daySetKey] as Record<number, number> || {};
      const reps = student[dayRepsKey] as Record<number, string> || {};
      
      if (exercises && exercises.length > 0) {
        // Calculate X position for this table
        const xPos = 15 + (col * (tableWidth + gap));
        
        // Add day header with styled box
        const dayName = getDayName(day);
        doc.setFillColor(124, 58, 237, 0.1);
        doc.roundedRect(xPos, yPos, tableWidth, 10, 2, 2, 'F');
        
        doc.setFontSize(11);
        doc.setTextColor(124, 58, 237);
        doc.text(`روز ${toPersianNumbers(day)}: ${dayName}`, xPos + tableWidth/2, yPos + 7, { align: 'center' });
        
        // Create table for exercises with improved styling
        const tableData = exercises.map((exerciseId, index) => {
          const exerciseName = getExerciseName(exerciseId) || `تمرین ${toPersianNumbers(index + 1)}`;
          const setCount = sets[exerciseId] ? toPersianNumbers(sets[exerciseId]) : '-';
          const repInfo = reps[exerciseId] || '-';
          return [toPersianNumbers(index + 1), exerciseName, setCount, repInfo];
        });
        
        // Apply table styling based on centralized configuration
        autoTable(doc, {
          startY: yPos + 12,
          margin: { left: xPos },
          head: [['#', 'تمرین', 'ست', 'تکرار']],
          body: tableData,
          ...configureTableStyles('primary'),
          tableWidth: tableWidth,
          styles: {
            fontSize: 8,
            cellPadding: 2,
            overflow: 'linebreak',
            halign: 'right',
            valign: 'middle'
          },
          columnStyles: {
            0: { cellWidth: 8, halign: 'center' },
            1: { cellWidth: 'auto', halign: 'right' },
            2: { cellWidth: 12, halign: 'center' },
            3: { cellWidth: 20, halign: 'center' },
          }
        });
        
        // Track the tallest table in this row
        const tableHeight = (doc as any).lastAutoTable.finalY - yPos;
        if (tableHeight > maxRowHeight) {
          maxRowHeight = tableHeight;
        }
      }
    }
    
    // Move to the next row based on the tallest table in the current row
    yPos += maxRowHeight + 15;
    
    // Check if we need to add a new page
    if (yPos > 250 && row < Math.ceil(totalDays / daysPerRow) - 1) {
      doc.addPage();
      yPos = 20;
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
    
    // Add notes text with line wrapping
    const splitNotes = doc.splitTextToSize(student.notes, 165);
    doc.text(splitNotes, 105, yPos + 7, { align: 'center' });
  }
  
  // Add footer
  await addPageFooter(doc, trainerProfile);
}
