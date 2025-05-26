
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/Layout";
import { AuthWrapper } from "@/components/AuthWrapper";
import AppRoutes from "./AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/hooks/use-theme";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./App.css";

// بهینه‌سازی React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      retry: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

function AppContent() {
  return (
    <AuthWrapper>
      <Layout>
        <AppRoutes />
      </Layout>
    </AuthWrapper>
  );
}

function App() {
  useEffect(() => {
    console.log('App component mounted successfully');
    console.log('Current URL:', window.location.href);
    console.log('Current pathname:', window.location.pathname);
    console.log('Current hostname:', window.location.hostname);
    console.log('Current origin:', window.location.origin);
    
    // تست دسترسی به عناصر DOM
    const rootElement = document.getElementById('root');
    console.log('Root element exists:', !!rootElement);
    
    // بررسی بارگذاری منابع
    const scripts = document.querySelectorAll('script[src]');
    console.log('Scripts loaded:', scripts.length);
    scripts.forEach((script, index) => {
      console.log(`Script ${index}:`, (script as HTMLScriptElement).src);
    });
    
    const links = document.querySelectorAll('link[href]');
    console.log('Links loaded:', links.length);
    
    // اضافه کردن error handler برای خطاهای JavaScript
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
      console.error('Error filename:', e.filename);
      console.error('Error line number:', e.lineno);
    });
    
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
    });
    
    // تست رندر کامپوننت
    console.log('App render successful');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <BrowserRouter>
            <AppContent />
            <Toaster />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
