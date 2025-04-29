
import { useState, useEffect, Suspense, lazy, memo } from "react";
import { Sidebar } from "./Sidebar";
import { Menu, X, Bell, User } from "lucide-react";
import { LoadingScreen } from "./LoadingScreen";
import { Outlet } from "react-router-dom";
import { AppIcon } from "./ui/app-icon";
import { Toaster } from "@/components/ui/toaster";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LoadingFallback = memo(() => <LoadingScreen />);

// Using memo to prevent unnecessary re-renders
export const Layout = memo(() => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [gymName, setGymName] = useState("");
  const [trainerProfile, setTrainerProfile] = useState({
    name: "مربی",
    image: "",
  });
  const [scrolled, setScrolled] = useState(false);
  
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

  return (
    <div className="h-screen w-full overflow-hidden bg-background persian-numbers flex flex-col" dir="rtl">
      {sidebarOpen && <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
      
      <Toaster />
      
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
        <div className="w-full px-2 xs:px-3 sm:px-4">
          <div className="w-full flex h-12 sm:h-14 items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="mr-1 sm:mr-2 rounded-md p-1.5 sm:p-2 hover:bg-accent"
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <AppIcon size="sm" animated />
                <h1 className="text-sm sm:text-lg font-semibold hidden xs:block">
                  {gymName ? `مدیریت برنامه ${gymName}` : 'مدیریت برنامه'}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </motion.header>
      
      <main className="flex-1 overflow-hidden w-full">
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
});

export default Layout;
