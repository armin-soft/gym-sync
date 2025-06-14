
import { useState, useEffect } from "react";
import { AuthenticatedContent } from "./AuthenticatedContent";
import { LoginContainer } from "./login/LoginContainer";
import { defaultProfile } from "@/types/trainer";
import { successToast } from "@/hooks/use-toast";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

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
        setIsChecking(false);
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
      
      setIsChecking(false);
    };
    
    // بررسی فوری وضعیت احراز هویت
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

  // Show loading while checking authentication
  if (isChecking) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بررسی احراز هویت...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show the login form
  if (!authenticated) {
    return <LoginContainer onLoginSuccess={handleLoginSuccess} />;
  }

  // If authenticated, show the main content
  return <AuthenticatedContent>{children}</AuthenticatedContent>;
};
