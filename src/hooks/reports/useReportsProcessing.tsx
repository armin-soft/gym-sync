
/**
 * Hook for processing reports data
 */
export const useReportsProcessing = () => {
  // تابع کمکی برای محاسبه درصد رشد
  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  // پردازش داده‌های واقعی بر اساس تاریخ‌های ثبت نام
  const processRealData = (
    students: any[], 
    exercises: any[], 
    supplements: any[], 
    meals: any[], 
    timeRange: string
  ) => {
    // تعیین بازه‌های زمانی بر اساس محدوده انتخاب شده
    let monthsToShow = 6;
    switch (timeRange) {
      case 'week':
        monthsToShow = 1;
        break;
      case 'month':
        monthsToShow = 1;
        break;
      case 'quarter':
        monthsToShow = 3;
        break;
      case '6months':
        monthsToShow = 6;
        break;
      case 'year':
        monthsToShow = 12;
        break;
      default:
        monthsToShow = 6;
    }
    
    const today = new Date();
    const months: { [key: string]: any } = {};
    
    // ایجاد دوره‌های ماهانه
    for (let i = 0; i < monthsToShow; i++) {
      const date = new Date(today);
      date.setMonth(today.getMonth() - i);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      const monthName = i === 0 ? 'ماه جاری' : 
                       i === 1 ? 'ماه قبل' : 
                       `${i} ماه قبل`;
      
      months[monthKey] = {
        name: monthName,
        شاگردان: 0,
        درآمد: 0,
        تمرین: 0,
        مکمل: 0,
        برنامه_غذایی: 0,
        رشد_شاگردان: 0,
        رشد_درآمد: 0
      };
    }
    
    // پردازش داده‌های شاگردان
    students.forEach(student => {
      if (student.registrationDate) {
        const regDate = new Date(student.registrationDate);
        const monthKey = `${regDate.getFullYear()}-${regDate.getMonth() + 1}`;
        
        if (months[monthKey]) {
          months[monthKey].شاگردان += 1;
          months[monthKey].درآمد += student.monthlyFee || 200000; // استفاده از هزینه واقعی یا مقدار پیش‌فرض
        }
      }
    });
    
    // پردازش داده‌های تمرین
    exercises.forEach(exercise => {
      if (exercise.createdAt) {
        const createdDate = new Date(exercise.createdAt);
        const monthKey = `${createdDate.getFullYear()}-${createdDate.getMonth() + 1}`;
        
        if (months[monthKey]) {
          months[monthKey].تمرین += 1;
        }
      }
    });
    
    // پردازش داده‌های مکمل
    supplements.forEach(supplement => {
      if (supplement.createdAt) {
        const createdDate = new Date(supplement.createdAt);
        const monthKey = `${createdDate.getFullYear()}-${createdDate.getMonth() + 1}`;
        
        if (months[monthKey]) {
          months[monthKey].مکمل += 1;
        }
      }
    });
    
    // پردازش داده‌های غذایی
    meals.forEach(meal => {
      if (meal.createdAt) {
        const createdDate = new Date(meal.createdAt);
        const monthKey = `${createdDate.getFullYear()}-${createdDate.getMonth() + 1}`;
        
        if (months[monthKey]) {
          months[monthKey].برنامه_غذایی += 1;
        }
      }
    });
    
    // تبدیل به آرایه و مرتب‌سازی بر اساس تاریخ (از قدیمی به جدید)
    const monthlyData = Object.values(months).reverse();
    
    // محاسبه نرخ رشد
    const expandedData = monthlyData.map((item, index) => {
      if (index === 0) {
        return item;
      }
      
      const prevItem = monthlyData[index - 1];
      const studentGrowth = calculateGrowth(item.شاگردان, prevItem.شاگردان);
      const incomeGrowth = calculateGrowth(item.درآمد, prevItem.درآمد);
      
      return {
        ...item,
        رشد_شاگردان: studentGrowth,
        رشد_درآمد: incomeGrowth
      };
    });
    
    return { monthlyData, expandedData };
  };

  return {
    processRealData,
    calculateGrowth
  };
};

