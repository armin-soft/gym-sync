
import { useState, useEffect, useCallback } from "react";
import { Sidebar } from "./Sidebar";
import { Menu } from "lucide-react";
import { AppIcon } from "./ui/app-icon";
import { Button } from "@/components/ui/button";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [gymName, setGymName] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const deviceInfo = useDeviceInfo();
  
  // بارگذاری اطلاعات
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

  // مدیریت اسکرول
  const scrollHandler = useCallback(() => {
    const offset = window.scrollY;
    setScrolled(offset > 10);
  }, []);
  
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [scrollHandler]);

  const handleSidebarClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const handleSidebarOpen = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  return (
    <div className="full-screen bg-gradient-to-br from-emerald-50 via-sky-50/30 to-emerald-50/40 persian-numbers flex flex-col overflow-x-hidden" dir="rtl">
      {sidebarOpen && <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />}
      
      <header 
        className={cn(
          "responsive-header transition-all duration-200 flex-shrink-0",
          scrolled ? "bg-gradient-to-r from-emerald-50/95 to-sky-50/95 backdrop-blur-lg shadow-lg shadow-emerald-100/20" : "bg-gradient-to-r from-emerald-50/90 to-sky-50/90 backdrop-blur-sm",
          "border-b border-emerald-200/30"
        )}
      >
        <div className="w-full h-full flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSidebarOpen}
              className="responsive-button rounded-md hover:bg-emerald-100/50 dark:hover:bg-emerald-800/20"
              aria-label="Open menu"
            >
              <Menu className="responsive-icon text-emerald-700 dark:text-emerald-300" />
            </Button>
            <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
              <AppIcon size="sm" animated />
              <h1 className="text-heading-3 hidden xs:block bg-gradient-to-r from-emerald-700 to-sky-700 bg-clip-text text-transparent">
                {gymName ? gymName : 'برنامه مدیریت'}
              </h1>
            </div>
          </div>
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
