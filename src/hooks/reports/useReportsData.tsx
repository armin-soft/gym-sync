
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { toPersianNumbers } from '@/lib/utils/numbers';

export const useReportsData = () => {
  const { toast } = useToast();
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [expandedData, setExpandedData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState("6months");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const loadData = () => {
    setIsRefreshing(true);
    try {
      // Get actual data from localStorage
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      const exercises = JSON.parse(localStorage.getItem('exercises') || '[]');
      const supplements = JSON.parse(localStorage.getItem('supplementList') || '[]');
      const meals = JSON.parse(localStorage.getItem('meals') || '[]');
      
      console.log('Real data loaded:', { 
        students: students.length, 
        exercises: exercises.length, 
        supplements: supplements.length, 
        meals: meals.length 
      });
      
      // Process data based on time range
      const processedData = processRealData(students, exercises, supplements, meals, timeRange);
      
      setMonthlyData(processedData.monthlyData);
      setExpandedData(processedData.expandedData);
      setIsLoading(false);
      setIsRefreshing(false);
      
      toast({
        title: "اطلاعات با موفقیت بارگذاری شد",
        description: `${toPersianNumbers(processedData.monthlyData.length)} دوره زمانی بارگذاری شد`,
        variant: "default",
      });
    } catch (error) {
      console.error('Error loading data:', error);
      setIsLoading(false);
      setIsRefreshing(false);
      
      toast({
        title: "خطا در بارگذاری اطلاعات",
        description: "لطفا مجددا تلاش کنید",
        variant: "destructive",
      });
    }
  };

  // Process real data based on registration dates
  const processRealData = (students: any[], exercises: any[], supplements: any[], meals: any[], timeRange: string) => {
    // Define time periods based on selected range
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
    
    // Create monthly buckets
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
    students.forEach(student => {
      if (student.registrationDate) {
        const regDate = new Date(student.registrationDate);
        const monthKey = `${regDate.getFullYear()}-${regDate.getMonth() + 1}`;
        
        if (months[monthKey]) {
          months[monthKey].شاگردان += 1;
          months[monthKey].درآمد += student.monthlyFee || 200000; // Use actual fee or default
        }
      }
    });
    
    // Process exercise data
    exercises.forEach(exercise => {
      if (exercise.createdAt) {
        const createdDate = new Date(exercise.createdAt);
        const monthKey = `${createdDate.getFullYear()}-${createdDate.getMonth() + 1}`;
        
        if (months[monthKey]) {
          months[monthKey].تمرین += 1;
        }
      }
    });
    
    // Process supplement data
    supplements.forEach(supplement => {
      if (supplement.createdAt) {
        const createdDate = new Date(supplement.createdAt);
        const monthKey = `${createdDate.getFullYear()}-${createdDate.getMonth() + 1}`;
        
        if (months[monthKey]) {
          months[monthKey].مکمل += 1;
        }
      }
    });
    
    // Process meal data
    meals.forEach(meal => {
      if (meal.createdAt) {
        const createdDate = new Date(meal.createdAt);
        const monthKey = `${createdDate.getFullYear()}-${createdDate.getMonth() + 1}`;
        
        if (months[monthKey]) {
          months[monthKey].برنامه_غذایی += 1;
        }
      }
    });
    
    // Convert to array and sort by date (oldest to newest)
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
  
  // Helper function to calculate growth percentage
  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  // Load data effect
  useEffect(() => {
    loadData();
    
    // Update on localStorage changes
    const handleStorageChange = () => {
      console.log('Storage changed, reloading data');
      loadData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [timeRange]);

  const handleRefresh = () => {
    loadData();
  };

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  const closeFilters = () => {
    setFiltersOpen(false);
  };

  return {
    monthlyData,
    expandedData,
    isLoading,
    isRefreshing,
    timeRange,
    filtersOpen,
    setTimeRange,
    handleRefresh,
    toggleFilters,
    closeFilters
  };
};
