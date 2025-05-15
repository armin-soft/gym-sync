
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/Layout";
import { AuthWrapper } from "@/components/AuthWrapper";
import AppRoutes from "./AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/hooks/use-theme";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getBasePath } from "./utils/basePath";
import "./App.css";

// Create a new query client instance with proper configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// اضافه کردن کلاس برای بهینه‌سازی نمایش در اندروید
function AppContent() {
  const [isAppReady, setIsAppReady] = useState(false);
  
  useEffect(() => {
    // اجازه دادن به سیستم برای پیش‌بارگیری منابع قبل از نمایش محتوا
    const readyTimer = setTimeout(() => {
      setIsAppReady(true);
      // حذف کلاس loading از body پس از آماده شدن اپ
      document.body.classList.remove('loading');
    }, 200);
    
    return () => clearTimeout(readyTimer);
  }, []);
  
  return (
    <AuthWrapper>
      <Layout>
        <div className={`app-content ${isAppReady ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>
          <AppRoutes />
        </div>
      </Layout>
    </AuthWrapper>
  );
}

function App() {
  // Always use root path as base - this is safer for all environments
  const basePath = '/';
  
  console.log("Using basename for router:", basePath);
  
  // افزودن کلاس loading به body هنگام بارگذاری
  useEffect(() => {
    document.body.classList.add('loading');
    return () => {
      document.body.classList.remove('loading');
    };
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <BrowserRouter basename={basePath}>
            <AppContent />
            <Toaster />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
