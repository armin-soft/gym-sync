
/**
 * اصلاح کلمات فارسی در متن تشخیص داده شده
 */

interface WordCorrection {
  wrong: string | RegExp;
  correct: string;
}

// لیست تصحیح کلمات پرکاربرد در تمرینات ورزشی
const EXERCISE_WORD_CORRECTIONS: WordCorrection[] = [
  // اصلاح نام حرکات عمومی
  { wrong: /پرس سینه/gi, correct: "پرس سینه" },
  { wrong: /هالتر/gi, correct: "هالتر" },
  { wrong: /دمبل/gi, correct: "دمبل" },
  { wrong: /اسکات/gi, correct: "اسکات" },
  { wrong: /پروانه/gi, correct: "پروانه" },
  { wrong: /جلو بازو/gi, correct: "جلو بازو" },
  { wrong: /پشت بازو/gi, correct: "پشت بازو" },
  { wrong: /زیر بغل/gi, correct: "زیر بغل" },
  { wrong: /سرشانه/gi, correct: "سرشانه" },
  { wrong: /کول/gi, correct: "کول" },
  { wrong: /شنا/gi, correct: "شنا" },
  { wrong: /لت/gi, correct: "لت" },
  { wrong: /جلو پا/gi, correct: "جلو پا" },
  { wrong: /پشت پا/gi, correct: "پشت پا" },
  { wrong: /سیم کش/gi, correct: "سیم کش" },
  { wrong: /ساق پا/gi, correct: "ساق پا" },
  { wrong: /پلانک/gi, correct: "پلانک" },
  { wrong: /میز رومانی/gi, correct: "میز رومانی" },
  { wrong: /شکم/gi, correct: "شکم" },
  
  // اصلاح توصیفات حرکات
  { wrong: /خوابیده/gi, correct: "خوابیده" },
  { wrong: /ایستاده/gi, correct: "ایستاده" },
  { wrong: /نشسته/gi, correct: "نشسته" },
  { wrong: /صاف/gi, correct: "صاف" },
  { wrong: /چکشی/gi, correct: "چکشی" },
  { wrong: /معکوس/gi, correct: "معکوس" },
  { wrong: /دستگاه/gi, correct: "دستگاه" },
  { wrong: /ثابت/gi, correct: "ثابت" },
  { wrong: /متحرک/gi, correct: "متحرک" },
  { wrong: /سوپر ست/gi, correct: "سوپر ست" },
  { wrong: /سوپرست/gi, correct: "سوپر ست" },
  
  // اعداد فارسی
  { wrong: /یک/gi, correct: "یک" },
  { wrong: /دو/gi, correct: "دو" },
  { wrong: /سه/gi, correct: "سه" },
  { wrong: /چهار/gi, correct: "چهار" },
  { wrong: /پنج/gi, correct: "پنج" },
  { wrong: /شش/gi, correct: "شش" },
  { wrong: /هفت/gi, correct: "هفت" },
  { wrong: /هشت/gi, correct: "هشت" },
  { wrong: /نه/gi, correct: "نه" },
  { wrong: /ده/gi, correct: "ده" },
  
  // اصلاح نام های دستگاه
  { wrong: /اسمیت/gi, correct: "اسمیت" },
  { wrong: /کراس/gi, correct: "کراس" },
  { wrong: /کراس آور/gi, correct: "کراس آور" },
  { wrong: /کابل/gi, correct: "کابل" },
  { wrong: /تی آر ایکس/gi, correct: "TRX" },
  { wrong: /تی‌آر‌ایکس/gi, correct: "TRX" },
  { wrong: /تردمیل/gi, correct: "تردمیل" },
  { wrong: /الپتیکال/gi, correct: "الپتیکال" },
  
  // اصلاح کلمات مخفف
  { wrong: /دی بی/gi, correct: "DB" },
  { wrong: /بی بی/gi, correct: "BB" },
  { wrong: /ای زد/gi, correct: "EZ" },
  
  // اصلاح اشتباهات رایج
  { wrong: /پرسینه/gi, correct: "پرس سینه" },
  { wrong: /جلوبازو/gi, correct: "جلو بازو" },
  { wrong: /پشت‌بازو/gi, correct: "پشت بازو" },
  { wrong: /زیربغل/gi, correct: "زیر بغل" },
  { wrong: /سر شانه/gi, correct: "سرشانه" },
  { wrong: /پشت‌پا/gi, correct: "پشت پا" },
  { wrong: /جلوپا/gi, correct: "جلو پا" },
  { wrong: /ساق‌پا/gi, correct: "ساق پا" },
];

/**
 * اصلاح متن تشخیص داده شده با تصحیح کلمات پرکاربرد در حوزه تمرینات ورزشی
 * @param text متن اصلی
 * @returns متن اصلاح شده
 */
export function correctPersianWords(text: string): string {
  if (!text) return text;
  
  let correctedText = text;
  
  // اعمال تصحیحات
  EXERCISE_WORD_CORRECTIONS.forEach(({ wrong, correct }) => {
    correctedText = correctedText.replace(wrong, correct);
  });
  
  // حذف فاصله‌های اضافه
  correctedText = correctedText.replace(/\s+/g, ' ').trim();
  
  return correctedText;
}
