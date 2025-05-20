
import { useState, useEffect, lazy, memo, useMemo, Suspense, CSSProperties } from "react";
import { Sidebar } from "./Sidebar";
import { Menu } from "lucide-react";
import { AppIcon } from "./ui/app-icon";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

// برای جلوگیری از بارگذاری مجدد صفحه هنگام تغییر مسیرها
interface LayoutProps {
  children: React.ReactNode;
}

const PageLoading = () => (
  <div className="flex flex-col items-center justify-center h-full w-full py-10">
    <Spinner className="h-10 w-10 mb-4" />
    <p className="text-muted-foreground">در حال بارگذاری...</p>
  </div>
);

// استفاده از memo برای جلوگیری از رندرهای غیرضروری
export const Layout = memo(({ children }: LayoutProps) => {
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

  // استفاده از useMemo برای کاهش محاسبات اضافی
  const {
    headerHeight,
    headerPadding,
    buttonSize,
    iconSize,
    logoGap,
    titleSize
  } = useMemo(() => {
    return {
      headerHeight: deviceInfo.isMobile ? "h-10" : deviceInfo.isTablet ? "h-12" : "h-14",
      headerPadding: deviceInfo.isMobile ? "px-1 xs:px-2" : deviceInfo.isTablet ? "px-2 sm:px-3" : "px-3 md:px-4 lg:px-6",
      buttonSize: deviceInfo.isMobile ? "p-1" : deviceInfo.isTablet ? "p-1.5" : "p-2",
      iconSize: deviceInfo.isMobile ? "h-3.5 w-3.5" : deviceInfo.isTablet ? "h-4 w-4" : "h-5 w-5",
      logoGap: deviceInfo.isMobile ? "gap-1" : "gap-1.5",
      titleSize: deviceInfo.isMobile ? "text-xs" : deviceInfo.isTablet ? "text-sm" : "text-base"
    };
  }, [deviceInfo.isMobile, deviceInfo.isTablet]);

  // جداسازی کد اسکرول برای کاهش رندرهای اضافی
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // بهینه‌سازی استایل‌ها با useMemo
  const contentStyle: CSSProperties = useMemo(() => {
    return deviceInfo.isMobile ? { 
      fontSize: '90%', 
      overflowX: 'hidden',
      height: 'calc(100% - 40px)'
    } : {
      height: deviceInfo.isTablet ? 'calc(100% - 48px)' : 'calc(100% - 56px)'
    };
  }, [deviceInfo.isMobile, deviceInfo.isTablet]);

  return (
    <div className="h-screen w-full overflow-hidden bg-background persian-numbers flex flex-col" dir="rtl">
      {/* اینجا Sidebar را فقط در صورت نیاز نمایش می‌دهیم */}
      {sidebarOpen && <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
      
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
                onClick={() => setSidebarOpen(true)}
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
      
      <main className="flex-1 overflow-hidden w-full max-w-full" style={contentStyle}>
        <Suspense fallback={<PageLoading />}>
          {children}
        </Suspense>
      </main>
    </div>
  );
});

Layout.displayName = "Layout";

export default Layout;
