
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { toPersianDigits, preprocessPersianText } from './pdf-fonts';
import { 
  getStudentSupplementData,
  getSupplementNameFromStorage,
  getSupplementDosageFromStorage,
  getSupplementTimingFromStorage,
  getSupplementTypeFromStorage
} from './student-data-helper';

// ایجاد برنامه مکمل و ویتامین دقیق بر اساس داده‌های شاگرد
export function createAccurateSupplementProgram(student: Student, trainerProfile: TrainerProfile): any[] {
  const content: any[] = [];
  const supplementData = getStudentSupplementData(student);
  
  const hasSupplements = supplementData.supplements.length > 0;
  const hasVitamins = supplementData.vitamins.length > 0;
  
  if (!hasSupplements && !hasVitamins) {
    content.push({
      text: 'هیچ برنامه مکمل یا ویتامینی برای این شاگرد تعیین نشده است.',
      style: 'notes',
      alignment: 'center',
      direction: 'rtl',
      margin: [0, 20, 0, 20]
    });
    return content;
  }

  // جدول مکمل‌ها
  if (hasSupplements) {
    content.push({
      text: 'مکمل‌ها:',
      style: 'subSectionTitle',
      margin: [0, 10, 0, 10],
      direction: 'rtl'
    });

    const supplementTableData: any[][] = [
      [
        { text: 'شماره', style: 'tableHeader', alignment: 'center' },
        { text: 'نام مکمل', style: 'tableHeader', alignment: 'right' },
        { text: 'دوز مصرف', style: 'tableHeader', alignment: 'center' },
        { text: 'زمان مصرف', style: 'tableHeader', alignment: 'center' }
      ]
    ];

    supplementData.supplements.forEach((suppId: number, index: number) => {
      const name = getSupplementNameFromStorage(suppId);
      const dosage = getSupplementDosageFromStorage(suppId);
      const timing = getSupplementTimingFromStorage(suppId);
      
      supplementTableData.push([
        { text: toPersianDigits((index + 1).toString()), style: 'tableCell', alignment: 'center' },
        { text: preprocessPersianText(name), style: 'tableCell', alignment: 'right' },
        { text: preprocessPersianText(dosage), style: 'tableCell', alignment: 'center' },
        { text: preprocessPersianText(timing), style: 'tableCell', alignment: 'center' }
      ]);
    });

    content.push({
      table: {
        widths: ['10%', '40%', '25%', '25%'],
        body: supplementTableData,
        headerRows: 1
      },
      layout: {
        fillColor: function(rowIndex: number) {
          return (rowIndex === 0) ? '#e67e22' : (rowIndex % 2 === 0 ? '#f8fafc' : null);
        },
        hLineWidth: () => 1,
        vLineWidth: () => 1,
        hLineColor: () => '#e2e8f0',
        vLineColor: () => '#e2e8f0'
      },
      margin: [0, 0, 0, 15],
      direction: 'rtl'
    });
  }

  // جدول ویتامین‌ها
  if (hasVitamins) {
    content.push({
      text: 'ویتامین‌ها:',
      style: 'subSectionTitle',
      margin: [0, 10, 0, 10],
      direction: 'rtl'
    });

    const vitaminTableData: any[][] = [
      [
        { text: 'شماره', style: 'tableHeader', alignment: 'center' },
        { text: 'نام ویتامین', style: 'tableHeader', alignment: 'right' },
        { text: 'دوز مصرف', style: 'tableHeader', alignment: 'center' },
        { text: 'زمان مصرف', style: 'tableHeader', alignment: 'center' }
      ]
    ];

    supplementData.vitamins.forEach((vitId: number, index: number) => {
      const name = getSupplementNameFromStorage(vitId);
      const dosage = getSupplementDosageFromStorage(vitId);
      const timing = getSupplementTimingFromStorage(vitId);
      
      vitaminTableData.push([
        { text: toPersianDigits((index + 1).toString()), style: 'tableCell', alignment: 'center' },
        { text: preprocessPersianText(name), style: 'tableCell', alignment: 'right' },
        { text: preprocessPersianText(dosage), style: 'tableCell', alignment: 'center' },
        { text: preprocessPersianText(timing), style: 'tableCell', alignment: 'center' }
      ]);
    });

    content.push({
      table: {
        widths: ['10%', '40%', '25%', '25%'],
        body: vitaminTableData,
        headerRows: 1
      },
      layout: {
        fillColor: function(rowIndex: number) {
          return (rowIndex === 0) ? '#9b59b6' : (rowIndex % 2 === 0 ? '#f8fafc' : null);
        },
        hLineWidth: () => 1,
        vLineWidth: () => 1,
        hLineColor: () => '#e2e8f0',
        vLineColor: () => '#e2e8f0'
      },
      margin: [0, 0, 0, 15],
      direction: 'rtl'
    });
  }

  return content;
}
