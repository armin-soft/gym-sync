
import { useState, useEffect, useCallback } from "react";
import { safeJSONParse } from "@/utils/database/index";

/**
 * هوک برای بروزرسانی خودکار داده‌های دانشجو
 * این هوک به صورت خودکار داده‌ها را از localStorage بارگذاری مجدد می‌کند
 */
export function useStudentRefresh() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // تابع برای شروع بروزرسانی دستی
  const triggerRefresh = useCallback(() => {
    console.log('Manual refresh triggered at:', new Date().toLocaleTimeString());
    setRefreshTrigger(prev => prev + 1);
    setLastRefresh(new Date());
    
    // شبیه‌سازی یک رویداد storage برای بروزرسانی سایر تب‌ها
    window.dispatchEvent(new StorageEvent('storage', { key: 'students_refresh' }));
  }, []);

  // گوش دادن به تغییرات localStorage
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'students' || e.key === 'students_refresh') {
        console.log('Storage change detected, refreshing data...');
        setRefreshTrigger(prev => prev + 1);
        setLastRefresh(new Date());
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Set up periodic refresh (every 60 seconds)
    const autoRefreshInterval = setInterval(() => {
      console.log('Auto refresh checking for new data...');
      // Only refresh if there are changes
      const studentsData = safeJSONParse('students', []);
      if (Array.isArray(studentsData) && studentsData.some(s => 
        s.lastUpdate && new Date(s.lastUpdate) > lastRefresh)) {
        console.log('New data detected, refreshing...');
        setRefreshTrigger(prev => prev + 1);
        setLastRefresh(new Date());
      }
    }, 60000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(autoRefreshInterval);
    };
  }, [lastRefresh]);

  return { refreshTrigger, triggerRefresh, lastRefresh };
}
