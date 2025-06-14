
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

  useEffect(() => {
    console.log('Current location:', location.pathname);
    
    // بررسی وضعیت احراز هویت و نوع کاربر
    const hasSelectedType = localStorage.getItem("hasSelectedUserType");
    const selectedUserType = localStorage.getItem("selectedUserType");
    const isStudentLoggedIn = localStorage.getItem("studentLoggedIn") === "true";
    const isManagementLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    console.log('hasSelectedType:', hasSelectedType);
    console.log('selectedUserType:', selectedUserType);
    console.log('isStudentLoggedIn:', isStudentLoggedIn);
    console.log('isManagementLoggedIn:', isManagementLoggedIn);
    
    // اگر کاربر در مسیر پنل شاگرد است
    if (location.pathname.startsWith('/Students')) {
      localStorage.setItem("hasSelectedUserType", "true");
      localStorage.setItem("selectedUserType", "student");
      setShowUserTypeSelection(false);
    }
    // اگر کاربر در مسیر پنل مدیریت است یا صفحه اصلی
    else if (location.pathname.startsWith('/Management') || location.pathname === '/') {
      localStorage.setItem("hasSelectedUserType", "true");
      localStorage.setItem("selectedUserType", "management");
      setShowUserTypeSelection(false);
    }
    // برای سایر مسیرها
    else {
      if (!hasSelectedType || !selectedUserType) {
        setShowUserTypeSelection(true);
      } else {
        setShowUserTypeSelection(false);
      }
    }
    
    setIsLoading(false);
  }, [location.pathname]);

  // نمایش loading در حین بررسی
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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

  // اگر پنل شاگرد انتخاب شده، بدون Layout و AuthWrapper نمایش دهید
  if (selectedUserType === "student" || location.pathname.startsWith('/Students')) {
    return <AppRoutes />;
  }

  // اگر پنل مدیریت انتخاب شده، از AuthWrapper و Layout استفاده کنید
  if (selectedUserType === "management" || location.pathname.startsWith('/Management') || location.pathname === '/') {
    return (
      <AuthWrapper>
        <Layout>
          <AppRoutes />
        </Layout>
      </AuthWrapper>
    );
  }

  // fallback - نمایش انتخاب نوع کاربر
  return <UserTypeSelectionNew />;
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
