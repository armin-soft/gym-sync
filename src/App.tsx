
import React, { useLayoutEffect, useEffect, useState, useCallback } from "react";
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
  console.log('App component initializing...');

  useLayoutEffect(() => {
    console.log('App useLayoutEffect executed successfully');
  }, []);

  useEffect(() => {
    console.log('App component mounted successfully');
    console.log('React version check:', React.version || 'React available');
    console.log('Current URL:', window.location.href);
    
    // تست دسترسی به عناصر DOM
    const rootElement = document.getElementById('root');
    console.log('Root element exists:', !!rootElement);
    
    // اضافه کردن error handler برای خطاهای JavaScript
    const handleGlobalError = (e: ErrorEvent) => {
      console.error('Global error:', e.error);
      console.error('Error filename:', e.filename);
      console.error('Error line number:', e.lineno);
    };
    
    const handleUnhandledRejection = (e: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', e.reason);
    };
    
    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    console.log('App render successful');
    
    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
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
