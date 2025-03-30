
import { useState, useEffect, Suspense } from "react";
import { Sidebar } from "./Sidebar";
import { Menu } from "lucide-react";
import { LoadingScreen } from "./LoadingScreen";
import { Outlet } from "react-router-dom";
import { AppIcon } from "./ui/app-icon";
import { Toaster } from "@/components/ui/toaster";

const LoadingFallback = () => <LoadingScreen />;

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [gymName, setGymName] = useState("");
  
  const loadGymName = () => {
    const savedProfile = localStorage.getItem('trainerProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        if (profile.gymName) {
          setGymName(profile.gymName);
        }
      } catch (error) {
        console.error('Error loading gym name from localStorage:', error);
      }
    }
  };
  
  useEffect(() => {
    loadGymName();
    
    const handleStorageChange = () => {
      loadGymName();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="min-h-screen h-screen w-screen overflow-hidden bg-background persian-numbers" dir="rtl">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <Toaster />
      
      <div className="flex flex-col h-full w-full">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="w-full flex h-14 items-center px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="mr-2 rounded-md p-2 hover:bg-accent"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <AppIcon size="sm" animated />
              <h1 className="text-lg font-semibold">
                {gymName ? `مدیریت برنامه ${gymName}` : 'مدیریت برنامه'}
              </h1>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto">
          <div className="w-full h-full py-6 px-4 md:px-6 lg:px-8">
            <Suspense fallback={<LoadingFallback />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
