
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { createPdfDocument, generatePDFPreview } from './core';
import { createExerciseProgram } from './exercise-program';
import { createDietPlan } from './diet-plan';
import { createSupplementPlan } from './supplement-plan';
import { createSharedHeader, createSharedFooter } from './shared-header';

// تابع بررسی بهتر وجود داده‌های غذایی
function checkDietData(student: Student): boolean {
  const dailyMeals = [
    student.mealsDay1,
    student.mealsDay2,
    student.mealsDay3,
    student.mealsDay4,
    student.mealsDay5,
    student.mealsDay6,
    student.mealsDay7
  ];
  
  const hasDailyMeals = dailyMeals.some(meals => meals && meals.length > 0);
  const hasGeneralMeals = student.meals && student.meals.length > 0;
  
  console.log('بررسی داده‌های غذایی در PDF:', {
    studentName: student.name,
    hasGeneralMeals,
    hasDailyMeals,
    generalMealsCount: student.meals?.length || 0,
    dailyMealsCounts: dailyMeals.map((meals, index) => ({
      day: index + 1,
      count: meals?.length || 0
    }))
  });
  
  return hasGeneralMeals || hasDailyMeals;
}

// تولید پیش‌نمایش PDF با ساختار بهینه
export const previewStudentProgramPDF = async (student: Student): Promise<string> => {
  try {
    console.log(`در حال ایجاد پیش‌نمایش PDF برای ${student.name} با ساختار بهینه`);
    const trainerProfileStr = localStorage.getItem('trainerProfile');
    const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
    const content: any[] = [];

    // بررسی وجود داده‌های واقعی شاگرد با console.log برای دیباگ
    const hasExerciseData = student.exercisesDay1?.length || student.exercisesDay2?.length || 
                           student.exercisesDay3?.length || student.exercisesDay4?.length || 
                           student.exercisesDay5?.length || student.exercises?.length;

    const hasDietData = checkDietData(student);
    const hasSupplementData = student.supplements?.length || student.vitamins?.length;

    console.log('نتایج بررسی داده‌ها:', {
      studentName: student.name,
      hasExerciseData,
      hasDietData,
      hasSupplementData
    });

    // هدر مشترک فقط یکبار در ابتدا
    content.push(...createSharedHeader(student, trainerProfile));

    // بخش برنامه تمرینی
    if (hasExerciseData) {
      content.push({
        text: 'برنامه تمرینی',
        style: 'sectionTitle',
        margin: [0, 20, 0, 15],
        color: '#7c3aed',
        direction: 'rtl'
      });
      content.push(...createExerciseProgram(student, trainerProfile));
    } else {
      content.push({
        text: 'برنامه تمرینی',
        style: 'sectionTitle',
        margin: [0, 20, 0, 15],
        color: '#7c3aed',
        direction: 'rtl'
      });
      content.push({
        text: 'هیچ برنامه تمرینی برای این شاگرد تعیین نشده است.',
        style: 'notes',
        alignment: 'center',
        direction: 'rtl',
        margin: [0, 20, 0, 40]
      });
    }

    // بخش برنامه غذایی
    if (hasDietData) {
      content.push({
        text: 'برنامه غذایی',
        style: 'sectionTitle',
        margin: [0, 20, 0, 15],
        color: '#27ae60',
        direction: 'rtl'
      });
      content.push(...createDietPlan(student, trainerProfile));
    } else {
      content.push({
        text: 'برنامه غذایی',
        style: 'sectionTitle',
        margin: [0, 20, 0, 15],
        color: '#27ae60',
        direction: 'rtl'
      });
      content.push({
        text: 'هیچ برنامه غذایی برای این شاگرد تعیین نشده است.',
        style: 'notes',
        alignment: 'center',
        direction: 'rtl',
        margin: [0, 20, 0, 40]
      });
    }

    // بخش برنامه مکمل و ویتامین
    if (hasSupplementData) {
      content.push({
        text: 'برنامه مکمل و ویتامین',
        style: 'sectionTitle',
        margin: [0, 20, 0, 15],
        color: '#e67e22',
        direction: 'rtl'
      });
      content.push(...createSupplementPlan(student, trainerProfile));
    } else {
      content.push({
        text: 'برنامه مکمل و ویتامین',
        style: 'sectionTitle',
        margin: [0, 20, 0, 15],
        color: '#e67e22',
        direction: 'rtl'
      });
      content.push({
        text: 'هیچ برنامه مکمل یا ویتامینی برای این شاگرد تعیین نشده است.',
        style: 'notes',
        alignment: 'center',
        direction: 'rtl',
        margin: [0, 20, 0, 20]
      });
    }

    // ایجاد سند PDF با هدر و پاورقی مشترک
    const docDefinition = {
      ...createPdfDocument(content),
      footer: createSharedFooter(trainerProfile)
    };

    // تولید URL پیش‌نمایش
    const previewUrl = await generatePDFPreview(docDefinition);
    console.log(`پیش‌نمایش PDF با ساختار بهینه با موفقیت ایجاد شد`);

    return previewUrl;
  } catch (error) {
    console.error("خطا در ایجاد پیش‌نمایش PDF:", error);
    throw new Error("خطا در تولید پیش‌نمایش - لطفاً مجدداً تلاش کنید");
  }
};
