import { useState, useEffect } from "react";
import { AuthenticatedContent } from "./auth/AuthenticatedContent";
import { LoginContainer } from "./auth/login/LoginContainer";
import { defaultProfile } from "@/types/trainer";
import { successToast } from "./ui/notification-toast";
import { LoadingScreen } from "./LoadingScreen";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
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
          const rememberedEmail = localStorage.getItem("rememberedEmail");
          
          setTimeout(() => {
            successToast(
              `${profile.name || 'کاربر'} عزیز، خوش آمدید`,
              rememberedEmail ? `شما با ایمیل ${rememberedEmail} وارد شده‌اید` : "به سیستم مدیریت برنامه وارد شدید"
            );
          }, 500);
        } else {
          // Remember me expired, clear it
          localStorage.removeItem("rememberMeExpiry");
          // But keep the remembered email
        }
      }
      
      // محتوا بارگذاری شده و میتونیم loading screen رو مخفی کنیم
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // برای تجربه بهتر کاربر، کمی تأخیر اضافه می‌کنیم
    };
    
    // بررسی وضعیت احراز هویت
    checkAuth();
  }, []);

  const handleLoginSuccess = (rememberMe: boolean = false) => {
    setAuthenticated(true);
    
    // If remember me is checked, set expiry for 30 days
    if (rememberMe) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);
      localStorage.setItem("rememberMeExpiry", expiryDate.toString());
    } else {
      // If not checked, remove any previous remember me expiry
      localStorage.removeItem("rememberMeExpiry");
    }
  };

  // نمایش صفحه بارگذاری
  if (isLoading) {
    return <LoadingScreen />;
  }

  // If not authenticated, show the login form
  if (!authenticated) {
    return <LoginContainer onLoginSuccess={handleLoginSuccess} />;
  }

  // If authenticated, show the main content
  return <AuthenticatedContent>{children}</AuthenticatedContent>;
};
