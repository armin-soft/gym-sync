
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize default trainer profile if it doesn't exist
    const savedProfile = localStorage.getItem('trainerProfile');
    if (!savedProfile) {
      localStorage.setItem('trainerProfile', JSON.stringify(defaultProfile));
    }
    
    // Check if the user is already logged in
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
          localStorage.removeItem("rememberMeExpiry");
        }
      }
      
      setIsLoading(false);
    };
    
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
      localStorage.removeItem("rememberMeExpiry");
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">در حال بارگذاری...</p>
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
