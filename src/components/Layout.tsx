
import { useState, useEffect, useCallback } from "react";
import { Sidebar } from "./Sidebar";
import { Menu } from "lucide-react";
import { AppIcon } from "./ui/app-icon";
import { Button } from "@/components/ui/button";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

// برای جلوگیری از بارگذاری مجدد صفحه هنگام تغییر مسیرها
interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [gymName, setGymName] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const deviceInfo = useDeviceInfo();
  
  // بارگذاری اطلاعات با محدودیت دفعات اجرا
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
    <div className="h-screen w-full overflow-hidden bg-background persian-numbers flex flex-col" dir="rtl">
      {sidebarOpen && <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />}
      
      <header 
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-200 flex-shrink-0",
          scrolled ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm" : "bg-background"
        )}
      >
        <div className={cn("w-full", headerPadding)}>
          <div className={cn("w-full flex items-center justify-between", headerHeight)}>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSidebarOpen}
                className={cn("mr-1 rounded-md hover:bg-accent", buttonSize)}
                aria-label="Open menu"
              >
                <Menu className={iconSize} />
              </Button>
              <div className={cn("flex items-center", logoGap)}>
                <AppIcon size="sm" animated />
                <h1 className={cn(
                  "font-semibold hidden xs:block",
                  titleSize
                )}>
                  {gymName ? gymName : 'برنامه مدیریت'}
                </h1>
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

Layout.displayName = "Layout";

export default Layout;
