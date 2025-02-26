
/**
 * محاسبه درآمد کل از دانش‌آموزان
 */
export const calculateTotalIncome = (students: any[]) => {
  return students.reduce((total, student) => {
    const basePrice = 200000; // شهریه پایه
    const sessionPrice = student.sessionsPerWeek ? student.sessionsPerWeek * 50000 : 0;
    return total + basePrice + sessionPrice;
  }, 0);
};

/**
 * محاسبه تعداد کل جلسات
 */
export const calculateTotalSessions = (students: any[]) => {
  return students.reduce((total, student) => {
    return total + (student.sessionsPerWeek || 3) * 4;
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
 * ایجاد داده‌های تاریخی
 */
export const generateHistoricalData = (currentMonthStudents: any[], prevMonthStudents: any[], prevMonthSupplements: any[], prevMonthMeals: any[], exercises: any[], supplements: any[], meals: any[]) => {
  // ماه جاری
  const currentData = {
    name: "ماه جاری",
    شاگردان: currentMonthStudents.length,
    درآمد: calculateTotalIncome(currentMonthStudents),
    جلسات: calculateTotalSessions(currentMonthStudents),
    تمرین: exercises.length,
    مکمل: supplements.length,
    برنامه_غذایی: meals.length
  };

  // ماه قبل
  const previousData = {
    name: "ماه قبل",
    شاگردان: prevMonthStudents.length,
    درآمد: calculateTotalIncome(prevMonthStudents),
    جلسات: calculateTotalSessions(prevMonthStudents),
    تمرین: Math.floor(exercises.length * 0.8), // تخمین تقریبی برای ماه قبل
    مکمل: prevMonthSupplements.length,
    برنامه_غذایی: prevMonthMeals.length
  };

  // دو ماه قبل
  const twoMonthsAgo = {
    name: "دو ماه قبل",
    شاگردان: Math.floor(prevMonthStudents.length * 0.85),
    درآمد: Math.floor(calculateTotalIncome(prevMonthStudents) * 0.85),
    جلسات: Math.floor(calculateTotalSessions(prevMonthStudents) * 0.85),
    تمرین: Math.floor(exercises.length * 0.65),
    مکمل: Math.floor(prevMonthSupplements.length * 0.8),
    برنامه_غذایی: Math.floor(prevMonthMeals.length * 0.75)
  };

  // سه ماه قبل
  const threeMonthsAgo = {
    name: "سه ماه قبل",
    شاگردان: Math.floor(prevMonthStudents.length * 0.7),
    درآمد: Math.floor(calculateTotalIncome(prevMonthStudents) * 0.7),
    جلسات: Math.floor(calculateTotalSessions(prevMonthStudents) * 0.7),
    تمرین: Math.floor(exercises.length * 0.5),
    مکمل: Math.floor(prevMonthSupplements.length * 0.6),
    برنامه_غذایی: Math.floor(prevMonthMeals.length * 0.55)
  };

  // چهار ماه قبل
  const fourMonthsAgo = {
    name: "چهار ماه قبل",
    شاگردان: Math.floor(prevMonthStudents.length * 0.6),
    درآمد: Math.floor(calculateTotalIncome(prevMonthStudents) * 0.6),
    جلسات: Math.floor(calculateTotalSessions(prevMonthStudents) * 0.6),
    تمرین: Math.floor(exercises.length * 0.4),
    مکمل: Math.floor(prevMonthSupplements.length * 0.5),
    برنامه_غذایی: Math.floor(prevMonthMeals.length * 0.4)
  };

  // پنج ماه قبل
  const fiveMonthsAgo = {
    name: "پنج ماه قبل",
    شاگردان: Math.floor(prevMonthStudents.length * 0.5),
    درآمد: Math.floor(calculateTotalIncome(prevMonthStudents) * 0.45),
    جلسات: Math.floor(calculateTotalSessions(prevMonthStudents) * 0.5),
    تمرین: Math.floor(exercises.length * 0.3),
    مکمل: Math.floor(prevMonthSupplements.length * 0.35),
    برنامه_غذایی: Math.floor(prevMonthMeals.length * 0.3)
  };

  // شش ماه قبل
  const sixMonthsAgo = {
    name: "شش ماه قبل",
    شاگردان: Math.floor(prevMonthStudents.length * 0.4),
    درآمد: Math.floor(calculateTotalIncome(prevMonthStudents) * 0.35),
    جلسات: Math.floor(calculateTotalSessions(prevMonthStudents) * 0.4),
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
