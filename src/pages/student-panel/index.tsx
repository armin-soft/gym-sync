
import React from "react";
import { StudentLogin } from "@/components/student-panel/StudentLogin";

const StudentPanel = () => {
  const handleLoginSuccess = (phone: string) => {
    console.log('StudentPanel: Login successful for phone:', phone);
    // در حال حاضر فقط لاگ می‌کنیم - عملکرد بیشتری در آینده اضافه خواهد شد
  };

  return <StudentLogin onLoginSuccess={handleLoginSuccess} />;
};

export default StudentPanel;
