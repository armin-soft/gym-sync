
import { useState, useEffect, useCallback } from "react";

/**
 * هوک برای بروزرسانی خودکار داده‌های دانشجو
 */
export function useStudentRefresh() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // تابع برای شروع بروزرسانی
  const triggerRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
    // شبیه‌سازی یک رویداد storage برای بروزرسانی سایر تب‌ها
    window.dispatchEvent(new StorageEvent('storage', { key: 'students' }));
  }, []);

  // گوش دادن به تغییرات localStorage
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'students') {
        setRefreshTrigger(prev => prev + 1);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { refreshTrigger, triggerRefresh };
}
