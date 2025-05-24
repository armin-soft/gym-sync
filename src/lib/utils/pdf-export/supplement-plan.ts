import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile, TableCellContent } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { getDayName } from '@/lib/utils';
import { createSectionHeader } from './pdf-styling';
import { getSupplementName, getSupplementType } from './data-helpers';

// ایجاد برنامه مکمل و ویتامین
export function createSupplementPlan(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  
  // هدر بخش
  content.push(createSectionHeader("برنامه مکمل و ویتامین", '#e67e22'));
  
  // اطلاعات مکمل‌ها را به صورت روزانه سازماندهی می‌کنیم
  const dailySupplements: Record<number, any[]> = {};
  const dailyVitamins: Record<number, any[]> = {};
  
  // حداکثر تعداد روزها
  const maxDays = 5;
  
  // آماده‌سازی ساختار روزانه مکمل‌ها و ویتامین‌ها
  for (let day = 1; day <= maxDays; day++) {
    dailySupplements[day] = [];
    dailyVitamins[day] = [];
  }
  
  // پردازش مکمل‌ها
  if (student.supplements && student.supplements.length > 0) {
    student.supplements.forEach((suppId, index) => {
      // فرض: هر مکمل برای همه روزها استفاده می‌شود - می‌توان این منطق را تغییر داد
      const day = (index % maxDays) + 1; // تقسیم بین روزها به صورت چرخشی
      
      dailySupplements[day].push({
        id: suppId,
        name: getSupplementName(suppId) || `مکمل ${toPersianDigits(index + 1)}`,
        type: getSupplementType(suppId) || '-',
        dosage: '1 عدد', // می‌توان از داده واقعی استفاده کرد
        timing: 'بعد از تمرین' // می‌توان از داده واقعی استفاده کرد
      });
    });
  }
  
  // پردازش ویتامین‌ها
  if (student.vitamins && student.vitamins.length > 0) {
    student.vitamins.forEach((vitaminId, index) => {
      // فرض: هر ویتامین برای همه روزها استفاده می‌شود - می‌توان این منطق را تغییر داد
      const day = (index % maxDays) + 1; // تقسیم بین روزها به صورت چرخشی
      
      dailyVitamins[day].push({
        id: vitaminId,
        name: getSupplementName(vitaminId) || `ویتامین ${toPersianDigits(index + 1)}`,
        type: getSupplementType(vitaminId) || '-',
        dosage: '1 عدد', // می‌توان از داده واقعی استفاده کرد
        timing: 'صبح' // می‌توان از داده واقعی استفاده کرد
      });
    });
  }
  
  // نمایش جدول‌های روزانه برای مکمل‌ها و ویتامین‌ها
  for (let day = 1; day <= maxDays; day++) {
    const hasSupplement = dailySupplements[day].length > 0;
    const hasVitamin = dailyVitamins[day].length > 0;
    
    // اگر این روز مکمل یا ویتامینی داشت، آن را نمایش بده
    if (hasSupplement || hasVitamin) {
      const dayName = getDayName(day);
      
      // هدر روز
      content.push({
        text: preprocessPersianText(`روز ${toPersianDigits(day)}: ${dayName}`),
        style: 'subheader',
        margin: [0, 15, 0, 5],
        color: '#e67e22',
        direction: 'rtl'
      });
      
      // جدول مکمل‌ها و ویتامین‌ها
      const tableData: (TableCellContent | { text: string; style: string })[][] = [
        [
          { text: 'شماره', style: 'tableHeader', direction: 'rtl' },
          { text: 'دوز', style: 'tableHeader', direction: 'rtl' },
          { text: 'زمان مصرف', style: 'tableHeader', direction: 'rtl' },
          { text: 'مکمل/ویتامین', style: 'tableHeader', direction: 'rtl' }
        ]
      ];
      
      // افزودن مکمل‌ها به جدول
      if (hasSupplement) {
        dailySupplements[day].forEach((supplement, index) => {
          tableData.push([
            { text: toPersianDigits(index + 1), style: 'tableCell', alignment: 'center', direction: 'rtl' },
            { text: preprocessPersianText(supplement.dosage), style: 'tableCell', alignment: 'center', direction: 'rtl' },
            { text: preprocessPersianText(supplement.timing), style: 'tableCell', direction: 'rtl' },
            { text: preprocessPersianText(supplement.name), style: 'tableCell', direction: 'rtl' }
          ]);
        });
      }
      
      // افزودن ویتامین‌ها به جدول
      if (hasVitamin) {
        dailyVitamins[day].forEach((vitamin, index) => {
          tableData.push([
            { 
              text: toPersianDigits(hasSupplement ? dailySupplements[day].length + index + 1 : index + 1), 
              style: 'tableCell', 
              alignment: 'center',
              direction: 'rtl' 
            },
            { text: preprocessPersianText(vitamin.dosage), style: 'tableCell', alignment: 'center', direction: 'rtl' },
            { text: preprocessPersianText(vitamin.timing), style: 'tableCell', direction: 'rtl' },
            { text: preprocessPersianText(vitamin.name), style: 'tableCell', direction: 'rtl' }
          ]);
        });
      }
      
      // اضافه کردن جدول به محتوا
      content.push({
        table: {
          widths: ['10%', '20%', '30%', '40%'],
          body: tableData,
          headerRows: 1
        },
        layout: {
          fillColor: function(rowIndex: number) {
            return (rowIndex === 0) ? '#e67e22' : (rowIndex % 2 === 0 ? '#fff5eb' : null);
          },
          hLineWidth: () => 1,
          vLineWidth: () => 1,
          hLineColor: () => '#e2e8f0',
          vLineColor: () => '#e2e8f0'
        },
        margin: [0, 0, 0, 15]
      });
    }
  }
  
  // اگر هیچ مکمل یا ویتامینی نبود
  if (Object.values(dailySupplements).flat().length === 0 && Object.values(dailyVitamins).flat().length === 0) {
    content.push({
      text: 'برنامه مکمل و ویتامین تعیین نشده است.',
      style: {
        fontSize: 11,
        alignment: 'center',
        direction: 'rtl'
      }
    });
  }
  
  // نکات مصرف مکمل
  if (student.supplementNotes) {
    content.push(createSectionHeader("نکات مصرف مکمل", '#e67e22'));
    content.push({
      text: preprocessPersianText(student.supplementNotes),
      style: {
        fontSize: 11,
        alignment: 'right',
        margin: [0, 10, 0, 0],
        direction: 'rtl'
      }
    });
  }
  
  return content;
}
