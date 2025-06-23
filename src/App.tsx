
import React, { useEffect, useState } from "react";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/Layout";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { UserTypeSelectionNew } from "@/components/auth/UserTypeSelection-New";
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
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  
  useEffect(() => {
    console.log('AppContent: Current path:', currentPath);
    
    // بررسی وضعیت نوع کاربر
    const hasSelectedType = localStorage.getItem("hasSelectedUserType");
    const selectedUserType = localStorage.getItem("selectedUserType");
    
    console.log('AppContent: User type selected:', hasSelectedType);
    console.log('AppContent: Selected user type:', selectedUserType);
    
    // اگر در مسیر مدیریت هستیم، حتماً باید نوع کاربر management باشد
    if (currentPath.startsWith('/Management')) {
      if (!hasSelectedType || selectedUserType !== "management") {
        console.log('AppContent: Management path detected, forcing user type selection');
        localStorage.removeItem("hasSelectedUserType");
        localStorage.removeItem("selectedUserType");
        setShowUserTypeSelection(true);
        setIsLoading(false);
        return;
      }
    }
    
    // اگر در مسیر شاگرد هستیم، حتماً باید نوع کاربر student باشد
    if (currentPath.startsWith('/Student')) {
      if (!hasSelectedType || selectedUserType !== "student") {
        console.log('AppContent: Student path detected, forcing user type selection');
        localStorage.removeItem("hasSelectedUserType");
        localStorage.removeItem("selectedUserType");
        setShowUserTypeSelection(true);
        setIsLoading(false);
        return;
      }
    }
    
    // اگر نوع کاربر انتخاب نشده، نمایش صفحه انتخاب
    if (!hasSelectedType || !selectedUserType) {
      console.log('AppContent: No user type selected, showing selection screen');
      setShowUserTypeSelection(true);
      setIsLoading(false);
      return;
    }
    
    console.log('AppContent: User type already selected:', selectedUserType);
    setShowUserTypeSelection(false);
    
    // هدایت به پنل مناسب بر اساس نوع کاربر
    if (currentPath === '/') {
      if (selectedUserType === "student") {
        console.log('AppContent: Redirecting to student panel');
        navigate('/Student', { replace: true });
      } else if (selectedUserType === "management") {
        console.log('AppContent: Redirecting to management panel');
        navigate('/Management', { replace: true });
      }
    }
    
    setIsLoading(false);
  }, [currentPath, navigate]);

  // نمایش loading در حین بررسی
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-sky-100">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  // نمایش صفحه انتخاب نوع کاربر
  if (showUserTypeSelection) {
    return <UserTypeSelectionNew />;
  }

  // بررسی نوع کاربر انتخاب شده
  const selectedUserType = localStorage.getItem("selectedUserType");
  
  console.log('AppContent: Rendering for user type:', selectedUserType);
  console.log('AppContent: Current path:', currentPath);

  // اگر در مسیر مدیریت هستیم، نمایش پنل مدیریت با احراز هویت
  if (currentPath.startsWith('/Management') || currentPath === '/') {
    console.log('AppContent: Rendering management panel with authentication');
    return (
      <AuthWrapper>
        <Layout>
          <AppRoutes />
        </Layout>
      </AuthWrapper>
    );
  }

  // اگر در مسیر شاگرد هستیم، نمایش پنل شاگرد
  if (currentPath.startsWith('/Student')) {
    console.log('AppContent: Rendering student panel');
    return <AppRoutes />;
  }

  // fallback - نمایش انتخاب نوع کاربر
  console.log('AppContent: Fallback to user type selection');
  return <UserTypeSelectionNew />;
}

function App() {
  console.log('App component initializing...');

  useEffect(() => {
    console.log('App component mounted successfully');
    
    const handleGlobalError = (e: ErrorEvent) => {
      console.error('Global error:', e.error);
    };
    
    const handleUnhandledRejection = (e: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', e.reason);
    };
    
    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
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
