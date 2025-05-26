
// سبک‌های مدرن و حرفه‌ای برای اسناد PDF
export const modernPdfStyles = {
  header: {
    fontSize: 18,
    bold: true,
    alignment: 'center',
    margin: [0, 0, 0, 10],
    color: '#2563eb',
    font: 'Roboto'
  },
  subheader: {
    fontSize: 16,
    bold: true,
    margin: [0, 10, 0, 5],
    color: '#1e40af',
    font: 'Roboto'
  },
  quote: {
    fontSize: 12,
    italics: true,
    alignment: 'right',
    margin: [0, 0, 0, 5],
    font: 'Roboto'
  },
  small: {
    fontSize: 8,
    margin: [0, 0, 0, 2],
    font: 'Roboto'
  },
  tableHeader: {
    bold: true,
    fontSize: 13,
    color: 'white',
    fillColor: '#3b82f6',
    alignment: 'center',
    font: 'Roboto'
  },
  tableCell: {
    fontSize: 11,
    alignment: 'center',
    margin: [2, 4, 2, 4],
    font: 'Roboto'
  },
  exerciseTitle: {
    fontSize: 14,
    bold: true,
    color: '#059669',
    margin: [0, 5, 0, 3],
    font: 'Roboto'
  },
  mealTitle: {
    fontSize: 14,
    bold: true,
    color: '#dc2626',
    margin: [0, 5, 0, 3],
    font: 'Roboto'
  },
  supplementTitle: {
    fontSize: 14,
    bold: true,
    color: '#7c3aed',
    margin: [0, 5, 0, 3],
    font: 'Roboto'
  }
};

// تنظیمات صفحه برای چاپ
export const printPageSettings = {
  pageSize: 'A4' as const,
  pageOrientation: 'portrait' as const,
  pageMargins: [40, 60, 40, 60] as [number, number, number, number],
  defaultStyle: {
    fontSize: 11,
    font: 'Roboto',
    lineHeight: 1.3,
    alignment: 'right' as const,
    direction: 'rtl' as const
  },
  info: {
    title: 'برنامه تمرینی و تغذیه‌ای',
    author: 'GymSync Pro',
    subject: 'برنامه شخصی‌سازی شده',
    creator: 'GymSync Pro System'
  }
};
