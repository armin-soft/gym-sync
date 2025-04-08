
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { 
  DropdownMenu, 
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
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
  
  // Use effect with empty dependency array to run only once on mount
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
    <div className="min-h-screen h-screen w-screen overflow-hidden bg-background persian-numbers" dir="rtl">
      {/* Only render sidebar when open for better performance */}
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
          <div className="container mx-auto px-4">
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
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full">
                  <Bell className="h-5 w-5" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2 rounded-full pr-2.5 pl-3.5 border border-muted hover:bg-accent">
                      <Avatar className="h-6 w-6 mr-1">
                        {trainerProfile.image ? (
                          <AvatarImage src={trainerProfile.image} alt={trainerProfile.name} />
                        ) : (
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {trainerProfile.name.slice(0, 2)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <span className="font-medium text-sm hidden md:inline-block">{trainerProfile.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex-shrink-0 rounded-full bg-primary/10 p-1">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium">{trainerProfile.name}</p>
                        <p className="text-xs text-muted-foreground">مربی</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/Coach-Profile" className="cursor-pointer">پروفایل مربی</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/About" className="cursor-pointer">درباره برنامه</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                      خروج از حساب کاربری
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </motion.header>
        
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto py-6 px-4">
            <Suspense fallback={<LoadingFallback />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
});
