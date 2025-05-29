
import { useState, useEffect, useCallback } from "react";
import { StudentSidebar } from "./StudentSidebar";
import { Menu } from "lucide-react";
import { AppIcon } from "../ui/app-icon";
import { Button } from "@/components/ui/button";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Student } from "@/components/students/StudentTypes";

interface StudentLayoutProps {
  children: React.ReactNode;
  student: Student;
  onLogout: () => void;
}

export const StudentLayout = ({ children, student, onLogout }: StudentLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const deviceInfo = useDeviceInfo();
  
  // استفاده از useCallback برای ذخیره وضعیت اسکرول برای کارایی بهتر
  const scrollHandler = useCallback(() => {
    const offset = window.scrollY;
    setScrolled(offset > 10);
  }, []);
  
  // جداسازی کد اسکرول برای کاهش رندرهای اضافی
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [scrollHandler]);
  
  // محاسبه استایل ها یکبار
  const headerHeight = deviceInfo.isMobile ? "h-10" : deviceInfo.isTablet ? "h-12" : "h-14";
  const headerPadding = deviceInfo.isMobile ? "px-1 xs:px-2" : deviceInfo.isTablet ? "px-2 sm:px-3" : "px-3 md:px-4 lg:px-6";
  const buttonSize = deviceInfo.isMobile ? "p-1" : deviceInfo.isTablet ? "p-1.5" : "p-2";
  const iconSize = deviceInfo.isMobile ? "h-3.5 w-3.5" : deviceInfo.isTablet ? "h-4 w-4" : "h-5 w-5";
  const logoGap = deviceInfo.isMobile ? "gap-1" : "gap-1.5";
  const titleSize = deviceInfo.isMobile ? "text-xs" : deviceInfo.isTablet ? "text-sm" : "text-base";

  const handleSidebarClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const handleSidebarOpen = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-violet-950 dark:via-gray-900 dark:to-indigo-950 persian-numbers flex flex-col" dir="rtl">
      {sidebarOpen && <StudentSidebar isOpen={sidebarOpen} onClose={handleSidebarClose} student={student} onLogout={onLogout} />}
      
      <header 
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-200 flex-shrink-0",
          scrolled ? "bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm border-violet-200/50" : "bg-white/70 backdrop-blur-sm border-violet-100"
        )}
      >
        <div className={cn("w-full", headerPadding)}>
          <div className={cn("w-full flex items-center justify-between", headerHeight)}>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSidebarOpen}
                className={cn("mr-1 rounded-md hover:bg-violet-100 dark:hover:bg-violet-800", buttonSize)}
                aria-label="Open menu"
              >
                <Menu className={cn(iconSize, "text-violet-600 dark:text-violet-400")} />
              </Button>
              <div className={cn("flex items-center", logoGap)}>
                <AppIcon size="sm" animated />
                <h1 className={cn(
                  "font-semibold hidden xs:block text-violet-700 dark:text-violet-300",
                  titleSize
                )}>
                  پنل شخصی شاگرد
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-xs text-violet-600 dark:text-violet-400">خوش آمدید</p>
                <p className={cn("font-medium text-violet-800 dark:text-violet-200", deviceInfo.isMobile ? "text-xs" : "text-sm")}>{student.name}</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-hidden w-full max-w-full">
        {children}
      </main>
    </div>
  );
};

StudentLayout.displayName = "StudentLayout";

export default StudentLayout;
