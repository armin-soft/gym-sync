
export function createCustomFooter() {
  // مقدار پاورقی ثابت در تمام صفحات
  return function() {
    return [{
      text: '@mohamadabasi_fix - ۰۹۱۲۳۸۲۳۸۸۶ - gym-fix.ir',
      alignment: 'center',
      fontSize: 11,
      margin: [0, 8, 0, 4],
      color: '#888',
      font: 'Vazir',
      direction: 'rtl'
    }];
  }
}
