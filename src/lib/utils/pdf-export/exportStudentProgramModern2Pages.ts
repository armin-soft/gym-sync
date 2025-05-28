
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { createPdfDocument, generatePDF } from './core';
import { createCustomHeader } from './custom-header';
import { createCustomFooter } from './custom-footer';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';

function getDayName(day: number) {
  const names = ['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنج‌شنبه','جمعه'];
  return names[day - 1] || '-';
}

// صفحه اول: تمرینات روزانه
function buildExerciseTable(student: Student) {
  const body = [[
    { text: 'شماره', style: 'tableHeader', alignment: 'center' },
    { text: 'روز', style: 'tableHeader', alignment: 'center' },
    { text: 'ست', style: 'tableHeader', alignment: 'center' },
    { text: 'تکرار', style: 'tableHeader', alignment: 'center' },
    { text: 'نام تمرین', style: 'tableHeader', alignment: 'center' },
  ]];

  let idx = 1;
  for (let day = 1; day <= 6; day++) {
    const dayKey = `exercisesDay${day}` as keyof Student;
    const setsKey = `exerciseSetsDay${day}` as keyof Student;
    const repsKey = `exerciseRepsDay${day}` as keyof Student;
    const exercises = student[dayKey] as number[] || [];
    const sets = student[setsKey] as Record<number, number> || {};
    const reps = student[repsKey] as Record<number, string> || {};
    exercises.forEach((ex) => {
      body.push([
        { text: toPersianDigits(idx), style: 'tableCell', alignment: 'center' },
        { text: preprocessPersianText(getDayName(day)), style: 'tableCell', alignment: 'center' },
        { text: toPersianDigits(sets[ex]?.toString() ?? '3'), style: 'tableCell', alignment: 'center' },
        { text: preprocessPersianText(reps[ex] || '۸-۱۲'), style: 'tableCell', alignment: 'center' },
        { text: preprocessPersianText('-'), style: 'tableCell', alignment: 'center' } // نام تمرین: باید با کد اصلی داده‌ها استخراج شود
      ]);
      idx++;
    });
  }
  return {
    table: { widths: ['8%', '18%', '18%', '18%', '*'], body },
    layout: 'lightHorizontalLines',
    margin: [0, 0, 0, 25],
    direction: 'rtl',
    font: 'Vazir'
  }
}

// صفحه دوم - 1: برنامه غذایی
function buildDietTable(student: Student) {
  const body = [[
    { text: 'شماره', style: 'tableHeader', alignment: 'center' },
    { text: 'روز', style: 'tableHeader', alignment: 'center' },
    { text: 'وعده غذایی', style: 'tableHeader', alignment: 'center' },
    { text: 'غذا', style: 'tableHeader', alignment: 'center' },
  ]];
  let idx = 1;
  for (let day = 1; day <= 7; day++) {
    const meals = student[`mealsDay${day}` as keyof Student] as number[] || [];
    meals.forEach((mealId) => {
      body.push([
        { text: toPersianDigits(idx), style: 'tableCell', alignment: 'center' },
        { text: preprocessPersianText(getDayName(day)), style: 'tableCell', alignment: 'center' },
        { text: preprocessPersianText('-'), style: 'tableCell', alignment: 'center' }, // نام وعده غذایی
        { text: preprocessPersianText('-'), style: 'tableCell', alignment: 'center' } // نام غذا
      ]);
      idx++;
    });
  }
  return {
    table: { widths: ['10%', '25%', '30%', '*'], body },
    layout: 'lightHorizontalLines',
    margin: [0, 0, 0, 25],
    direction: 'rtl',
    font: 'Vazir'
  }
}

// صفحه دوم - 2: مکمل و ویتامین
function buildSupplementTable(student: Student) {
  const body = [[
    { text: 'شماره', style: 'tableHeader', alignment: 'center' },
    { text: 'روز', style: 'tableHeader', alignment: 'center' },
    { text: 'دوز مصرف', style: 'tableHeader', alignment: 'center' },
    { text: 'زمان مصرف', style: 'tableHeader', alignment: 'center' },
    { text: 'مکمل یا ویتامین', style: 'tableHeader', alignment: 'center' },
  ]];
  let idx = 1;
  // فرض: دانش‌آموز مکمل و ویتامین را در روزهای مختلف مصرف می‌کند
  (student.supplements || []).forEach((s) => {
    body.push([
      { text: toPersianDigits(idx++), style: 'tableCell', alignment: 'center' },
      { text: '-', style: 'tableCell', alignment: 'center' },
      { text: '-', style: 'tableCell', alignment: 'center' },
      { text: '-', style: 'tableCell', alignment: 'center' },
      { text: '-', style: 'tableCell', alignment: 'center' },
    ]);
  });
  (student.vitamins || []).forEach((v) => {
    body.push([
      { text: toPersianDigits(idx++), style: 'tableCell', alignment: 'center' },
      { text: '-', style: 'tableCell', alignment: 'center' },
      { text: '-', style: 'tableCell', alignment: 'center' },
      { text: '-', style: 'tableCell', alignment: 'center' },
      { text: '-', style: 'tableCell', alignment: 'center' },
    ]);
  });
  return {
    table: { widths: ['10%', '16%', '22%', '22%', '*'], body },
    layout: 'lightHorizontalLines',
    margin: [0, 0, 0, 25],
    direction: 'rtl',
    font: 'Vazir'
  }
}

// صادرکننده نهایی
export const exportStudentProgramModern2Pages = async (student: Student) => {
  // دریافت پروفایل مربی از localStorage
  const trainerProfileStr = localStorage.getItem('trainerProfile');
  const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {};

  // ساختار محتوا
  const content: any[] = [];
  // هدر
  content.push(...createCustomHeader(student, trainerProfile));

  // صفحه اول: برنامه تمرینی
  content.push(buildExerciseTable(student));

  // page break: پشت
  content.push({ text: '', pageBreak: 'after' });

  // صفحه دوم - برنامه غذایی
  content.push(buildDietTable(student));
  // صفحه دوم داخلی (بعدی): مکمل و ویتامین
  content.push(buildSupplementTable(student));

  // پاورقی
  const docDefinition = {
    ...createPdfDocument(content),
    footer: createCustomFooter(),
    defaultStyle: {
      font: 'Vazir',
      fontSize: 12,
      alignment: 'right',
      direction: 'rtl'
    }
  };

  const fileName = `برنامه_${student.name ?? 'شاگرد'}.pdf`;
  await generatePDF(docDefinition, fileName);
};
