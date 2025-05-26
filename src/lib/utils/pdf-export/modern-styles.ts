
import { toPersianDigits } from './pdf-fonts';

// استایل‌های مدرن و حرفه‌ای برای PDF
export const modernPdfStyles = {
  // تایتل اصلی سند
  documentTitle: {
    fontSize: 26,
    bold: true,
    alignment: 'center',
    margin: [0, 0, 0, 25],
    color: '#1a365d',
    direction: 'rtl',
    bidi: false,
    font: 'Vazir'
  },
  
  // هدر اصلی
  mainHeader: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 0, 0, 20],
    color: '#2563eb',
    direction: 'rtl',
    bidi: false,
    font: 'Vazir'
  },
  
  // زیرعنوان‌های اصلی
  sectionTitle: {
    fontSize: 16,
    bold: true,
    alignment: 'right',
    margin: [0, 15, 0, 10],
    color: '#4f46e5',
    direction: 'rtl',
    bidi: false,
    font: 'Vazir'
  },
  
  // هدر جدول
  tableHeader: {
    bold: true,
    fontSize: 13,
    color: 'white',
    fillColor: '#4f46e5',
    alignment: 'center',
    margin: [8, 10, 8, 10],
    direction: 'rtl',
    bidi: false,
    font: 'Vazir'
  },
  
  // سلول‌های جدول
  tableCell: {
    fontSize: 12,
    alignment: 'right',
    margin: [8, 8, 8, 8],
    direction: 'rtl',
    bidi: false,
    font: 'Vazir',
    lineHeight: 1.4
  },
  
  // سلول‌های مرکز (اعداد)
  tableCellCenter: {
    fontSize: 12,
    alignment: 'center',
    margin: [8, 8, 8, 8],
    direction: 'rtl',
    bidi: false,
    font: 'Vazir',
    lineHeight: 1.4
  },
  
  // زیرهدر جدول
  tableSubHeader: {
    fontSize: 12,
    bold: true,
    fillColor: '#f1f5f9',
    color: '#475569',
    alignment: 'right',
    margin: [8, 8, 8, 8],
    direction: 'rtl',
    bidi: false,
    font: 'Vazir'
  },
  
  // نکات و توضیحات
  notes: {
    fontSize: 11,
    alignment: 'right',
    margin: [0, 15, 0, 0],
    color: '#64748b',
    direction: 'rtl',
    bidi: false,
    font: 'Vazir',
    lineHeight: 1.5
  },
  
  // پاورقی
  footer: {
    fontSize: 10,
    alignment: 'center',
    color: '#94a3b8',
    direction: 'rtl',
    bidi: false,
    font: 'Vazir'
  },
  
  // متن برجسته
  highlight: {
    fillColor: '#fef3c7',
    color: '#92400e',
    bold: true,
    direction: 'rtl',
    bidi: false,
    font: 'Vazir'
  },
  
  // متن موفقیت
  success: {
    color: '#059669',
    bold: true,
    direction: 'rtl',
    bidi: false,
    font: 'Vazir'
  },
  
  // متن هشدار
  warning: {
    color: '#d97706',
    bold: true,
    direction: 'rtl',
    bidi: false,
    font: 'Vazir'
  },
  
  // متن خطر
  danger: {
    color: '#dc2626',
    bold: true,
    direction: 'rtl',
    bidi: false,
    font: 'Vazir'
  }
};

// لایوت مدرن برای جداول
export const modernTableLayout = {
  fillColor: function(rowIndex: number, node: any, columnIndex: number) {
    if (rowIndex === 0) {
      return '#4f46e5'; // هدر آبی
    }
    return (rowIndex % 2 === 0) ? '#f8fafc' : null; // ردیف‌های متناوب
  },
  hLineWidth: function(i: number, node: any) {
    return 1.5;
  },
  vLineWidth: function(i: number, node: any) {
    return 1;
  },
  hLineColor: function(i: number, node: any) {
    return '#e2e8f0';
  },
  vLineColor: function(i: number, node: any) {
    return '#e2e8f0';
  },
  paddingLeft: function(i: number, node: any) {
    return 8;
  },
  paddingRight: function(i: number, node: any) {
    return 8;
  },
  paddingTop: function(i: number, node: any) {
    return 8;
  },
  paddingBottom: function(i: number, node: any) {
    return 8;
  }
};

// تنظیمات صفحه برای چاپ
export const printPageSettings = {
  pageSize: 'A4',
  pageOrientation: 'portrait' as const,
  pageMargins: [40, 60, 40, 60], // چپ، بالا، راست، پایین
  defaultStyle: {
    font: 'Vazir',
    fontSize: 12,
    alignment: 'right',
    direction: 'rtl',
    bidi: false,
    lineHeight: 1.3
  }
};
