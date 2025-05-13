
/**
 * Hook for processing reports data
 */
export const useReportsProcessing = () => {
  // Helper function for calculating growth percentage with safety checks
  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    if (isNaN(current) || isNaN(previous)) return 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  // Process data based on the provided inputs with extensive safety checks
  const processRealData = (
    students: any[] = [], 
    exercises: any[] = [], 
    supplements: any[] = [], 
    meals: any[] = [], 
    timeRange: string = '6months'
  ) => {
    try {
      // Ensure we have arrays even if undefined was passed
      const safeStudents = Array.isArray(students) ? students : [];
      const safeExercises = Array.isArray(exercises) ? exercises : [];
      const safeSupplements = Array.isArray(supplements) ? supplements : [];
      const safeMeals = Array.isArray(meals) ? meals : [];

      // Set time range with safety check
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
      
      // Process student data with safety checks for each student
      safeStudents.forEach(student => {
        if (student && student.registrationDate) {
          try {
            const regDate = new Date(student.registrationDate);
            if (!isNaN(regDate.getTime())) {
              const monthKey = `${regDate.getFullYear()}-${regDate.getMonth() + 1}`;
              
              if (months[monthKey]) {
                months[monthKey].شاگردان += 1;
                const monthlyFee = typeof student.monthlyFee === 'number' ? student.monthlyFee : 200000;
                months[monthKey].درآمد += !isNaN(monthlyFee) ? monthlyFee : 0;
              }
            }
          } catch (error) {
            console.error("Error processing student data:", error);
          }
        }
      });
      
      // Process exercise data with safety checks
      safeExercises.forEach(exercise => {
        if (exercise && exercise.createdAt) {
          try {
            const createdDate = new Date(exercise.createdAt);
            if (!isNaN(createdDate.getTime())) {
              const monthKey = `${createdDate.getFullYear()}-${createdDate.getMonth() + 1}`;
              
              if (months[monthKey]) {
                months[monthKey].تمرین += 1;
              }
            }
          } catch (error) {
            console.error("Error processing exercise data:", error);
          }
        }
      });
      
      // Process supplement data with safety checks
      safeSupplements.forEach(supplement => {
        if (supplement && supplement.createdAt) {
          try {
            const createdDate = new Date(supplement.createdAt);
            if (!isNaN(createdDate.getTime())) {
              const monthKey = `${createdDate.getFullYear()}-${createdDate.getMonth() + 1}`;
              
              if (months[monthKey]) {
                months[monthKey].مکمل += 1;
              }
            }
          } catch (error) {
            console.error("Error processing supplement data:", error);
          }
        }
      });
      
      // Process meal data with safety checks
      safeMeals.forEach(meal => {
        if (meal && meal.createdAt) {
          try {
            const createdDate = new Date(meal.createdAt);
            if (!isNaN(createdDate.getTime())) {
              const monthKey = `${createdDate.getFullYear()}-${createdDate.getMonth() + 1}`;
              
              if (months[monthKey]) {
                months[monthKey].برنامه_غذایی += 1;
              }
            }
          } catch (error) {
            console.error("Error processing meal data:", error);
          }
        }
      });
      
      // Convert to array and sort from oldest to newest
      const monthlyData = Object.values(months).reverse();
      
      // Calculate growth rates with safety checks
      const expandedData = monthlyData.map((item, index) => {
        if (index === 0) {
          return item;
        }
        
        const prevItem = monthlyData[index - 1];
        const studentGrowth = calculateGrowth(item.شاگردان || 0, prevItem.شاگردان || 0);
        const incomeGrowth = calculateGrowth(item.درآمد || 0, prevItem.درآمد || 0);
        
        return {
          ...item,
          رشد_شاگردان: studentGrowth,
          رشد_درآمد: incomeGrowth
        };
      });
      
      return { monthlyData, expandedData };
    } catch (error) {
      console.error("Fatal error in processRealData:", error);
      return { monthlyData: [], expandedData: [] };
    }
  };

  return {
    processRealData,
    calculateGrowth
  };
};
