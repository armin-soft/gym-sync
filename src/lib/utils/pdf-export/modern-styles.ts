
// تنظیمات استایل مدرن برای PDF
export const modernPdfStyles = {
  header: {
    fontSize: 18,
    bold: false, // تغییر به false
    alignment: 'center',
    margin: [0, 0, 0, 20],
    color: '#1f2937',
    font: 'Vazir'
  },
  subheader: {
    fontSize: 14,
    bold: false, // تغییر به false  
    alignment: 'center',
    margin: [0, 0, 0, 10],
    color: '#374151',
    font: 'Vazir'
  },
  tableHeader: {
    bold: false, // تغییر به false
    fontSize: 11,
    color: 'white',
    alignment: 'center',
    font: 'Vazir'
  },
  tableCell: {
    fontSize: 10,
    margin: [2, 4, 2, 4],
    font: 'Vazir'
  }
};

// تنظیمات صفحه برای چاپ
export const printPageSettings = {
  pageSize: 'A4',
  pageOrientation: 'portrait' as const,
  pageMargins: [40, 60, 40, 80],
  defaultStyle: {
    font: 'Vazir',
    fontSize: 11,
    direction: 'rtl',
    alignment: 'right'
  }
};

// تنظیمات مدرن جدول
export const modernTableLayout = {
  fillColor: function (rowIndex: number) {
    return (rowIndex === 0) ? '#4a5568' : (rowIndex % 2 === 0 ? '#f7fafc' : null);
  },
  hLineWidth: () => 1,
  vLineWidth: () => 1,
  hLineColor: () => '#e2e8f0',
  vLineColor: () => '#e2e8f0'
};
