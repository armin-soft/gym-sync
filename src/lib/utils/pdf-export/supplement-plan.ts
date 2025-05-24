
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile, TableCellContent } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { createSectionHeader, configureTableStyles } from './pdf-styling';
import { getSupplementName, getSupplementType } from './data-helpers';

// ایجاد برنامه مکمل و ویتامین
export function createSupplementPlan(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  
  // هدر بخش
  content.push(createSectionHeader("برنامه مکمل و ویتامین", '#e67e22'));
  
  // مکمل‌ها
  if (student.supplements && student.supplements.length > 0) {
    content.push({
      text: preprocessPersianText("مکمل‌های پیشنهادی"),
      style: 'subheader',
      color: '#e67e22'
    });
    
    const supplementsData: (TableCellContent | { text: string; style: string })[][] = [
      [
        { text: '#', style: 'tableHeader' },
        { text: 'نام مکمل', style: 'tableHeader' },
        { text: 'نوع', style: 'tableHeader' }
      ]
    ];
    
    student.supplements.forEach((suppId, index) => {
      const suppName = getSupplementName(suppId) || `مکمل ${toPersianDigits(index + 1)}`;
      const suppType = getSupplementType(suppId) || '-';
      
      supplementsData.push([
        { text: toPersianDigits(index + 1), style: 'tableCell', alignment: 'center' },
        { text: preprocessPersianText(suppName), style: 'tableCell' },
        { text: preprocessPersianText(suppType), style: 'tableCell', alignment: 'center' }
      ]);
    });
    
    content.push({
      table: {
        widths: ['15%', '60%', '25%'],
        body: supplementsData
      },
      layout: configureTableStyles('warning'),
      margin: [0, 0, 0, 15]
    });
  }
  
  // ویتامین‌ها
  if (student.vitamins && student.vitamins.length > 0) {
    content.push({
      text: preprocessPersianText("ویتامین‌های پیشنهادی"),
      style: 'subheader',
      color: '#9b59b6'
    });
    
    const vitaminsData: (TableCellContent | { text: string; style: string })[][] = [
      [
        { text: '#', style: 'tableHeader' },
        { text: 'نام ویتامین', style: 'tableHeader' },
        { text: 'نوع', style: 'tableHeader' }
      ]
    ];
    
    student.vitamins.forEach((vitaminId, index) => {
      const vitaminName = getSupplementName(vitaminId) || `ویتامین ${toPersianDigits(index + 1)}`;
      const vitaminType = getSupplementType(vitaminId) || '-';
      
      vitaminsData.push([
        { text: toPersianDigits(index + 1), style: 'tableCell', alignment: 'center' },
        { text: preprocessPersianText(vitaminName), style: 'tableCell' },
        { text: preprocessPersianText(vitaminType), style: 'tableCell', alignment: 'center' }
      ]);
    });
    
    content.push({
      table: {
        widths: ['15%', '60%', '25%'],
        body: vitaminsData
      },
      layout: configureTableStyles('info'),
      margin: [0, 0, 0, 15]
    });
  }
  
  // نکات مصرف مکمل
  if (student.supplementNotes) {
    content.push(createSectionHeader("نکات مصرف مکمل", '#e67e22'));
    content.push({
      text: preprocessPersianText(student.supplementNotes),
      style: 'notes'
    });
  }
  
  return content;
}
