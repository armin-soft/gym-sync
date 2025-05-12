
/**
 * اصلاح کلمات فارسی متداول و غلط‌های املایی رایج
 * @param text متن ورودی
 * @returns متن اصلاح شده
 */
export function correctPersianWords(text: string): string {
  // کلمات و عبارات رایج فارسی که ممکن است در تشخیص گفتار اشتباه شوند
  const corrections: Record<string, string> = {
    "سلام": "سلام",
    "خسته نباشید": "خسته نباشید",
    "ممنون": "ممنون",
    "تشکر": "تشکر",
    "سپاس": "سپاس",
    "حرکت": "حرکت",
    "تمرین": "تمرین",
    "ورزش": "ورزش",
    "دمبل": "دمبل",
    "هالتر": "هالتر",
    "پرس سینه": "پرس سینه",
    "جلو بازو": "جلو بازو",
    "پشت بازو": "پشت بازو",
    "اسکوات": "اسکوات",
    "زیربغل": "زیربغل",
    "سرشانه": "سرشانه",
    "پا": "پا",
    "کمر": "کمر",
    "شکم": "شکم",
    // اضافه کردن موارد بیشتر مطابق نیاز
  };

  let correctedText = text;
  
  // اعمال اصلاحات برای کلمات
  Object.keys(corrections).forEach(incorrect => {
    const regex = new RegExp(`\\b${incorrect}\\b`, "gi");
    correctedText = correctedText.replace(regex, corrections[incorrect]);
  });

  // حذف کاراکترهای غیرضروری
  correctedText = correctedText.replace(/\s+/g, " "); // حذف فاصله‌های اضافی
  
  return correctedText;
}
