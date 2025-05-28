
// توابع کمکی برای استایل‌دهی PDF

export function configureTableStyles() {
  return {
    fillColor: function (rowIndex: number) {
      return (rowIndex === 0) ? '#4a5568' : (rowIndex % 2 === 0 ? '#f7fafc' : null);
    },
    hLineWidth: () => 1,
    vLineWidth: () => 1,
    hLineColor: () => '#e2e8f0',
    vLineColor: () => '#e2e8f0'
  };
}

export function createSectionHeader(title: string) {
  return {
    text: title,
    style: 'subheader',
    alignment: 'center',
    margin: [0, 20, 0, 10],
    direction: 'rtl',
    font: 'Vazir'
  };
}
