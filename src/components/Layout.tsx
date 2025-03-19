
import { useState, useEffect, Suspense } from "react";
import { Sidebar } from "./Sidebar";
import { Menu, Weight } from "lucide-react";
import { Spinner } from "./ui/spinner";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const LoadingFallback = () => (
  <div className="flex h-[80vh] items-center justify-center">
    <div className="text-center space-y-4">
      <Spinner size="lg" className="mx-auto" />
      <p className="text-muted-foreground animate-pulse">در حال بارگذاری...</p>
    </div>
  </div>
);

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [gymName, setGymName] = useState("مدیریت برنامه");
  
  const loadGymName = () => {
    const savedProfile = localStorage.getItem('trainerProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        if (profile.gymName) {
          setGymName(`مدیریت برنامه ${profile.gymName}`);
        }
      } catch (error) {
        console.error('Error loading gym name from localStorage:', error);
      }
    }
  };
  
  useEffect(() => {
    // Load gym name from local storage
    loadGymName();
    
    // Listen for storage events to update gym name when it changes
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
      
      {/* Enhanced Toaster component for notifications */}
      <Toaster 
        position="top-center"
        toastOptions={{
          className: 'persian-numbers', 
          duration: 5000,
          style: {
            borderRadius: '0.75rem',
            padding: '1rem',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
            direction: 'rtl',
          },
        }}
        closeButton
        richColors
        expand={true}
        visibleToasts={3}
      />
      
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
              <Weight className={cn(
                "h-6 w-6",
                "text-primary animate-pulse"
              )} />
              <h1 className="text-lg font-semibold">{gymName}</h1>
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
