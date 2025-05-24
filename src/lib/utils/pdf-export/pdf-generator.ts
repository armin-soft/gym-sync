import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { getDayName } from '@/lib/utils';
import { getExerciseName, getMealName, getMealType, getSupplementName } from './data-helpers';

// تنظیم فونت‌ها
pdfMake.vfs = pdfFonts;

// تولید PDF با طراحی مشابه HTML
export const generateStudentProgramPDF = async (student: Student): Promise<void> => {
  try {
    console.log("در حال ایجاد PDF");
    
    // دریافت پروفایل مربی
    const trainerProfileStr = localStorage.getItem('trainerProfile');
    const trainerProfile = trainerProfileStr ? JSON.parse(trainerProfileStr) : {} as TrainerProfile;
    
    // آماده‌سازی داده‌های تمرینات
    const exercises: Array<{
      index: number;
      name: string;
      sets: string;
      reps: string;
    }> = [];
    
    let exerciseIndex = 1;
    const maxDays = 5;
    
    for (let day = 1; day <= maxDays; day++) {
      const dayKey = `exercisesDay${day}` as keyof Student;
      const daySetKey = `exerciseSetsDay${day}` as keyof Student;
      const dayRepsKey = `exerciseRepsDay${day}` as keyof Student;
      
      const exercisesList = student[dayKey] as number[] || [];
      const sets = student[daySetKey] as Record<number, number> || {};
      const reps = student[dayRepsKey] as Record<number, string> || {};
      
      if (exercisesList && exercisesList.length > 0) {
        exercisesList.forEach((exerciseId) => {
          const exerciseName = getExerciseName(exerciseId) || `تمرین ${toPersianDigits(exerciseIndex)}`;
          const setCount = sets[exerciseId] ? toPersianDigits(sets[exerciseId]) : '-';
          const repInfo = reps[exerciseId] || '-';
          
          exercises.push({
            index: exerciseIndex,
            name: exerciseName,
            sets: setCount,
            reps: toPersianDigits(repInfo)
          });
          
          exerciseIndex++;
        });
      }
    }
    
    // آماده‌سازی داده‌های غذایی
    const meals: Array<{
      index: number;
      day: string;
      mealType: string;
      name: string;
    }> = [];
    
    let mealIndex = 1;
    
    for (let day = 1; day <= 7; day++) {
      const dayKey = `mealsDay${day}` as keyof Student;
      const mealsList = student[dayKey] as number[] || [];
      
      if (mealsList && mealsList.length > 0) {
        const dayName = getDayName(day);
        
        mealsList.forEach((mealId) => {
          const mealName = getMealName(mealId) || '-';
          const mealType = getMealType(mealId) || '-';
          
          meals.push({
            index: mealIndex,
            day: dayName,
            mealType: mealType,
            name: mealName
          });
          
          mealIndex++;
        });
      }
    }
    
    // آماده‌سازی داده‌های مکمل‌ها
    const supplements: Array<{
      index: number;
      name: string;
      dosage: string;
      timing: string;
    }> = [];
    
    let supplementIndex = 1;
    
    if (student.supplements && student.supplements.length > 0) {
      student.supplements.forEach((suppId) => {
        const supplementName = getSupplementName(suppId) || `مکمل ${toPersianDigits(supplementIndex)}`;
        
        supplements.push({
          index: supplementIndex,
          name: supplementName,
          dosage: '1 عدد',
          timing: 'بعد از تمرین'
        });
        
        supplementIndex++;
      });
    }
    
    if (student.vitamins && student.vitamins.length > 0) {
      student.vitamins.forEach((vitaminId) => {
        const vitaminName = getSupplementName(vitaminId) || `ویتامین ${toPersianDigits(supplementIndex)}`;
        
        supplements.push({
          index: supplementIndex,
          name: vitaminName,
          dosage: '1 عدد',
          timing: 'صبح'
        });
        
        supplementIndex++;
      });
    }
    
    // تعریف محتوای PDF
    const docDefinition: any = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      defaultStyle: {
        font: 'Roboto',
        fontSize: 10,
        direction: 'rtl'
      },
      content: [
        // هدر اصلی
        {
          text: preprocessPersianText(trainerProfile.gymName || "باشگاه بدنسازی"),
          style: 'header',
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        
        // اطلاعات شاگرد و مربی
        {
          table: {
            widths: ['*', '*', '*', '*'],
            body: [
              [
                { text: preprocessPersianText(`شاگرد: ${student.name || "-"}`), style: 'infoCell' },
                { text: preprocessPersianText(`مربی: ${trainerProfile.name || "-"}`), style: 'infoCell' },
                { text: preprocessPersianText(`قد: ${toPersianDigits(student.height || 0)} سانتی‌متر`), style: 'infoCell' },
                { text: preprocessPersianText(`وزن: ${toPersianDigits(student.weight || 0)} کیلوگرم`), style: 'infoCell' }
              ]
            ]
          },
          layout: 'lightHorizontalLines',
          margin: [0, 0, 0, 20]
        },
        
        // تمرینات
        ...(exercises.length > 0 ? [
          {
            text: 'تمرینات بدنسازی',
            style: 'sectionHeader',
            margin: [0, 20, 0, 10]
          },
          {
            table: {
              widths: ['10%', '20%', '20%', '50%'],
              headerRows: 1,
              body: [
                [
                  { text: 'شماره', style: 'tableHeader' },
                  { text: 'تکرار', style: 'tableHeader' },
                  { text: 'ست', style: 'tableHeader' },
                  { text: 'نام تمرین', style: 'tableHeader' }
                ],
                ...exercises.map(ex => [
                  { text: toPersianDigits(ex.index), style: 'tableCell' },
                  { text: ex.reps, style: 'tableCell' },
                  { text: ex.sets, style: 'tableCell' },
                  { text: preprocessPersianText(ex.name), style: 'tableCell' }
                ])
              ]
            },
            layout: 'lightHorizontalLines',
            margin: [0, 0, 0, 20]
          }
        ] : []),
        
        // غذاها
        ...(meals.length > 0 ? [
          {
            text: 'برنامه غذایی',
            style: 'sectionHeader',
            margin: [0, 20, 0, 10]
          },
          {
            table: {
              widths: ['10%', '20%', '30%', '40%'],
              headerRows: 1,
              body: [
                [
                  { text: 'شماره', style: 'tableHeader' },
                  { text: 'روز', style: 'tableHeader' },
                  { text: 'وعده غذایی', style: 'tableHeader' },
                  { text: 'نام غذا', style: 'tableHeader' }
                ],
                ...meals.map(meal => [
                  { text: toPersianDigits(meal.index), style: 'tableCell' },
                  { text: preprocessPersianText(meal.day), style: 'tableCell' },
                  { text: preprocessPersianText(meal.mealType), style: 'tableCell' },
                  { text: preprocessPersianText(meal.name), style: 'tableCell' }
                ])
              ]
            },
            layout: 'lightHorizontalLines',
            margin: [0, 0, 0, 20]
          }
        ] : []),
        
        // مکمل‌ها
        ...(supplements.length > 0 ? [
          {
            text: 'مکمل‌ها و ویتامین‌ها',
            style: 'sectionHeader',
            margin: [0, 20, 0, 10]
          },
          {
            table: {
              widths: ['10%', '20%', '30%', '40%'],
              headerRows: 1,
              body: [
                [
                  { text: 'شماره', style: 'tableHeader' },
                  { text: 'دوز مصرف', style: 'tableHeader' },
                  { text: 'زمان مصرف', style: 'tableHeader' },
                  { text: 'نام مکمل یا ویتامین', style: 'tableHeader' }
                ],
                ...supplements.map(supp => [
                  { text: toPersianDigits(supp.index), style: 'tableCell' },
                  { text: preprocessPersianText(supp.dosage), style: 'tableCell' },
                  { text: preprocessPersianText(supp.timing), style: 'tableCell' },
                  { text: preprocessPersianText(supp.name), style: 'tableCell' }
                ])
              ]
            },
            layout: 'lightHorizontalLines',
            margin: [0, 0, 0, 20]
          }
        ] : [])
      ],
      
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          color: '#1f2937'
        },
        sectionHeader: {
          fontSize: 14,
          bold: true,
          color: '#2563eb'
        },
        tableHeader: {
          bold: true,
          fillColor: '#f0f0f0',
          alignment: 'center'
        },
        tableCell: {
          alignment: 'center'
        },
        infoCell: {
          alignment: 'center',
          fillColor: '#f8fafc'
        }
      },
      
      footer: function(currentPage: number, pageCount: number) {
        return {
          text: [
            { text: preprocessPersianText(`${trainerProfile.phone ? `موبایل: ${toPersianDigits(trainerProfile.phone)}` : ''}`), fontSize: 8 },
            { text: preprocessPersianText(`${trainerProfile.website ? ` | وب‌سایت: ${trainerProfile.website}` : ''}`), fontSize: 8 },
            { text: preprocessPersianText(`${trainerProfile.instagram ? ` | اینستاگرام: ${trainerProfile.instagram}` : ''}`), fontSize: 8 }
          ],
          alignment: 'center',
          margin: [0, 10, 0, 0]
        };
      }
    };
    
    // تولید و دانلود PDF
    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.download(`برنامه_${student.name || 'بدون_نام'}.pdf`);
    
  } catch (error) {
    console.error("خطا در ایجاد PDF:", error);
    throw error;
  }
};
