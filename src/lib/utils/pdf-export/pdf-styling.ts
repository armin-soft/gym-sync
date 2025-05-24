import jsPDF from 'jspdf';
import { TableThemeOptions } from './types';
import { writeRTLText, addFontToPdf } from './pdf-fonts';

// پیکربندی استایل‌های جدول برای ظاهر یکنواخت
export function configureTableStyles(theme: string = 'primary'): any {
  const themes: Record<string, TableThemeOptions> = {
    primary: {
      headColor: [124, 58, 237],
      altColor: [245, 240, 255]
    },
    success: {
      headColor: [39, 174, 96],
      altColor: [240, 250, 240]
    },
    warning: {
      headColor: [230, 126, 34],
      altColor: [253, 242, 233]
    },
    info: {
      headColor: [52, 152, 219],
      altColor: [235, 245, 255]
    }
  };
  
  const themeConfig = themes[theme] || themes.primary;
  
  return {
    headStyles: {
      fillColor: themeConfig.headColor,
      textColor: [255, 255, 255],
      halign: 'right', // تغییر به راست برای RTL
      fontStyle: 'bold',
      fontSize: 12,
      cellPadding: 3,
    },
    bodyStyles: {
      halign: 'right', // تغییر به راست برای RTL
      fontSize: 10,
      cellPadding: 3,
    },
    alternateRowStyles: {
      fillColor: themeConfig.altColor,
    },
    theme: 'grid',
    margin: { right: 15, left: 15 },
    tableWidth: 'auto',
    styles: {
      overflow: 'linebreak',
      cellWidth: 'wrap',
      fontSize: 10,
      direction: 'rtl', // تنظیم جهت RTL برای جداول
    },
  };
}

// ایجاد هدر بخش با استایل
export function createSectionHeader(doc: jsPDF, title: string, yPos: number, color: number[]): number {
  try {
    // اطمینان از استفاده از فونت وزیر
    addFontToPdf(doc);
    
    // افزودن هدر بخش با استایل
    doc.setFillColor(color[0], color[1], color[2], 0.1);
    doc.roundedRect(15, yPos, 180, 10, 3, 3, 'F');
    
    doc.setFontSize(14);
    doc.setTextColor(color[0], color[1], color[2]);
    writeRTLText(doc, title, 105, yPos + 7, { align: 'center' });
    
    return yPos + 15; // بازگرداندن موقعیت Y به‌روز شده
  } catch (error) {
    console.error("خطا در ایجاد هدر بخش:", error);
    return yPos + 15; // بازگرداندن موقعیت پیش‌فرض در صورت بروز خطا
  }
}
