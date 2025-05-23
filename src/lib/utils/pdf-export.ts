import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Student } from '@/components/students/StudentTypes';
import { toPersianNumbers } from './numbers';
import { getDayName } from '@/lib/utils';
import { getCurrentPersianDate } from './persianDate';

// Configure jsPDF with right-to-left support
const PDF_OPTIONS = {
  orientation: 'portrait' as const,
  unit: 'mm' as const,
  format: 'a4',
  hotfixes: ["px_scaling"],
  compress: true,
};

// Add Vazirmatn font for Persian text
// This is a simplification - in a real app you'd need to include the font file
const addFontToPdf = (doc: jsPDF) => {
  // Font would be added here in a real implementation
  doc.setFont("helvetica"); // Fallback to standard font
  return doc;
};

export const exportStudentProgramToPdf = async (student: Student): Promise<void> => {
  // Create a new PDF document
  const doc = new jsPDF(PDF_OPTIONS);
  
  // Add Persian font (simplified for this example)
  addFontToPdf(doc);
  
  try {
    // Get trainer profile from localStorage
    const trainerProfileStr = localStorage.getItem('trainerProfile');
    const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {};
    
    // Page 1: Exercise Program
    createExerciseProgram(doc, student, trainerProfile);
    
    // Page 2: Diet Plan
    doc.addPage();
    createDietPlan(doc, student, trainerProfile);
    
    // Page 3: Supplements and Vitamins
    doc.addPage();
    createSupplementPlan(doc, student, trainerProfile);
    
    // Save the PDF with a filename based on the student's name
    const currentDate = new Date().toISOString().split('T')[0];
    const fileName = `برنامه_${student.name}_${currentDate}.pdf`;
    
    doc.save(fileName);
    
    return Promise.resolve();
  } catch (error) {
    console.error("Error generating PDF:", error);
    return Promise.reject(error);
  }
};

// Create the exercise program page
function createExerciseProgram(doc: jsPDF, student: Student, trainerProfile: any) {
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

// Create the diet plan page
function createDietPlan(doc: jsPDF, student: Student, trainerProfile: any) {
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

// Create the supplements and vitamins page
function createSupplementPlan(doc: jsPDF, student: Student, trainerProfile: any) {
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

// Create the header for each page
function createDocumentHeader(doc: jsPDF, student: Student, trainerProfile: any, pageTitle: string) {
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
function addPageFooter(doc: jsPDF) {
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

// Helper functions to get name information from IDs
function getExerciseName(exerciseId: number): string {
  try {
    const exercisesStr = localStorage.getItem('exercises');
    if (!exercisesStr) return '';
    
    const exercises = JSON.parse(exercisesStr);
    const exercise = exercises.find((ex: any) => ex.id === exerciseId);
    return exercise ? exercise.name : '';
  } catch (e) {
    console.error("Error getting exercise name:", e);
    return '';
  }
}

function getMealName(mealId: number): string {
  try {
    const mealsStr = localStorage.getItem('meals');
    if (!mealsStr) return '';
    
    const meals = JSON.parse(mealsStr);
    const meal = meals.find((m: any) => m.id === mealId);
    return meal ? meal.name : '';
  } catch (e) {
    console.error("Error getting meal name:", e);
    return '';
  }
}

function getMealType(mealId: number): string {
  try {
    const mealsStr = localStorage.getItem('meals');
    if (!mealsStr) return '';
    
    const meals = JSON.parse(mealsStr);
    const meal = meals.find((m: any) => m.id === mealId);
    return meal ? meal.type : '';
  } catch (e) {
    console.error("Error getting meal type:", e);
    return '';
  }
}

function getSupplementName(supplementId: number): string {
  try {
    const supplementsStr = localStorage.getItem('supplements');
    if (!supplementsStr) return '';
    
    const supplements = JSON.parse(supplementsStr);
    const supplement = supplements.find((s: any) => s.id === supplementId);
    return supplement ? supplement.name : '';
  } catch (e) {
    console.error("Error getting supplement name:", e);
    return '';
  }
}

function getSupplementType(supplementId: number): string {
  try {
    const supplementsStr = localStorage.getItem('supplements');
    if (!supplementsStr) return '';
    
    const supplements = JSON.parse(supplementsStr);
    const supplement = supplements.find((s: any) => s.id === supplementId);
    return supplement ? supplement.type : '';
  } catch (e) {
    console.error("Error getting supplement type:", e);
    return '';
  }
}
