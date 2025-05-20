
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/Layout";
import { AuthWrapper } from "@/components/AuthWrapper";
import AppRoutes from "./AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/hooks/use-theme";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getBasePath } from "./utils/basePath";
import { performanceMonitor } from "./utils/performance-monitor";
import "./App.css";

// ایجاد یک نمونه جدید از کلاینت کوئری با تنظیمات مناسب
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 دقیقه
      retry: 1,
      refetchOnWindowFocus: false, // غیرفعال کردن بازیابی خودکار در فوکوس پنجره
      refetchOnMount: false, // غیرفعال کردن بازیابی خودکار در نصب کامپوننت
      refetchOnReconnect: true, // بازیابی در زمان اتصال مجدد
      cacheTime: 10 * 60 * 1000, // 10 دقیقه
    },
  },
});

function AppContent() {
  // شروع مانیتورینگ عملکرد
  useEffect(() => {
    // در محیط توسعه، مانیتورینگ را فعال می‌کنیم
    if (process.env.NODE_ENV === 'development') {
      performanceMonitor.enable(200);
    }
    
    // در محیط تولید، فقط رویدادهای بسیار کند را ثبت می‌کنیم
    if (process.env.NODE_ENV === 'production') {
      performanceMonitor.enable(500);
    }
    
    return () => {
      performanceMonitor.disable();
    };
  }, []);

  return (
    <AuthWrapper>
      <Layout>
        <AppRoutes />
      </Layout>
    </AuthWrapper>
  );
}

function App() {
  // همیشه از مسیر ریشه به عنوان مسیر پایه استفاده می‌کنیم - این برای همه محیط‌ها امن‌تر است
  const basePath = '/';
  
  console.log("Using basename for router:", basePath);
  
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
