
import { TableThemeOptions } from './types';
import { preprocessPersianText } from './pdf-fonts';

// پیکربندی استایل‌های جدول
export function configureTableStyles(theme: string = 'primary'): any {
  const themes: Record<string, TableThemeOptions> = {
    primary: {
      headerColor: '#7c3aed',
      headerTextColor: 'white',
      rowColor: '#ffffff',
      alternateRowColor: '#f8fafc'
    },
    success: {
      headerColor: '#27ae60',
      headerTextColor: 'white',
      rowColor: '#ffffff',
      alternateRowColor: '#f0fff4'
    },
    warning: {
      headerColor: '#e67e22',
      headerTextColor: 'white',
      rowColor: '#ffffff',
      alternateRowColor: '#fffbf0'
    },
    info: {
      headerColor: '#3498db',
      headerTextColor: 'white',
      rowColor: '#ffffff',
      alternateRowColor: '#f0f9ff'
    }
  };
  
  const themeConfig = themes[theme] || themes.primary;
  
  return {
    fillColor: function (rowIndex: number) {
      return rowIndex === 0 ? themeConfig.headerColor : 
             rowIndex % 2 === 0 ? themeConfig.alternateRowColor : themeConfig.rowColor;
    },
    hLineWidth: () => 1,
    vLineWidth: () => 1,
    hLineColor: () => '#e2e8f0',
    vLineColor: () => '#e2e8f0'
  };
}

// ایجاد هدر بخش
export function createSectionHeader(title: string, color: string = '#7c3aed'): any {
  return {
    text: preprocessPersianText(title),
    style: 'subheader',
    color: color,
    margin: [0, 20, 0, 10]
  };
}
