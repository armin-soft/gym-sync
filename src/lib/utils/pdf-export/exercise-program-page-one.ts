
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile, TableCellContent } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { getExerciseName } from './data-helpers';
import { modernTableLayout } from './modern-styles';

// تابع دریافت نام روز برای برنامه تمرینی
function getExerciseDayName(day: number): string {
  const dayNames: Record<number, string> = {
    1: 'اول',
    2: 'دوم', 
    3: 'سوم',
    4: 'چهارم',
    5: 'پنجم',
    6: 'ششم'
  };
  return dayNames[day] || `${toPersianDigits(day)}`;
}

// ایجاد صفحه اول: برنامه تمرینی روزهای ۱ تا ۴ در ۴ بخش
export function createExerciseProgramPageOne(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  
  // عنوان مدرن صفحه اول
  content.push({
    text: preprocessPersianText('برنامه تمرینی'),
    style: 'sectionTitle',
    margin: [0, 25, 0, 20],
    color: '#7c3aed',
    direction: 'rtl',
    fontSize: 18,
    bold: true,
    alignment: 'center'
  });

  // ایجاد 4 بخش برای روزهای 1 تا 4
  for (let day = 1; day <= 4; day++) {
    const dayKey = `exercisesDay${day}` as keyof Student;
    const daySetKey = `exerciseSetsDay${day}` as keyof Student;
    const dayRepsKey = `exerciseRepsDay${day}` as keyof Student;
    
    const exercises = student[dayKey] as number[] || [];
    const sets = student[daySetKey] as Record<number, number> || {};
    const reps = student[dayRepsKey] as Record<number, string> || {};

    // عنوان روز
    content.push({
      text: preprocessPersianText(`روز ${getExerciseDayName(day)}`),
      style: 'sectionTitle',
      margin: [0, 15, 0, 10],
      color: '#4f46e5',
      direction: 'rtl',
      fontSize: 14,
      bold: true,
      alignment: 'right'
    });

    // جدول تمرینات این روز
    const tableBody = [];
    
    // هدر جدول
    tableBody.push([
      {
        text: preprocessPersianText('شماره'),
        style: 'tableHeader',
        alignment: 'center'
      },
      {
        text: preprocessPersianText('ست'),
        style: 'tableHeader',
        alignment: 'center'
      },
      {
        text: preprocessPersianText('تکرار'),
        style: 'tableHeader',
        alignment: 'center'
      },
      {
        text: preprocessPersianText('تمرین'),
        style: 'tableHeader',
        alignment: 'right'
      }
    ]);

    let exerciseNumber = 1;
    
    if (exercises && exercises.length > 0) {
      exercises.forEach((exerciseId) => {
        const exerciseName = getExerciseName(exerciseId);
        if (exerciseName) {
          const setCount = sets[exerciseId] ? toPersianDigits(sets[exerciseId].toString()) : toPersianDigits('3');
          const repInfo = reps[exerciseId] ? preprocessPersianText(reps[exerciseId]) : preprocessPersianText('۸-۱۲');
          
          tableBody.push([
            {
              text: toPersianDigits(exerciseNumber.toString()),
              style: 'tableCellCenter',
              alignment: 'center'
            },
            {
              text: setCount,
              style: 'tableCellCenter',
              alignment: 'center'
            },
            {
              text: repInfo,
              style: 'tableCellCenter',
              alignment: 'center'
            },
            {
              text: preprocessPersianText(exerciseName),
              style: 'tableCell',
              alignment: 'right'
            }
          ]);
          exerciseNumber++;
        }
      });
    } else {
      // اگر هیچ تمرینی وجود نداشت
      tableBody.push([
        {
          text: preprocessPersianText('-'),
          style: 'tableCellCenter',
          alignment: 'center'
        },
        {
          text: preprocessPersianText('-'),
          style: 'tableCellCenter',
          alignment: 'center'
        },
        {
          text: preprocessPersianText('-'),
          style: 'tableCellCenter',
          alignment: 'center'
        },
        {
          text: preprocessPersianText('تمرینی تعیین نشده است'),
          style: 'tableCell',
          alignment: 'right',
          color: '#64748b'
        }
      ]);
    }

    // اضافه کردن جدول به محتوا
    content.push({
      table: {
        widths: ['15%', '15%', '20%', '50%'],
        body: tableBody
      },
      layout: modernTableLayout,
      margin: [0, 0, 0, 15],
      direction: 'rtl'
    });
  }

  return content;
}

