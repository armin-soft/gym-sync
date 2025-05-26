
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile, TableCellContent } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { getExerciseName } from './data-helpers';
import { modernTableLayout } from './modern-styles';

// تابع دریافت نام روز برای برنامه تمرینی
function getExerciseDayName(day: number): string {
  const dayNames: Record<number, string> = {
    1: 'روز اول',
    2: 'روز دوم', 
    3: 'روز سوم',
    4: 'روز چهارم'
  };
  return dayNames[day] || `روز ${toPersianDigits(day)}`;
}

// ایجاد صفحه اول: برنامه تمرینی روزهای ۱ تا ۴
export function createExerciseProgramPageOne(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  
  // عنوان مدرن صفحه اول
  content.push({
    text: preprocessPersianText('برنامه تمرینی - هفته اول'),
    style: 'sectionTitle',
    margin: [0, 25, 0, 20],
    color: '#7c3aed',
    direction: 'rtl',
    fontSize: 18,
    bold: true,
    alignment: 'center'
  });

  // تقسیم صفحه به 4 قسمت برای 4 روز اول
  const daysContent = [];
  
  for (let day = 1; day <= 4; day++) {
    const dayKey = `exercisesDay${day}` as keyof Student;
    const daySetKey = `exerciseSetsDay${day}` as keyof Student;
    const dayRepsKey = `exerciseRepsDay${day}` as keyof Student;
    
    const exercises = student[dayKey] as number[] || [];
    const sets = student[daySetKey] as Record<number, number> || {};
    const reps = student[dayRepsKey] as Record<number, string> || {};
    
    const dayContent: any = {
      text: [
        {
          text: preprocessPersianText(getExerciseDayName(day)),
          bold: true,
          fontSize: 14,
          color: '#4f46e5',
          direction: 'rtl'
        },
        '\n\n'
      ],
      margin: [0, 0, 0, 15]
    };

    if (exercises && exercises.length > 0) {
      const exerciseList: any[] = [];
      exercises.forEach((exerciseId, index) => {
        const exerciseName = getExerciseName(exerciseId);
        if (exerciseName) {
          const setCount = sets[exerciseId] ? toPersianDigits(sets[exerciseId].toString()) : toPersianDigits('3');
          const repInfo = reps[exerciseId] ? preprocessPersianText(reps[exerciseId]) : preprocessPersianText('۸-۱۲');
          
          exerciseList.push({
            text: `${toPersianDigits((index + 1).toString())}. ${preprocessPersianText(exerciseName)} - ${setCount} ست - ${repInfo} تکرار\n`,
            fontSize: 11,
            direction: 'rtl',
            alignment: 'right',
            margin: [0, 2, 0, 2]
          });
        }
      });
      
      dayContent.text = dayContent.text.concat(exerciseList);
    } else {
      dayContent.text.push({
        text: preprocessPersianText('تمرینی تعیین نشده است.'),
        fontSize: 11,
        color: '#64748b',
        direction: 'rtl',
        style: 'italic'
      });
    }
    
    daysContent.push(dayContent);
  }

  // تقسیم محتوا به دو ستون
  content.push({
    columns: [
      {
        width: '48%',
        stack: [daysContent[2], daysContent[3]] // روز سوم و چهارم
      },
      {
        width: '4%',
        text: ''
      },
      {
        width: '48%',
        stack: [daysContent[0], daysContent[1]] // روز اول و دوم
      }
    ],
    direction: 'rtl',
    margin: [0, 0, 0, 25]
  });

  return content;
}

// ایجاد پشت صفحه اول: روزهای ۵ و ۶
export function createExerciseProgramPageOneBack(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  
  // عنوان پشت صفحه
  content.push({
    text: preprocessPersianText('برنامه تمرینی - هفته دوم'),
    style: 'sectionTitle',
    margin: [0, 25, 0, 20],
    color: '#7c3aed',
    direction: 'rtl',
    fontSize: 18,
    bold: true,
    alignment: 'center'
  });

  const daysContent = [];
  
  for (let day = 5; day <= 6; day++) {
    const dayKey = `exercisesDay${day}` as keyof Student;
    const daySetKey = `exerciseSetsDay${day}` as keyof Student;
    const dayRepsKey = `exerciseRepsDay${day}` as keyof Student;
    
    const exercises = student[dayKey] as number[] || [];
    const sets = student[daySetKey] as Record<number, number> || {};
    const reps = student[dayRepsKey] as Record<number, string> || {};
    
    const dayName = day === 5 ? 'روز پنجم' : 'روز ششم';
    
    const dayContent: any = {
      text: [
        {
          text: preprocessPersianText(dayName),
          bold: true,
          fontSize: 14,
          color: '#4f46e5',
          direction: 'rtl'
        },
        '\n\n'
      ],
      margin: [0, 0, 0, 30]
    };

    if (exercises && exercises.length > 0) {
      const exerciseList: any[] = [];
      exercises.forEach((exerciseId, index) => {
        const exerciseName = getExerciseName(exerciseId);
        if (exerciseName) {
          const setCount = sets[exerciseId] ? toPersianDigits(sets[exerciseId].toString()) : toPersianDigits('3');
          const repInfo = reps[exerciseId] ? preprocessPersianText(reps[exerciseId]) : preprocessPersianText('۸-۱۲');
          
          exerciseList.push({
            text: `${toPersianDigits((index + 1).toString())}. ${preprocessPersianText(exerciseName)} - ${setCount} ست - ${repInfo} تکرار\n`,
            fontSize: 11,
            direction: 'rtl',
            alignment: 'right',
            margin: [0, 2, 0, 2]
          });
        }
      });
      
      dayContent.text = dayContent.text.concat(exerciseList);
    } else {
      dayContent.text.push({
        text: preprocessPersianText('تمرینی تعیین نشده است.'),
        fontSize: 11,
        color: '#64748b',
        direction: 'rtl',
        style: 'italic'
      });
    }
    
    daysContent.push(dayContent);
  }

  // تقسیم پشت صفحه به دو ستون برای روز ۵ و ۶
  content.push({
    columns: [
      {
        width: '48%',
        stack: [daysContent[1]] // روز ششم
      },
      {
        width: '4%',
        text: ''
      },
      {
        width: '48%',
        stack: [daysContent[0]] // روز پنجم
      }
    ],
    direction: 'rtl',
    margin: [0, 0, 0, 25]
  });

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
