
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
    <div className="min-h-screen h-screen w-full overflow-hidden bg-background persian-numbers" dir="rtl">
      {sidebarOpen && <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
      
      <Toaster />
      
      <div className="flex flex-col h-full w-full">
        <motion.header 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`sticky top-0 z-50 w-full border-b transition-all duration-200 ${
            scrolled 
              ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm" 
              : "bg-background"
          }`}
        >
          <div className="w-full px-4">
            <div className="w-full flex h-14 items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="mr-2 rounded-md p-2 hover:bg-accent"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-2">
                  <AppIcon size="sm" animated />
                  <h1 className="text-lg font-semibold hidden md:block">
                    {gymName ? `مدیریت برنامه ${gymName}` : 'مدیریت برنامه'}
                  </h1>
                </div>
              </div>
              
              {/* The user dropdown menu that was here has been removed */}
            </div>
          </div>
        </motion.header>
        
        <main className="flex-1 overflow-auto w-full">
          <div className="w-full h-full py-6 px-4">
            <Suspense fallback={<LoadingFallback />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
});
