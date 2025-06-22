
import { useState, useEffect } from "react";
import { StudentAuthenticatedContent } from "./StudentAuthenticatedContent";
import { StudentLogin } from "@/components/student-panel/StudentLogin";

interface StudentAuthWrapperProps {
  children: React.ReactNode;
}

export const StudentAuthWrapper = ({ children }: StudentAuthWrapperProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // بررسی وضعیت ورود شاگرد
    const checkAuth = () => {
      const isStudentLoggedIn = localStorage.getItem("studentLoggedIn") === "true";
      const loggedInStudentId = localStorage.getItem("loggedInStudentId");
      const rememberMeExpiry = localStorage.getItem("studentRememberMeExpiry");
      
      console.log('StudentAuthWrapper: Checking authentication status');
      console.log('StudentAuthWrapper: isStudentLoggedIn:', isStudentLoggedIn);
      console.log('StudentAuthWrapper: loggedInStudentId:', loggedInStudentId);
      console.log('StudentAuthWrapper: rememberMeExpiry:', rememberMeExpiry);
      
      if (isStudentLoggedIn && loggedInStudentId) {
        setAuthenticated(true);
      } else if (rememberMeExpiry) {
        // Check if remember me is still valid
        const expiryDate = new Date(rememberMeExpiry);
        if (expiryDate > new Date()) {
          // Remember me token is still valid
          const rememberedPhone = localStorage.getItem("rememberedStudentPhone");
          if (rememberedPhone) {
            console.log('StudentAuthWrapper: Remember me is valid, auto-logging in');
            localStorage.setItem("studentLoggedIn", "true");
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
          }
        } else {
          // Remember me expired, clear it
          localStorage.removeItem("studentRememberMeExpiry");
          localStorage.removeItem("rememberedStudentPhone");
          setAuthenticated(false);
        }
      } else {
        setAuthenticated(false);
      }
      
      setIsChecking(false);
    };
    
    // بررسی فوری وضعیت احراز هویت
    checkAuth();

    // گوش دادن به رویداد خروج شاگرد
    const handleStudentLogout = () => {
      console.log('StudentAuthWrapper: Student logout event received');
      setAuthenticated(false);
    };

    window.addEventListener('studentLogout', handleStudentLogout);
    
    return () => {
      window.removeEventListener('studentLogout', handleStudentLogout);
    };
  }, []);

  const handleLoginSuccess = (phone: string) => {
    console.log('StudentAuthWrapper: Login successful for phone:', phone);
    setAuthenticated(true);
  };

  // نمایش loading در حین بررسی احراز هویت
  if (isChecking) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-sky-100">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بررسی احراز هویت شاگرد...</p>
        </div>
      </div>
    );
  }

  // اگر احراز هویت نشده، فرم ورود نمایش داده شود
  if (!authenticated) {
    return <StudentLogin onLoginSuccess={handleLoginSuccess} />;
  }

  // اگر احراز هویت شده، محتوای اصلی نمایش داده شود
  return <StudentAuthenticatedContent>{children}</StudentAuthenticatedContent>;
};
