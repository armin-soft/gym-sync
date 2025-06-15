
import React, { useEffect } from "react";
import { StudentLoginForm } from "./login/StudentLoginForm";

interface StudentLoginProps {
  onLoginSuccess: (phone: string) => void;
}

export const StudentLogin: React.FC<StudentLoginProps> = ({ onLoginSuccess }) => {
  // بررسی وضعیت ورود شاگرد در لود اولیه
  useEffect(() => {
    const isStudentLoggedIn = localStorage.getItem("studentLoggedIn") === "true";
    const loggedInStudentId = localStorage.getItem("loggedInStudentId");
    
    console.log('StudentLogin: Checking login status on mount');
    console.log('StudentLogin: isStudentLoggedIn:', isStudentLoggedIn);
    console.log('StudentLogin: loggedInStudentId:', loggedInStudentId);
    
    if (isStudentLoggedIn && loggedInStudentId) {
      console.log('StudentLogin: Student already logged in, calling success callback');
      onLoginSuccess(loggedInStudentId);
    }
  }, [onLoginSuccess]);

  const handleLoginSuccess = (phone: string) => {
    console.log('StudentLogin: Login successful for phone:', phone);
    onLoginSuccess(phone);
  };

  return <StudentLoginForm onLoginSuccess={handleLoginSuccess} />;
};
