
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
  
  const scrollHandler = useCallback(() => {
    const offset = window.scrollY;
    setScrolled(offset > 10);
  }, []);
  
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [scrollHandler]);
  
  // محاسبه استایل‌های فول ریسپانسیو
  const headerHeight = deviceInfo.isMobile ? "h-14" : deviceInfo.isTablet ? "h-16" : deviceInfo.isSmallLaptop ? "h-18" : "h-20";
  const headerPadding = deviceInfo.isMobile ? "px-3 py-2" : deviceInfo.isTablet ? "px-4 py-2" : deviceInfo.isSmallLaptop ? "px-6 py-3" : "px-8 py-3";
  const buttonSize = deviceInfo.isMobile ? "p-2" : deviceInfo.isTablet ? "p-2.5" : "p-3";
  const iconSize = deviceInfo.isMobile ? "h-5 w-5" : deviceInfo.isTablet ? "h-6 w-6" : "h-7 w-7";
  const logoGap = deviceInfo.isMobile ? "gap-2" : deviceInfo.isTablet ? "gap-3" : "gap-4";
  const titleSize = deviceInfo.isMobile ? "text-sm" : deviceInfo.isTablet ? "text-base" : deviceInfo.isSmallLaptop ? "text-lg" : "text-xl";
  const avatarSize = deviceInfo.isMobile ? "w-8 h-8" : deviceInfo.isTablet ? "w-10 h-10" : "w-12 h-12";
  const welcomeTextSize = deviceInfo.isMobile ? "text-xs" : deviceInfo.isTablet ? "text-sm" : "text-base";
  const nameTextSize = deviceInfo.isMobile ? "text-sm" : deviceInfo.isTablet ? "text-base" : "text-lg";

  const handleSidebarClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const handleSidebarOpen = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  return (
    <div className="full-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-violet-950 dark:via-gray-900 dark:to-indigo-950 persian-numbers flex flex-col overflow-hidden" dir="rtl">
      {/* Student Sidebar */}
      {sidebarOpen && (
        <StudentSidebar 
          isOpen={sidebarOpen} 
          onClose={handleSidebarClose} 
          student={student} 
          onLogout={onLogout} 
        />
      )}
      
      {/* Student Header */}
      <header 
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-200 flex-shrink-0",
          scrolled 
            ? "bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm border-violet-200/50" 
            : "bg-white/70 backdrop-blur-sm border-violet-100",
          headerHeight,
          headerPadding
        )}
      >
        <div className="w-full h-full flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSidebarOpen}
              className={cn("rounded-lg hover:bg-violet-100 dark:hover:bg-violet-800", buttonSize)}
              aria-label="باز کردن منو"
            >
              <Menu className={cn(iconSize, "text-violet-600 dark:text-violet-400")} />
            </Button>
            <div className={cn("flex items-center", logoGap)}>
              <AppIcon size="sm" animated />
              <h1 className={cn(
                "font-bold text-violet-700 dark:text-violet-300",
                titleSize
              )}>
                پنل شخصی شاگرد
              </h1>
            </div>
          </div>
          
          <div className={cn("flex items-center", logoGap)}>
            <div className="text-right">
              <p className={cn("text-violet-600 dark:text-violet-400", welcomeTextSize)}>خوش آمدید</p>
              <p className={cn(
                "font-medium text-violet-800 dark:text-violet-200", 
                nameTextSize
              )}>
                {student.name}
              </p>
            </div>
            <div className={cn(avatarSize, "rounded-full overflow-hidden border-2 border-violet-200")}>
              <img 
                src={student.image || "/Assets/Image/Place-Holder.svg"} 
                alt={student.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 w-full overflow-y-auto overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};

StudentLayout.displayName = "StudentLayout";

export default StudentLayout;
