
import { useState, useEffect } from "react";
import { LoadingScreen } from "./LoadingScreen";
import { AuthenticatedContent } from "./auth/AuthenticatedContent";
import { LoginContainer } from "./auth/login/LoginContainer";
import { defaultProfile } from "@/types/trainer";
import { successToast } from "./ui/notification-toast";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Initialize default trainer profile if it doesn't exist
    const savedProfile = localStorage.getItem('trainerProfile');
    if (!savedProfile) {
      localStorage.setItem('trainerProfile', JSON.stringify(defaultProfile));
    }
    
    // Check if the user is already logged in via session token or remember me
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const rememberMeExpiry = localStorage.getItem("rememberMeExpiry");
      
      if (isLoggedIn) {
        setAuthenticated(true);
        return;
      }
      
      // Check if remember me is still valid
      if (rememberMeExpiry) {
        const expiryDate = new Date(rememberMeExpiry);
        if (expiryDate > new Date()) {
          // Remember me token is still valid
          localStorage.setItem("isLoggedIn", "true");
          setAuthenticated(true);
          
          // Show welcome back notification
          const profile = JSON.parse(localStorage.getItem('trainerProfile') || '{}');
          setTimeout(() => {
            successToast(
              `${profile.name || 'کاربر'} عزیز، خوش آمدید`,
              "به سیستم مدیریت برنامه وارد شدید"
            );
          }, 1000);
        } else {
          // Remember me expired, clear it
          localStorage.removeItem("rememberMeExpiry");
        }
      }
    };
    
    // نمایش صفحه بارگذاری برای مدت مشخص
    const timer = setTimeout(() => {
      checkAuth();
      setLoading(false);
    }, 1500); // تاخیر قابل تنظیم برای نمایش بهتر صفحه بارگذاری
    
    return () => clearTimeout(timer);
  }, []);

  const handleLoginSuccess = (rememberMe: boolean = false) => {
    setAuthenticated(true);
    
    // If remember me is checked, set expiry for 30 days
    if (rememberMe) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);
      localStorage.setItem("rememberMeExpiry", expiryDate.toString());
    }

    // Show success notification
    const profile = JSON.parse(localStorage.getItem('trainerProfile') || '{}');
    successToast(
      "ورود موفقیت‌آمیز",
      `${profile.name || 'کاربر'} عزیز، خوش آمدید`
    );
  };

  // If still loading, show the loading screen
  if (loading) {
    return <LoadingScreen onLoadingComplete={() => {}} />;
  }

  // If not authenticated, show the login form
  if (!authenticated) {
    return <LoginContainer onLoginSuccess={handleLoginSuccess} />;
  }

  // If authenticated, show the main content
  return <AuthenticatedContent>{children}</AuthenticatedContent>;
};