// ایجاد پشت صفحه اول: روزهای ۵ و ۶ در ۲ بخش
export function createExerciseProgramPageOneBack(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  
  // عنوان پشت صفحه
  content.push({
    text: preprocessPersianText('ادامه برنامه تمرینی'),
    style: 'sectionTitle',
    margin: [0, 25, 0, 20],
    color: '#7c3aed',
    direction: 'rtl',
    fontSize: 18,
    bold: true,
    alignment: 'center'
  });

  // ایجاد 2 بخش برای روزهای 5 و 6
  for (let day = 5; day <= 6; day++) {
    const dayKey = `exercisesDay${day}` as keyof Student;
    const daySetKey = `exerciseSetsDay${day}` as keyof Student;
    const dayRepsKey = `exerciseRepsDay${day}` as keyof Student;
    
    const exercises = student[dayKey] as number[] || [];
    const sets = student[daySetKey] as Record<number, number> || {};
    const reps = student[dayRepsKey] as Record<number, string> || {};

    // عنوان روز
    content.push({
      text: preprocessPersianText(`روز ${getExerciseDayName(day)}`),
      style: 'sectionTitle',
      margin: [0, 15, 0, 10],
      color: '#4f46e5',
      direction: 'rtl',
      fontSize: 14,
      bold: true,
      alignment: 'right'
    });

    // جدول تمرینات این روز
    const tableBody = [];
    
    // هدر جدول
    tableBody.push([
      {
        text: preprocessPersianText('شماره'),
        style: 'tableHeader',
        alignment: 'center'
      },
      {
        text: preprocessPersianText('ست'),
        style: 'tableHeader',
        alignment: 'center'
      },
      {
        text: preprocessPersianText('تکرار'),
        style: 'tableHeader',
        alignment: 'center'
      },
      {
        text: preprocessPersianText('تمرین'),
        style: 'tableHeader',
        alignment: 'right'
      }
    ]);

    let exerciseNumber = 1;
    
    if (exercises && exercises.length > 0) {
      exercises.forEach((exerciseId) => {
        const exerciseName = getExerciseName(exerciseId);
        if (exerciseName) {
          const setCount = sets[exerciseId] ? toPersianDigits(sets[exerciseId].toString()) : toPersianDigits('3');
          const repInfo = reps[exerciseId] ? preprocessPersianText(reps[exerciseId]) : preprocessPersianText('۸-۱۲');
          
          tableBody.push([
            {
              text: toPersianDigits(exerciseNumber.toString()),
              style: 'tableCellCenter',
              alignment: 'center'
            },
            {
              text: setCount,
              style: 'tableCellCenter',
              alignment: 'center'
            },
            {
              text: repInfo,
              style: 'tableCellCenter',
              alignment: 'center'
            },
            {
              text: preprocessPersianText(exerciseName),
              style: 'tableCell',
              alignment: 'right'
            }
          ]);
          exerciseNumber++;
        }
      });
    } else {
      // اگر هیچ تمرینی وجود نداشت
      tableBody.push([
        {
          text: preprocessPersianText('-'),
          style: 'tableCellCenter',
          alignment: 'center'
        },
        {
          text: preprocessPersianText('-'),
          style: 'tableCellCenter',
          alignment: 'center'
        },
        {
          text: preprocessPersianText('-'),
          style: 'tableCellCenter',
          alignment: 'center'
        },
        {
          text: preprocessPersianText('تمرینی تعیین نشده است'),
          style: 'tableCell',
          alignment: 'right',
          color: '#64748b'
        }
      ]);
    }

    // اضافه کردن جدول به محتوا
    content.push({
      table: {
        widths: ['15%', '15%', '20%', '50%'],
        body: tableBody
      },
      layout: modernTableLayout,
      margin: [0, 0, 0, 15],
      direction: 'rtl'
    });
  }

  // نکات تمرینی
  if (student.notes) {
    content.push({
      text: preprocessPersianText('نکات تمرینی:'),
      style: 'sectionTitle',
      margin: [0, 35, 0, 15],
      alignment: 'right',
      fontSize: 14,
      color: '#4f46e5'
    });
    
    content.push({
      text: preprocessPersianText(student.notes),
      style: 'notes',
      alignment: 'right',
      fontSize: 11,
      margin: [15, 15, 15, 15],
      direction: 'rtl'
    });
  }

  return content;
}
