
import { useState, useEffect, lazy, memo, useMemo, CSSProperties } from "react";
import { Sidebar } from "./Sidebar";
import { Menu } from "lucide-react";
import { AppIcon } from "./ui/app-icon";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { performanceMonitor } from "@/utils/performance-monitor";

// Define the props interface explicitly to include children
interface LayoutProps {
  children: React.ReactNode;
}

// Using memo to prevent unnecessary re-renders
export const Layout = memo(({ children }: LayoutProps) => {
  // شروع اندازه‌گیری عملکرد
  const perfId = performanceMonitor.start('Layout');
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [gymName, setGymName] = useState("");
  const [trainerProfile, setTrainerProfile] = useState({
    name: "مربی",
    image: "",
  });
  const [scrolled, setScrolled] = useState(false);
  const deviceInfo = useDeviceInfo();
  
  const loadProfile = () => {
    try {
      const savedProfile = localStorage.getItem('trainerProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setTrainerProfile({
          name: profile.name || "مربی",
          image: profile.image || "",
        });
        if (profile.gymName) {
          setGymName(profile.gymName);
        }
      }
    } catch (error) {
      console.error('Error loading profile from localStorage:', error);
    }
  };
  
  // چک می‌کنیم که آیا قبلا پروفایل لود شده یا نه
  // لود کردن با تاخیر برای جلوگیری از کند شدن رندر اولیه
  useEffect(() => {
    const timer = setTimeout(() => {
      loadProfile();
    }, 100);
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'trainerProfile') {
        loadProfile();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // بهینه‌سازی scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if ((offset > 10 && !scrolled) || (offset <= 10 && scrolled)) {
        setScrolled(offset > 10);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // محاسبه مقادیر طراحی واکنش‌گرا با useMemo
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

  // استایل محتوا برای جلوگیری از پرش‌های طرح‌بندی
  const contentStyle: CSSProperties = useMemo(() => {
    return deviceInfo.isMobile ? { 
      fontSize: '90%', 
      overflowX: 'hidden' as const,
      height: 'calc(100% - 40px)' // 40px ارتفاع هدر برای موبایل
    } : {
      height: deviceInfo.isTablet ? 'calc(100% - 48px)' : 'calc(100% - 56px)'
    };
  }, [deviceInfo.isMobile, deviceInfo.isTablet]);

  // پایان اندازه‌گیری عملکرد
  useEffect(() => {
    performanceMonitor.end('Layout', perfId);
  }, [perfId]);

  return (
    <div className="h-screen w-full overflow-hidden bg-background persian-numbers flex flex-col" dir="rtl">
      {sidebarOpen && <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
      
      <header 
        className={`sticky top-0 z-50 w-full border-b transition-all duration-200 flex-shrink-0 ${
          scrolled 
            ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm" 
            : "bg-background"
        }`}
      >
        <div className={cn("w-full", headerPadding)}>
          <div className={cn("w-full flex items-center justify-between", headerHeight)}>
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className={cn("mr-1 rounded-md hover:bg-accent", buttonSize)}
                aria-label="Open menu"
              >
                <Menu className={iconSize} />
              </button>
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
        {children}
      </main>
    </div>
  );
});

Layout.displayName = "Layout";

export default Layout;
