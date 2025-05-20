
import { useState } from "react";
import { Student } from "@/components/students/StudentTypes";
import { useNavigate } from "react-router-dom";

/**
 * هوک برای مدیریت انتخاب برنامه دانشجویان
 */
export function useStudentProgram() {
  const [selectedStudentForProgram, setSelectedStudentForProgram] = useState<Student | null>(null);
  const navigate = useNavigate();

  // انتخاب دانشجو برای مدیریت برنامه
  const handleOpenProgramManager = (student: Student) => {
    setSelectedStudentForProgram(student);
  };
  
  // بستن مدیریت برنامه دانشجو
  const handleCloseProgramManager = () => {
    setSelectedStudentForProgram(null);
  };

  // هدایت مستقیم به صفحه برنامه دانشجو
  const navigateToStudentProgram = (studentId: number) => {
    navigate(`/student-program/${studentId}`);
  };
  
  return {
    selectedStudentForProgram,
    handleOpenProgramManager,
    handleCloseProgramManager,
    navigateToStudentProgram
  };
}
