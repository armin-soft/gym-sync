
/**
 * محاسبه درآمد کل از دانش‌آموزان
 */
export const calculateTotalIncome = (students: any[]) => {
  return students.reduce((total, student) => {
    const basePrice = 200000; // شهریه پایه
    return total + basePrice;
  }, 0);
};

/**
 * محاسبه درصد رشد
 */
export const calculateGrowth = (current: number, previous: number) => {
  if (!previous) return 0;
  return Math.round(((current - previous) / previous) * 100);
};

/**
 * تبدیل تاریخ میلادی به تاریخ شمسی
 */
export const formatJalaliDate = (date: Date): string => {
  // ماه‌های شمسی
  const jalaliMonths = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
  ];
  
  // تبدیل ساده (برای نمایش)
  const today = new Date();
  
  // اختلاف ساعت تهران با UTC (3.5 ساعت)
  const tehranOffset = 3.5 * 60 * 60 * 1000;
  // تنظیم تاریخ با زمان تهران
  const tehranDate = new Date(date.getTime() + tehranOffset);
  
  const gregorianYear = tehranDate.getUTCFullYear();
  const gregorianMonth = tehranDate.getUTCMonth();
  const gregorianDay = tehranDate.getUTCDate();
  const hours = tehranDate.getUTCHours();
  const minutes = tehranDate.getUTCMinutes();
  
  // محاسبه تاریخ شمسی (تقریبی)
  let jalaliYear = gregorianYear - 622;
  let jalaliMonth = gregorianMonth;
  let jalaliDay = gregorianDay;
  
  // تنظیم ماه‌ها (تقریبی)
  if (gregorianMonth < 2) {
    jalaliMonth = gregorianMonth + 10;
    jalaliYear = gregorianYear - 622;
  } else {
    jalaliMonth = gregorianMonth - 2;
    jalaliYear = gregorianYear - 621;
  }
  
  // فرمت زمان
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  
  // بررسی آیا تاریخ امروز است
  const isToday = 
    today.getUTCFullYear() === gregorianYear && 
    today.getUTCMonth() === gregorianMonth && 
    today.getUTCDate() === gregorianDay;
  
  // فرمت تاریخ و زمان
  if (isToday) {
    return `امروز، ${jalaliDay} ${jalaliMonths[jalaliMonth]} ${jalaliYear} - ساعت ${formattedHours}:${formattedMinutes}`;
  } else {
    return `${jalaliDay} ${jalaliMonths[jalaliMonth]} ${jalaliYear} - ساعت ${formattedHours}:${formattedMinutes}`;
  }
};

/**
 * ایجاد داده‌های تاریخی
 */
export const generateHistoricalData = (
  currentMonthStudents: any[], 
  prevMonthStudents: any[], 
  prevMonthSupplements: any[], 
  prevMonthMeals: any[], 
  exercises: any[], 
  supplements: any[], 
  meals: any[],
  timeRange: string = '6months'
) => {
  // تعیین تعداد ماه‌ها براساس بازه زمانی انتخاب شده
  let monthCount = 6; // پیش فرض 6 ماه
  
  switch (timeRange) {
    case '3months':
      monthCount = 3;
      break;
    case '1year':
      monthCount = 12;
      break;
    default:
      monthCount = 6;
  }
  
  // ماه جاری
  const currentData = {
    name: "ماه جاری",
    شاگردان: currentMonthStudents.length,
    درآمد: calculateTotalIncome(currentMonthStudents),
    تمرین: exercises.length,
    مکمل: supplements.length,
    برنامه_غذایی: meals.length
  };

  // ماه قبل
  const previousData = {
    name: "ماه قبل",
    شاگردان: prevMonthStudents.length,
    درآمد: calculateTotalIncome(prevMonthStudents),
    تمرین: Math.floor(exercises.length * 0.8), // تخمین تقریبی برای ماه قبل
    مکمل: prevMonthSupplements.length,
    برنامه_غذایی: prevMonthMeals.length
  };

  // ماه های قبلی به صورت پویا
  const historicalData = [];
  
  for (let i = 2; i < monthCount; i++) {
    const decayFactor = Math.pow(0.85, i-1); // ضریب کاهش برای ماه‌های قبلی
    
    historicalData.push({
      name: `${monthCount - i + 1} ماه قبل`,
      شاگردان: Math.floor(prevMonthStudents.length * decayFactor),
      درآمد: Math.floor(calculateTotalIncome(prevMonthStudents) * decayFactor),
      تمرین: Math.floor(exercises.length * decayFactor * 0.8),
      مکمل: Math.floor(prevMonthSupplements.length * decayFactor),
      برنامه_غذایی: Math.floor(prevMonthMeals.length * decayFactor)
    });
  }

  // مرتب‌سازی داده‌ها از قدیمی به جدید
  const monthlyData = [...historicalData.reverse(), previousData, currentData];

  // افزودن اطلاعات رشد به داده‌ها برای نمودار گسترده
  const expandedData = monthlyData.map((item, index) => {
    if (index === 0) {
      return {
        ...item,
        رشد_شاگردان: 0,
        رشد_درآمد: 0
      };
    }
    
    const prevItem = monthlyData[index - 1];
    return {
      ...item,
      رشد_شاگردان: calculateGrowth(item.شاگردان, prevItem.شاگردان),
      رشد_درآمد: calculateGrowth(item.درآمد, prevItem.درآمد)
    };
  });

  return { monthlyData, expandedData };
};
