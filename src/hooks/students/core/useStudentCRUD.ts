
import { useState } from "react";
import { Student } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";

export const useStudentCRUD = (students: Student[], setStudents: (students: Student[]) => void) => {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (studentId: number) => {
    try {
      setIsDeleting(true);
      console.log("Deleting student with ID:", studentId);
      console.log("Current students:", students);
      
      const updatedStudents = students.filter(student => student.id !== studentId);
      console.log("Updated students after filter:", updatedStudents);
      
      // بروزرسانی localStorage
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      
      // بروزرسانی state محلی
      setStudents(updatedStudents);
      
      // اطلاع‌رسانی به سایر کامپوننت‌ها
      window.dispatchEvent(new CustomEvent('studentsUpdated'));
      window.dispatchEvent(new Event('storage'));
      
      toast({
        title: "حذف موفق",
        description: "شاگرد با موفقیت حذف شد",
      });
      
      console.log("Student deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting student:", error);
      toast({
        title: "خطا در حذف",
        description: "مشکلی در حذف شاگرد پیش آمد",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSave = (studentData: any, existingStudent?: Student) => {
    try {
      console.log("Saving student data:", studentData);
      console.log("Existing student:", existingStudent);
      
      let updatedStudents;
      
      if (existingStudent) {
        // ویرایش شاگرد موجود
        updatedStudents = students.map(student =>
          student.id === existingStudent.id
            ? { 
                ...student, 
                ...studentData,
                createdAt: student.createdAt // حفظ تاریخ ایجاد اصلی
              }
            : student
        );
        
        console.log("Updated student:", updatedStudents.find(s => s.id === existingStudent.id));
        
        toast({
          title: "ویرایش موفق",
          description: "اطلاعات شاگرد با موفقیت ویرایش شد",
        });
      } else {
        // افزودن شاگرد جدید
        const newId = Math.max(...students.map(s => s.id), 0) + 1;
        const newStudent: Student = {
          ...studentData,
          id: newId,
          createdAt: new Date().toISOString()
        };
        
        console.log("Creating new student:", newStudent);
        updatedStudents = [...students, newStudent];
        
        toast({
          title: "افزودن موفق",
          description: "شاگرد جدید با موفقیت اضافه شد",
        });
      }
      
      // بروزرسانی localStorage
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      
      // بروزرسانی state محلی
      setStudents(updatedStudents);
      
      // اطلاع‌رسانی به سایر کامپوننت‌ها
      window.dispatchEvent(new CustomEvent('studentsUpdated'));
      window.dispatchEvent(new Event('storage'));
      
      return true;
    } catch (error) {
      console.error("Error saving student:", error);
      toast({
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی اطلاعات شاگرد پیش آمد",
        variant: "destructive",
      });
      return false;
    }
  };

  const refreshData = () => {
    // اینجا می‌توان داده‌ها را از منبع اصلی بارگذاری کرد
    console.log("Refreshing student data...");
    try {
      const savedStudents = localStorage.getItem('students');
      if (savedStudents) {
        const parsedStudents = JSON.parse(savedStudents);
        if (Array.isArray(parsedStudents)) {
          setStudents(parsedStudents);
        }
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  return {
    handleDelete,
    handleSave,
    refreshData,
    isDeleting
  };
};
