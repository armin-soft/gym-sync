
import React, { useState, useEffect, useMemo } from "react";
import { ModernSidebar } from "@/components/modern-sidebar/ModernSidebar";
import { studentSidebarItems } from "./data/studentSidebarItems";
import { useStudentProfileData } from "./hooks/useStudentProfileData";
import { useStudentStatsData } from "./hooks/useStudentStatsData";
import { handleStudentLogout } from "./utils/studentAuthUtils";
import { Menu, Bell } from "lucide-react";
import { AppIcon } from "@/components/ui/app-icon";
import { Button } from "@/components/ui/button";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface StudentLayoutProps {
  children: React.ReactNode;
}

export const StudentLayout: React.FC<StudentLayoutProps> = React.memo(({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [gymName, setGymName] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const { studentProfile, loadProfile } = useStudentProfileData();
  const { stats, loadStats } = useStudentStatsData();
  const deviceInfo = useDeviceInfo();

  // بهینه‌سازی تشخیص دستگاه موبایل
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    const debouncedResize = debounce(checkIsMobile, 150);
    window.addEventListener('resize', debouncedResize);

    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  // بارگذاری داده‌ها فقط یک بار
  useEffect(() => {
    loadProfile();
    loadStats();
  }, []);

  // بارگذاری اطلاعات باشگاه
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('trainerProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setGymName(profile.gymName || "");
      }
    } catch (error) {
      console.error('خطا در بارگذاری پروفایل:', error);
    }
  }, []);

  // بارگذاری تعداد پیام‌های خوانده نشده
  useEffect(() => {
    const loadUnreadMessages = () => {
      try {
        const savedMessages = localStorage.getItem('supportMessages');
        if (savedMessages) {
          const messages = JSON.parse(savedMessages);
          const unreadCount = messages.filter((msg: any) => msg.status === 'unread').length;
          setUnreadMessages(unreadCount);
        }
      } catch (error) {
        console.error('خطا در بارگذاری پیام‌ها:', error);
      }
    };

    loadUnreadMessages();

    // گوش دادن به تغییرات پیام‌ها
    const handleStorageChange = () => {
      loadUnreadMessages();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('supportMessagesUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('supportMessagesUpdated', handleStorageChange);
    };
  }, []);

  // مدیریت اسکرول
  const scrollHandler = useMemo(() => () => {
    const offset = window.scrollY;
    setScrolled(offset > 10);
  }, []);
  
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [scrollHandler]);

  const handleSidebarToggle = useMemo(() => () => {
    setSidebarOpen(!sidebarOpen);
  }, [sidebarOpen]);

  const convertToFarsiNumbers = (num: number): string => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, (digit) => farsiDigits[parseInt(digit)]);
  };
  
  // محاسبه استایل‌های فول ریسپانسیو
  const headerHeight = deviceInfo.isMobile ? "h-12" : deviceInfo.isTablet ? "h-14" : deviceInfo.isSmallLaptop ? "h-16" : "h-18";
  const headerPadding = deviceInfo.isMobile ? "px-2 py-1" : deviceInfo.isTablet ? "px-3 py-1.5" : deviceInfo.isSmallLaptop ? "px-4 py-2" : "px-6 py-2";
  const buttonSize = deviceInfo.isMobile ? "p-1.5" : deviceInfo.isTablet ? "p-2" : "p-2.5";
  const iconSize = deviceInfo.isMobile ? "h-4 w-4" : deviceInfo.isTablet ? "h-5 w-5" : "h-6 w-6";
  const logoGap = deviceInfo.isMobile ? "gap-1.5" : deviceInfo.isTablet ? "gap-2" : "gap-3";
  const titleSize = deviceInfo.isMobile ? "text-sm" : deviceInfo.isTablet ? "text-base" : deviceInfo.isSmallLaptop ? "text-lg" : "text-xl";

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-sky-50/20 to-emerald-50/40 dark:from-slate-950 dark:via-emerald-950/20 dark:to-sky-950/30 flex flex-col overflow-hidden" dir="rtl">
      <ModernSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        items={studentSidebarItems}
        profile={studentProfile}
        stats={stats}
        onLogout={handleStudentLogout}
      />
      
      <header 
        className={cn(
          "sticky top-0 z-50 w-full border-b border-emerald-200/30 transition-all duration-200 flex-shrink-0",
          scrolled ? "bg-gradient-to-r from-emerald-50/95 to-sky-50/95 backdrop-blur-lg shadow-lg shadow-emerald-100/20" : "bg-gradient-to-r from-emerald-50/90 to-sky-50/90 backdrop-blur-sm",
          headerHeight,
          headerPadding
        )}
      >
        <div className="w-full h-full flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSidebarToggle}
              className={cn("rounded-md hover:bg-emerald-100/50 dark:hover:bg-emerald-800/20", buttonSize)}
              aria-label="Open menu"
            >
              <Menu className={cn(iconSize, "text-emerald-700 dark:text-emerald-300")} />
            </Button>
            <div className={cn("flex items-center", logoGap)}>
              <AppIcon size="sm" animated />
              <h1 className={cn(
                "font-semibold hidden xs:block bg-gradient-to-r from-emerald-700 to-sky-700 bg-clip-text text-transparent",
                titleSize
              )}>
                {gymName ? gymName : 'پنل دانش‌آموز'}
              </h1>
            </div>
          </div>
          
          {/* اعلان پیام‌ها */}
          {unreadMessages > 0 && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white px-3 py-1.5 rounded-full shadow-lg">
              <Bell className="w-4 h-4" />
              <span className={cn(
                "font-medium",
                deviceInfo.isMobile ? "text-xs" : "text-sm"
              )}>
                {convertToFarsiNumbers(unreadMessages)} پیام جدید
              </span>
            </div>
          )}
        </div>
      </header>
      
      <main className="flex-1 w-full overflow-y-auto overflow-x-hidden">
        {React.cloneElement(children as React.ReactElement, { 
          onSidebarToggle: handleSidebarToggle 
        })}
      </main>
      
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
});

StudentLayout.displayName = "StudentLayout";

// Debounce utility
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
