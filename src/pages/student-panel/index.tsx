
import React from "react";
import { useNavigate } from "react-router-dom";
import { StudentLogin } from "@/components/student-panel/StudentLogin";

const StudentPanel = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (phone: string) => {
    console.log('StudentPanel: Login successful for phone:', phone);
    console.log('StudentPanel: Navigating to /Student');
    
    // انتقال فوری به داشبورد شاگرد
    navigate("/Student");
  };

  return <StudentLogin onLoginSuccess={handleLoginSuccess} />;
};

export default StudentPanel;
