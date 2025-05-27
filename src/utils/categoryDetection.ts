
import { ExerciseCategory } from "@/types/exercise";

// دیکشنری کلمات کلیدی برای هر دسته‌بندی
const categoryKeywords: Record<string, string[]> = {
  "سینه": [
    "سینه", "پرس سینه", "پوش آپ", "شنا", "فلای", "دیپ", "بارفیکس", "بنچ پرس",
    "پرس بالا سینه", "پرس سینه شیب دار", "کراس اور"
  ],
  "پشت": [
    "پشت", "کشش", "پولاپ", "رو بار", "لت پولاپ", "بارفیکس معکوس", "رو", "رویینگ",
    "شراگ", "دد لیفت", "کتف", "هایپراکستنشن"
  ],
  "شانه": [
    "شانه", "پرس سر بالا", "شولدر", "لترال رایز", "فرانت رایز", "دلتوئید", "آرنولد پرس",
    "رایز", "شانه جلو", "شانه کنار", "شانه عقب"
  ],
  "بازو": [
    "بازو", "دوسر بازو", "سه سر بازو", "بایسپس", "ترایسپس", "هامر کرل", "باربل کرل",
    "فرنچ پرس", "دیپ", "کرل", "اکستنشن"
  ],
  "پا": [
    "پا", "اسکات", "جلو پا", "ران", "ساق", "کوادریسپس", "همسترینگ", "گاو", "لانج",
    "پرس پا", "کاف رایز", "ددلیفت", "گلوت"
  ],
  "شکم": [
    "شکم", "کرانچ", "پلانک", "سیت آپ", "لگ رایز", "روسی", "ابز", "کور", "باطن",
    "برگشت شکم", "دراز و نشست"
  ],
  "کارس": [
    "کاردیو", "دوبدن", "تردمیل", "دوچرخه", "بورپی", "جامپینگ جک", "هیت",
    "اینتروال", "ایروبیک", "استقامتی"
  ],
  "کششی": [
    "کشش", "استرچ", "کششی", "انعطاف", "یوگا", "پیلاتس", "موبیلیتی", "گرم کردن",
    "سرد کردن", "انعطاف پذیری"
  ]
};

/**
 * تشخیص دسته‌بندی مناسب براساس نام حرکت
 */
export const detectExerciseCategory = (
  exerciseName: string, 
  categories: ExerciseCategory[]
): ExerciseCategory | null => {
  if (!exerciseName || !categories.length) return null;

  const normalizedName = exerciseName.toLowerCase().trim();
  
  // جستجو در کلمات کلیدی
  for (const [categoryType, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (normalizedName.includes(keyword.toLowerCase())) {
        // پیدا کردن دسته‌بندی مطابق در لیست دسته‌بندی‌ها
        const matchedCategory = categories.find(cat => 
          cat.name.toLowerCase().includes(categoryType.toLowerCase()) ||
          cat.type?.toLowerCase().includes(categoryType.toLowerCase())
        );
        
        if (matchedCategory) {
          return matchedCategory;
        }
      }
    }
  }

  // اگر هیچ تطبیقی پیدا نشد، اولین دسته‌بندی را برگردان
  return categories[0] || null;
};

/**
 * پیشنهاد چندین دسته‌بندی احتمالی
 */
export const suggestCategories = (
  exerciseName: string,
  categories: ExerciseCategory[]
): ExerciseCategory[] => {
  if (!exerciseName || !categories.length) return [];

  const normalizedName = exerciseName.toLowerCase().trim();
  const suggestions: { category: ExerciseCategory; score: number }[] = [];
  
  // محاسبه امتیاز برای هر دسته‌بندی
  for (const [categoryType, keywords] of Object.entries(categoryKeywords)) {
    let score = 0;
    
    for (const keyword of keywords) {
      if (normalizedName.includes(keyword.toLowerCase())) {
        score += keyword.length; // کلمات طولانی‌تر امتیاز بیشتری دارند
      }
    }
    
    if (score > 0) {
      const matchedCategory = categories.find(cat => 
        cat.name.toLowerCase().includes(categoryType.toLowerCase()) ||
        cat.type?.toLowerCase().includes(categoryType.toLowerCase())
      );
      
      if (matchedCategory) {
        suggestions.push({ category: matchedCategory, score });
      }
    }
  }
  
  // مرتب‌سازی براساس امتیاز و برگرداندن بهترین پیشنهادها
  return suggestions
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(s => s.category);
};

export default detectExerciseCategory;
