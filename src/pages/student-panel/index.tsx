
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentLogin } from "@/components/student-panel/StudentLogin";
import { StudentLayout } from "@/components/student-layout/StudentLayout";
import StudentDashboard from "@/pages/student-dashboard";

const StudentPanel = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // بررسی وضعیت ورود شاگرد
    const studentLoggedIn = localStorage.getItem("studentLoggedIn") === "true";
    const loggedInStudentId = localStorage.getItem("loggedInStudentId");
    
    console.log('StudentPanel: Checking login status');
    console.log('StudentPanel: isStudentLoggedIn:', studentLoggedIn);
    console.log('StudentPanel: loggedInStudentId:', loggedInStudentId);
    
    if (studentLoggedIn && loggedInStudentId) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    
    setIsLoading(false);
  }, []);

  const handleLoginSuccess = (phone: string) => {
    console.log('StudentPanel: Login successful for phone:', phone);
    setIsLoggedIn(true);
  };

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

  // اگر وارد نشده، صفحه ورود نمایش داده شود
  if (!isLoggedIn) {
    return <StudentLogin onLoginSuccess={handleLoginSuccess} />;
  }

  // اگر وارد شده، داشبورد با Layout نمایش داده شود
  return (
    <StudentLayout>
      <StudentDashboard />
    </StudentLayout>
  );
};

export default StudentPanel;
