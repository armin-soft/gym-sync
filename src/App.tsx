
import React, { useEffect, useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/Layout";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { UserTypeSelection } from "@/components/auth/UserTypeSelection";
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
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user has already selected a type and is not on Panel route
    const hasSelectedType = localStorage.getItem("hasSelectedUserType");
    const isOnStudentRoute = location.pathname.startsWith("/Students");
    const isOnManagementRoute = location.pathname.startsWith("/Management") || location.pathname === "/";
    
    // If not on student route and hasn't selected type, show selection
    if (!hasSelectedType && !isOnStudentRoute && !isOnManagementRoute) {
      setShowUserTypeSelection(true);
    } else {
      setShowUserTypeSelection(false);
    }
  }, [location.pathname]);

  // Show user type selection for routes when no type is selected
  if (showUserTypeSelection) {
    return <UserTypeSelection />;
  }

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

  useEffect(() => {
    console.log('App component mounted successfully');
    console.log('Current URL:', window.location.href);
    
    // اضافه کردن error handler برای خطاهای JavaScript
    const handleGlobalError = (e: ErrorEvent) => {
      console.error('Global error:', e.error);
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
