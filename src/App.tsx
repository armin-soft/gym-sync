
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/Layout";
import { AuthWrapper } from "@/components/AuthWrapper";
import AppRoutes from "./AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/hooks/use-theme";
import { TooltipProvider } from "@/components/ui/tooltip";
import { initializeServiceWorker } from "@/utils/RegisterServiceWorker";
import "./App.css";

// بهینه‌سازی React Query با استفاده از گزینه‌های بهتر برای سرعت بیشتر
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000, // 10 minutes - افزایش زمان برای کاهش درخواست‌ها
      retry: 0, // عدم تلاش مجدد برای سرعت بیشتر
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

function AppContent() {
  // راه‌اندازی سرویس ورکر در لود اولیه با مدیریت خطا
  useEffect(() => {
    // استفاده از setTimeout برای اطمینان از اینکه سرویس ورکر بعد از رندر اولیه راه‌اندازی می‌شود
    const timer = setTimeout(() => {
      initializeServiceWorker().catch(error => {
        console.error("خطا در راه‌اندازی سرویس ورکر:", error);
        // ادامه اجرای برنامه بدون سرویس ورکر
      });
    }, 1000);

    return () => clearTimeout(timer);
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
  // استفاده ثابت از مسیر پایه
  const basePath = '/';
  
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
