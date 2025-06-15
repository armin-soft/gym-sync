
import React, { useState, useEffect, useMemo } from "react";
import { ModernSidebar } from "@/components/modern-sidebar/ModernSidebar";
import { studentSidebarItems } from "./data/studentSidebarItems";
import { useStudentProfileData } from "./hooks/useStudentProfileData";
import { useStudentStatsData } from "./hooks/useStudentStatsData";
import { handleStudentLogout } from "./utils/studentAuthUtils";

interface StudentLayoutProps {
  children: React.ReactNode;
}

export const StudentLayout: React.FC<StudentLayoutProps> = React.memo(({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { studentProfile, loadProfile } = useStudentProfileData();
  const { stats, loadStats } = useStudentStatsData();

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

  const handleSidebarToggle = useMemo(() => () => {
    setSidebarOpen(!sidebarOpen);
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-sky-50/20 to-emerald-50/40 dark:from-slate-950 dark:via-emerald-950/20 dark:to-sky-950/30" dir="rtl">
      <ModernSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        items={studentSidebarItems}
        profile={studentProfile}
        stats={stats}
        onLogout={handleStudentLogout}
      />
      
      <main className="w-full min-h-screen">
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
