
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
export const generateHistoricalData = (currentMonthStudents: any[], prevMonthStudents: any[], prevMonthSupplements: any[], prevMonthMeals: any[], exercises: any[], supplements: any[], meals: any[]) => {
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

  // دو ماه قبل
  const twoMonthsAgo = {
    name: "دو ماه قبل",
    شاگردان: Math.floor(prevMonthStudents.length * 0.85),
    درآمد: Math.floor(calculateTotalIncome(prevMonthStudents) * 0.85),
    تمرین: Math.floor(exercises.length * 0.65),
    مکمل: Math.floor(prevMonthSupplements.length * 0.8),
    برنامه_غذایی: Math.floor(prevMonthMeals.length * 0.75)
  };

  // سه ماه قبل
  const threeMonthsAgo = {
    name: "سه ماه قبل",
    شاگردان: Math.floor(prevMonthStudents.length * 0.7),
    درآمد: Math.floor(calculateTotalIncome(prevMonthStudents) * 0.7),
    تمرین: Math.floor(exercises.length * 0.5),
    مکمل: Math.floor(prevMonthSupplements.length * 0.6),
    برنامه_غذایی: Math.floor(prevMonthMeals.length * 0.55)
  };

  // چهار ماه قبل
  const fourMonthsAgo = {
    name: "چهار ماه قبل",
    شاگردان: Math.floor(prevMonthStudents.length * 0.6),
    درآمد: Math.floor(calculateTotalIncome(prevMonthStudents) * 0.6),
    تمرین: Math.floor(exercises.length * 0.4),
    مکمل: Math.floor(prevMonthSupplements.length * 0.5),
    برنامه_غذایی: Math.floor(prevMonthMeals.length * 0.4)
  };

  // پنج ماه قبل
  const fiveMonthsAgo = {
    name: "پنج ماه قبل",
    شاگردان: Math.floor(prevMonthStudents.length * 0.5),
    درآمد: Math.floor(calculateTotalIncome(prevMonthStudents) * 0.45),
    تمرین: Math.floor(exercises.length * 0.3),
    مکمل: Math.floor(prevMonthSupplements.length * 0.35),
    برنامه_غذایی: Math.floor(prevMonthMeals.length * 0.3)
  };

  // شش ماه قبل
  const sixMonthsAgo = {
    name: "شش ماه قبل",
    شاگردان: Math.floor(prevMonthStudents.length * 0.4),
    درآمد: Math.floor(calculateTotalIncome(prevMonthStudents) * 0.35),
    تمرین: Math.floor(exercises.length * 0.2),
    مکمل: Math.floor(prevMonthSupplements.length * 0.25),
    برنامه_غذایی: Math.floor(prevMonthMeals.length * 0.2)
  };

  // محاسبه رشد ماهانه برای داده‌های گسترده
  const expandedDataWithGrowth = [
    sixMonthsAgo,
    fiveMonthsAgo,
    fourMonthsAgo,
    threeMonthsAgo,
    twoMonthsAgo,
    previousData,
    currentData
  ].map((data, index, array) => {
    if (index === 0) {
      return {
        ...data,
        رشد_شاگردان: 0,
        رشد_درآمد: 0
      };
    }
    
    const prevMonth = array[index - 1];
    return {
      ...data,
      رشد_شاگردان: calculateGrowth(data.شاگردان, prevMonth.شاگردان),
      رشد_درآمد: calculateGrowth(data.درآمد, prevMonth.درآمد)
    };
  });

  return {
    expandedData: expandedDataWithGrowth,
    monthlyData: [previousData, currentData]
  };
};
