
/**
 * Hook for processing reports data
 */
export const useReportsProcessing = () => {
  // Helper function for calculating growth percentage
  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  // Process data based on the provided inputs
  const processRealData = (
    students: any[] = [], 
    exercises: any[] = [], 
    supplements: any[] = [], 
    meals: any[] = [], 
    timeRange: string = '6months'
  ) => {
    // Ensure we have arrays even if undefined was passed
    const safeStudents = Array.isArray(students) ? students : [];
    const safeExercises = Array.isArray(exercises) ? exercises : [];
    const safeSupplements = Array.isArray(supplements) ? supplements : [];
    const safeMeals = Array.isArray(meals) ? meals : [];

    // Set time range
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
    
    // Create monthly periods
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
    
    // Process student data
    safeStudents.forEach(student => {
      if (student && student.registrationDate) {
        try {
          const regDate = new Date(student.registrationDate);
          const monthKey = `${regDate.getFullYear()}-${regDate.getMonth() + 1}`;
          
          if (months[monthKey]) {
            months[monthKey].شاگردان += 1;
            months[monthKey].درآمد += typeof student.monthlyFee === 'number' ? student.monthlyFee : 200000; 
          }
        } catch (error) {
          console.error("Error processing student data:", error);
        }
      }
    });
    
    // Process exercise data
    safeExercises.forEach(exercise => {
      if (exercise && exercise.createdAt) {
        try {
          const createdDate = new Date(exercise.createdAt);
          const monthKey = `${createdDate.getFullYear()}-${createdDate.getMonth() + 1}`;
          
          if (months[monthKey]) {
            months[monthKey].تمرین += 1;
          }
        } catch (error) {
          console.error("Error processing exercise data:", error);
        }
      }
    });
    
    // Process supplement data
    safeSupplements.forEach(supplement => {
      if (supplement && supplement.createdAt) {
        try {
          const createdDate = new Date(supplement.createdAt);
          const monthKey = `${createdDate.getFullYear()}-${createdDate.getMonth() + 1}`;
          
          if (months[monthKey]) {
            months[monthKey].مکمل += 1;
          }
        } catch (error) {
          console.error("Error processing supplement data:", error);
        }
      }
    });
    
    // Process meal data
    safeMeals.forEach(meal => {
      if (meal && meal.createdAt) {
        try {
          const createdDate = new Date(meal.createdAt);
          const monthKey = `${createdDate.getFullYear()}-${createdDate.getMonth() + 1}`;
          
          if (months[monthKey]) {
            months[monthKey].برنامه_غذایی += 1;
          }
        } catch (error) {
          console.error("Error processing meal data:", error);
        }
      }
    });
    
    // Convert to array and sort from oldest to newest
    const monthlyData = Object.values(months).reverse();
    
    // Calculate growth rates
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
