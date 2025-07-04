
/**
 * اصلاح کلمات فارسی متداول و غلط‌های املایی رایج
 * @param text متن ورودی
 * @returns متن اصلاح شده
 */
export function correctPersianWords(text: string): string {
  // کلمات و عبارات رایج فارسی که ممکن است در تشخیص گفتار اشتباه شوند
  const corrections: Record<string, string> = {
    // کلمات عمومی
    "سلام": "سلام",
    "خسته نباشید": "خسته نباشید",
    "ممنون": "ممنون",
    "تشکر": "تشکر",
    "سپاس": "سپاس",
    
    // اصطلاحات ورزشی - حرکات پایه
    "حرکت": "حرکت",
    "تمرین": "تمرین",
    "ورزش": "ورزش",
    "پرس": "پرس",
    "جلو": "جلو",
    "پشت": "پشت",
    "زیر": "زیر",
    "بالا": "بالا",
    "کش": "کش",
    "دراز": "دراز",
    "نشست": "نشست",
    "خم": "خم",
    "باز": "باز",
    "بسته": "بسته",
    
    // تجهیزات ورزشی
    "دمبل": "دمبل",
    "هالتر": "هالتر",
    "کتل‌بل": "کتل‌بل",
    "کتلبل": "کتل‌بل",
    "طناب": "طناب",
    "میله": "میله",
    "وزنه": "وزنه",
    "باند": "باند",
    "توپ": "توپ",
    "تردمیل": "تردمیل",
    "دوچرخه": "دوچرخه",
    "الپتیکال": "الپتیکال",
    "تی آر ایکس": "TRX",
    "تی‌آر‌ایکس": "TRX",
    "ترکس": "TRX",
    
    // حرکات ترکیبی
    "پرس سینه": "پرس سینه",
    "جلو بازو": "جلو بازو",
    "پشت بازو": "پشت بازو",
    "اسکوات": "اسکوات",
    "اسکات": "اسکوات",
    "لانگز": "لانگز",
    "لانج": "لانج",
    "زیربغل": "زیربغل",
    "زیر بغل": "زیربغل",
    "سرشانه": "سرشانه",
    "سر شانه": "سرشانه",
    "قفسه سینه": "قفسه سینه",
    "شکم": "شکم",
    "پروانه": "پروانه",
    "پلانک": "پلانک",
    "کرانچ": "کرانچ",
    "بارفیکس": "بارفیکس",
    "پارالل": "پارالل",
    "دیپ": "دیپ",
    "شنا": "شنا",
    "پوش آپ": "پوش‌آپ",
    "پوشاپ": "پوش‌آپ",
    "برپی": "برپی",
    "جامپینگ": "جامپینگ",
    "جامپینگ جک": "جامپینگ جک",
    
    // اعضای بدن
    "پا": "پا",
    "ساق": "ساق",
    "ران": "ران",
    "باسن": "باسن",
    "کمر": "کمر",
    "سینه": "سینه",
    "شانه": "شانه",
    "بازو": "بازو",
    "ساعد": "ساعد",
    "دست": "دست",
    "گردن": "گردن",
    
    // حالت‌های حرکت
    "ایستاده": "ایستاده",
    "نشسته": "نشسته",
    "خوابیده": "خوابیده",
    "طاقباز": "طاقباز",
    "دمر": "دمر",
    "پهلو": "پهلو",
    
    // تصحیح کلمات با غلط‌های املایی رایج در تشخیص گفتار فارسی
    "حرکات": "حرکات",
    "حرکت‌ها": "حرکت‌ها",
    "حرکتها": "حرکت‌ها",
    "تمرین‌ها": "تمرین‌ها",
    "تمرینها": "تمرین‌ها",
    "هالطر": "هالتر",
    "دمپل": "دمبل",
    "اسکوت": "اسکوات",
    "اسکوآت": "اسکوات",
    "اسکواط": "اسکوات",
    "زیر بقل": "زیربغل",
    "سر شونه": "سرشانه",
    "جلوبازو": "جلو بازو",
    "پشت‌بازو": "پشت بازو",
    "پشتبازو": "پشت بازو",
    "پرس‌سینه": "پرس سینه",
    "پرسینه": "پرس سینه",
    "قفسه‌سینه": "قفسه سینه",
    "قفسه‌ی سینه": "قفسه سینه",
    "قفسه ی سینه": "قفسه سینه"
  };

  let correctedText = text;
  
  // اصلاح کلمات بر اساس لیست تصحیح
  Object.keys(corrections).forEach(incorrect => {
    const regex = new RegExp(`\\b${incorrect}\\b`, "gi");
    correctedText = correctedText.replace(regex, corrections[incorrect]);
  });

  // حذف فاصله‌های اضافی
  correctedText = correctedText.replace(/\s+/g, " ").trim();
  
  // تبدیل فاصله‌های نیم‌فاصله به فاصله‌های استاندارد
  correctedText = correctedText.replace(/\u200C/g, " ");
  
  // اصلاح نقطه‌گذاری ها
  correctedText = correctedText.replace(/ \./g, ".");
  correctedText = correctedText.replace(/ \,/g, ",");
  
  // تبدیل کلمات انگلیسی به حروف بزرگ
  const englishTerms = ["TRX"];
  englishTerms.forEach(term => {
    const regex = new RegExp(`\\b${term}\\b`, "gi");
    correctedText = correctedText.replace(regex, term);
  });

  return correctedText;
}
