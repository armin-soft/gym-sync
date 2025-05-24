
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { createPdfDocument, generatePDF } from './core';
import { createExerciseProgram } from './exercise-program';
import { createDietPlan } from './diet-plan';
import { createSupplementPlan } from './supplement-plan';
import { getCurrentPersianDate } from '../persianDate';

// تولید گزارش کامل PDF - فقط 3 صفحه
export const generateComprehensiveReport = async (student: Student): Promise<void> => {
  try {
    console.log(`در حال تولید گزارش کامل برای ${student.name}`);
    const trainerProfileStr = localStorage.getItem('trainerProfile');
    const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
    const content: any[] = [];

    // صفحه ۱: برنامه تمرینی
    content.push({
      text: `گزارش جامع ${student.name}`,
      style: 'documentTitle',
      margin: [0, 0, 0, 20],
      color: '#4f46e5'
    });

    content.push({
      text: getCurrentPersianDate(),
      style: 'subheader',
      alignment: 'center',
      margin: [0, 0, 0, 20]
    });

    content.push(...createExerciseProgram(student, trainerProfile));

    // صفحه ۲: برنامه غذایی
    content.push({ text: '', pageBreak: 'before' });
    content.push(...createDietPlan(student, trainerProfile));

    // صفحه ۳: برنامه مکمل
    content.push({ text: '', pageBreak: 'before' });
    content.push(...createSupplementPlan(student, trainerProfile));

    const docDefinition = createPdfDocument(content);
    const fileName = `گزارش_کامل_${student.name?.replace(/\s/g, '_')}_${getCurrentPersianDate().replace(/\s/g, '_')}.pdf`;
    await generatePDF(docDefinition, fileName);

    console.log(`گزارش کامل با موفقیت تولید شد`);
  } catch (error) {
    console.error("خطا در تولید گزارش کامل:", error);
    throw error;
  }
};
