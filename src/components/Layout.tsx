
import { useState, useEffect, useCallback } from "react";
import { Sidebar } from "./Sidebar";
import { Menu, Bell } from "lucide-react";
import { AppIcon } from "./ui/app-icon";
import { Button } from "@/components/ui/button";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [gymName, setGymName] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [supportUnreadCount, setSupportUnreadCount] = useState(0);
  const deviceInfo = useDeviceInfo();
  const navigate = useNavigate();
  
  // بارگذاری اطلاعات
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('trainerProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setGymName(profile.gymName || "");
      }

      // بارگذاری پیام‌های پشتیبانی
      const savedMessages = localStorage.getItem('supportMessages');
      if (savedMessages) {
        const messages = JSON.parse(savedMessages);
        const unreadCount = messages.filter((msg: any) => !msg.isRead).length;
        setSupportUnreadCount(unreadCount);
      }
    } catch (error) {
      console.error('خطا در بارگذاری پروفایل:', error);
    }
  }, []);

  // گوش دادن به تغییرات پیام‌های پشتیبانی
  useEffect(() => {
    const handleSupportMessagesUpdate = (event: CustomEvent) => {
      setSupportUnreadCount(event.detail.unreadCount);
    };

    window.addEventListener('supportMessagesUpdated', handleSupportMessagesUpdate as EventListener);
    
    return () => {
      window.removeEventListener('supportMessagesUpdated', handleSupportMessagesUpdate as EventListener);
    };
  }, []);

  // مدیریت اسکرول
  const scrollHandler = useCallback(() => {
    const offset = window.scrollY;
    setScrolled(offset > 10);
  }, []);
  
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [scrollHandler]);
  
  // محاسبه استایل‌های فول ریسپانسیو
  const headerHeight = deviceInfo.isMobile ? "h-12" : deviceInfo.isTablet ? "h-14" : deviceInfo.isSmallLaptop ? "h-16" : "h-18";
  const headerPadding = deviceInfo.isMobile ? "px-2 py-1" : deviceInfo.isTablet ? "px-3 py-1.5" : deviceInfo.isSmallLaptop ? "px-4 py-2" : "px-6 py-2";
  const buttonSize = deviceInfo.isMobile ? "p-1.5" : deviceInfo.isTablet ? "p-2" : "p-2.5";
  const iconSize = deviceInfo.isMobile ? "h-4 w-4" : deviceInfo.isTablet ? "h-5 w-5" : "h-6 w-6";
  const logoGap = deviceInfo.isMobile ? "gap-1.5" : deviceInfo.isTablet ? "gap-2" : "gap-3";
  const titleSize = deviceInfo.isMobile ? "text-sm" : deviceInfo.isTablet ? "text-base" : deviceInfo.isSmallLaptop ? "text-lg" : "text-xl";

  const handleSidebarClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const handleSidebarOpen = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const handleNotificationClick = useCallback(() => {
    navigate('/Management/Support');
  }, [navigate]);

  return (
    <div className="full-screen bg-gradient-to-br from-emerald-50 via-sky-50/30 to-emerald-50/40 persian-numbers flex flex-col overflow-hidden" dir="rtl">
      {sidebarOpen && <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />}
      
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
              onClick={handleSidebarOpen}
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
                {gymName ? gymName : 'برنامه مدیریت'}
              </h1>
            </div>
          </div>

          {/* نوتیفیکیشن پشتیبانی */}
          {supportUnreadCount > 0 && (
            <div className="flex items-center gap-3">
              <Button
                onClick={handleNotificationClick}
                variant="ghost"
                size="sm"
                className={cn(
                  "relative rounded-lg hover:bg-emerald-100/50 dark:hover:bg-emerald-800/20",
                  buttonSize
                )}
                aria-label="پیام‌های جدید پشتیبانی"
              >
                <Bell className={cn(iconSize, "text-emerald-700 dark:text-emerald-300")} />
                <div className="absolute -top-1 -left-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {supportUnreadCount > 99 ? '99+' : supportUnreadCount}
                </div>
              </Button>
              
              <div className="hidden sm:block text-right">
                <p className="text-xs text-emerald-600 dark:text-emerald-400">
                  مربی عزیز
                </p>
                <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                  شما {supportUnreadCount.toLocaleString('fa-IR')} پیام جدید دارید
                </p>
              </div>
            </div>
          )}
        </div>
      </header>
      
      <main className="flex-1 w-full overflow-y-auto overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};

Layout.displayName = "Layout";

export default Layout;
