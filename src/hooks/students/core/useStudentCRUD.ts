
import { useState } from "react";
import { Student } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";

export const useStudentCRUD = (students: Student[], setStudents: (students: Student[]) => void) => {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (studentId: number) => {
    try {
      setIsDeleting(true);
      const updatedStudents = students.filter(student => student.id !== studentId);
      setStudents(updatedStudents);
      
      toast({
        title: "حذف موفق",
        description: "شاگرد با موفقیت حذف شد",
      });
      
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

  const handleSave = (studentData: any, existingStudent?: Student | null) => {
    try {
      console.log("Saving student data:", studentData);
      console.log("Existing student:", existingStudent);
      
      if (existingStudent) {
        // ویرایش شاگرد موجود - حفظ گذرواژه قبلی اگر جدید ارائه نشده
        const passwordToSave = studentData.password || existingStudent.password;
        
        const updatedStudents = students.map(student =>
          student.id === existingStudent.id
            ? { 
                ...student, 
                ...studentData,
                password: passwordToSave, // حفظ گذرواژه
                createdAt: student.createdAt // حفظ تاریخ ایجاد اصلی
              }
            : student
        );
        
        console.log("Updated student with preserved password:", updatedStudents.find(s => s.id === existingStudent.id));
        setStudents(updatedStudents);
        
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
        setStudents([...students, newStudent]);
        
        toast({
          title: "افزودن موفق",
          description: "شاگرد جدید با موفقیت اضافه شد",
        });
      }
      
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
  };

  return {
    handleDelete,
    handleSave,
    refreshData,
    isDeleting
  };
};
