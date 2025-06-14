
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
      console.log("Current students count:", students.length);
      
      // بررسی اینکه شاگرد با این ID وجود دارد یا نه
      const studentToDelete = students.find(student => student.id === studentId);
      if (!studentToDelete) {
        console.log("Student with ID", studentId, "not found in current students array");
        
        // بررسی localStorage برای اطمینان
        const savedStudents = localStorage.getItem('students');
        if (savedStudents) {
          const parsedStudents = JSON.parse(savedStudents);
          const studentInStorage = parsedStudents.find((student: Student) => student.id === studentId);
          
          if (!studentInStorage) {
            toast({
              title: "خطا",
              description: "شاگرد مورد نظر یافت نشد",
              variant: "destructive",
            });
            return false;
          }
          
          // اگر در localStorage وجود دارد ولی در state محلی نیست، ابتدا state را به‌روزرسانی کنیم
          setStudents(parsedStudents);
          
          // سپس حذف را انجام دهیم
          const updatedStudents = parsedStudents.filter((student: Student) => student.id !== studentId);
          localStorage.setItem('students', JSON.stringify(updatedStudents));
          setStudents(updatedStudents);
          
          // اطلاع‌رسانی به سایر کامپوننت‌ها
          window.dispatchEvent(new CustomEvent('studentsUpdated'));
          window.dispatchEvent(new Event('storage'));
          
          toast({
            title: "حذف موفق",
            description: `شاگرد با موفقیت حذف شد`,
          });
          
          return true;
        }
        
        return false;
      }

      console.log("Found student to delete:", studentToDelete);
      
      // فیلتر کردن شاگردان و حذف شاگرد مورد نظر
      const updatedStudents = students.filter(student => {
        console.log(`Comparing: student.id (${student.id}) !== studentId (${studentId})`);
        return student.id !== studentId;
      });
      
      console.log("Updated students after filter:", updatedStudents);
      console.log("Updated students count:", updatedStudents.length);
      
      // بروزرسانی localStorage
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      
      // بروزرسانی state محلی
      setStudents(updatedStudents);
      
      // اطلاع‌رسانی به سایر کامپوننت‌ها
      window.dispatchEvent(new CustomEvent('studentsUpdated'));
      window.dispatchEvent(new Event('storage'));
      
      toast({
        title: "حذف موفق",
        description: `شاگرد ${studentToDelete.name} با موفقیت حذف شد`,
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
      
      // بارگذاری شاگردان فعلی از localStorage
      const savedStudents = localStorage.getItem('students');
      const currentStudents = savedStudents ? JSON.parse(savedStudents) : students;
      
      let updatedStudents;
      
      if (existingStudent) {
        // ویرایش شاگرد موجود
        updatedStudents = currentStudents.map((student: Student) =>
          student.id === existingStudent.id
            ? { 
                ...student, 
                ...studentData,
                createdAt: student.createdAt // حفظ تاریخ ایجاد اصلی
              }
            : student
        );
        
        console.log("Updated student:", updatedStudents.find((s: Student) => s.id === existingStudent.id));
        
        toast({
          title: "ویرایش موفق",
          description: "اطلاعات شاگرد با موفقیت ویرایش شد",
        });
      } else {
        // افزودن شاگرد جدید
        const newId = Math.max(...currentStudents.map((s: Student) => s.id), 0) + 1;
        const newStudent: Student = {
          ...studentData,
          id: newId,
          createdAt: new Date().toISOString()
        };
        
        console.log("Creating new student:", newStudent);
        updatedStudents = [...currentStudents, newStudent];
        
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
          console.log("Data refreshed successfully");
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
