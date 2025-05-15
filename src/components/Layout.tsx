
import { useState, useEffect, Suspense, lazy, memo } from "react";
import { Sidebar } from "./Sidebar";
import { Menu, X, Bell, User } from "lucide-react";
import { LoadingScreen } from "./LoadingScreen";
import { AppIcon } from "./ui/app-icon";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const LoadingFallback = memo(() => <LoadingScreen />);

// Define the props interface explicitly to include children
interface LayoutProps {
  children: React.ReactNode;
}

// Using memo to prevent unnecessary re-renders
export const Layout = memo(({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [gymName, setGymName] = useState("");
  const [trainerProfile, setTrainerProfile] = useState({
    name: "مربی",
    image: "",
  });
  const [scrolled, setScrolled] = useState(false);
  const deviceInfo = useDeviceInfo();
  const { toast } = useToast();
  
  useEffect(() => {
    // Register toast function globally for service worker updates
    window.showToast = (options) => {
      if (options && options.title && options.description) {
        toast({
          title: options.title,
          description: options.description,
          action: options.action ? (
            <ToastAction altText={options.action.label} onClick={options.action.onClick}>
              {options.action.label}
            </ToastAction>
          ) : undefined,
        });
      }
    };
  }, [toast]);
  
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
  
  useEffect(() => {
    loadProfile();
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'trainerProfile') {
        loadProfile();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("rememberMeExpiry");
    window.location.reload();
  };

  // Responsive settings for the header
  const getHeaderHeight = () => {
    if (deviceInfo.isMobile) return "h-10";
    if (deviceInfo.isTablet) return "h-12";
    return "h-14";
  };
  
  const getHeaderPadding = () => {
    if (deviceInfo.isMobile) return "px-1 xs:px-2";
    if (deviceInfo.isTablet) return "px-2 sm:px-3";
    return "px-3 md:px-4 lg:px-6";
  };
  
  const getButtonSize = () => {
    if (deviceInfo.isMobile) return "p-1";
    if (deviceInfo.isTablet) return "p-1.5";
    return "p-2";
  };
  
  const getIconSize = () => {
    if (deviceInfo.isMobile) return "h-3.5 w-3.5";
    if (deviceInfo.isTablet) return "h-4 w-4";
    return "h-5 w-5";
  };
  
  const getLogoGap = () => {
    if (deviceInfo.isMobile) return "gap-1";
    return "gap-1.5";
  };
  
  const getTitleSize = () => {
    if (deviceInfo.isMobile) return "text-xs";
    if (deviceInfo.isTablet) return "text-sm";
    return "text-base";
  };

  // Calculate optimal scale for the content based on device
  const getContentStyle = () => {
    if (deviceInfo.isMobile) {
      return { 
        fontSize: '90%',
        padding: '0.25rem'
      };
    }
    return {};
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-background persian-numbers flex flex-col" dir="rtl">
      {sidebarOpen && <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
      
      <motion.header 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`sticky top-0 z-50 w-full border-b transition-all duration-200 flex-shrink-0 ${
          scrolled 
            ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm" 
            : "bg-background"
        }`}
      >
        <div className={cn("w-full", getHeaderPadding())}>
          <div className={cn("w-full flex items-center justify-between", getHeaderHeight())}>
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className={cn("mr-1 rounded-md hover:bg-accent", getButtonSize())}
                aria-label="Open menu"
              >
                <Menu className={getIconSize()} />
              </button>
              <div className={cn("flex items-center", getLogoGap())}>
                <AppIcon size="sm" animated />
                <h1 className={cn(
                  "font-semibold hidden xs:block",
                  getTitleSize()
                )}>
                  {gymName ? `مدیریت برنامه ${gymName}` : 'مدیریت برنامه'}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </motion.header>
      
      <main className="flex-1 overflow-hidden w-full max-w-full" style={getContentStyle()}>
        <Suspense fallback={<LoadingFallback />}>
          {children}
        </Suspense>
      </main>
    </div>
  );
});

export default Layout;
