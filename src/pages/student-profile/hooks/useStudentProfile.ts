
import { useState, useEffect } from "react";
import { StudentProfile } from "../types/studentProfile";
import { useToast } from "@/hooks/use-toast";

export const useStudentProfile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<StudentProfile>({
    id: "",
    name: "",
    phone: "",
    age: "",
    gender: "male",
    height: "",
    weight: "",
    image: "/Assets/Images/Place-Holder.svg",
    paymentStatus: "pending"
  });

  const [activeSection, setActiveSection] = useState("personal");

  // بارگذاری داده‌ها از localStorage فقط برای شاگرد لاگین شده
  useEffect(() => {
    const loadStudentData = () => {
      try {
        const loggedInStudentId = localStorage.getItem("loggedInStudentId");
        const students = JSON.parse(localStorage.getItem("students") || "[]");
        
        console.log('Loading student profile - ID:', loggedInStudentId);
        console.log('Available students:', students);
        
        if (loggedInStudentId && students.length > 0) {
          const student = students.find((s: any) => s.id === parseInt(loggedInStudentId));
          
          if (student) {
            console.log('Found student data:', student);
            console.log('Student gender:', student.gender);
            
            setProfile({
              id: student.id?.toString() || "",
              name: student.name || "",
              phone: student.phone || "",
              age: student.age?.toString() || "",
              gender: student.gender || "male", // Load gender from database
              height: student.height?.toString() || "",
              weight: student.weight?.toString() || "",
              image: student.image || student.profileImage || "/Assets/Images/Place-Holder.svg",
              paymentStatus: student.paymentStatus || "pending"
            });
            
            console.log('Student profile loaded with gender:', student.gender);
          } else {
            console.log('No student found with the logged-in ID');
          }
        } else {
          console.log('No logged-in student ID or no students data found');
        }
      } catch (error) {
        console.error('خطا در بارگذاری پروفایل شاگرد:', error);
        toast({
          variant: "destructive",
          title: "خطا",
          description: "خطا در بارگذاری اطلاعات پروفایل"
        });
      }
    };

    loadStudentData();

    // گوش دادن به تغییرات localStorage
    const handleStorageChange = () => {
      loadStudentData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('studentsUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('studentsUpdated', handleStorageChange);
    };
  }, [toast]);

  // فقط تابع بروزرسانی تصویر پروفایل
  const handleImageUpdate = (image: string) => {
    setProfile(prev => ({ ...prev, image }));
    
    // ذخیره تصویر جدید در localStorage
    const loggedInStudentId = localStorage.getItem("loggedInStudentId");
    if (loggedInStudentId) {
      const students = JSON.parse(localStorage.getItem("students") || "[]");
      const studentIndex = students.findIndex((s: any) => s.id === parseInt(loggedInStudentId));
      
      if (studentIndex >= 0) {
        students[studentIndex] = {
          ...students[studentIndex],
          image: image,
          profileImage: image
        };
        
        localStorage.setItem('students', JSON.stringify(students));
        
        // اطلاع‌رسانی به سایر کامپوننت‌ها
        window.dispatchEvent(new CustomEvent('studentsUpdated'));
        window.dispatchEvent(new Event('storage'));
      }
    }
    
    toast({
      title: "موفق",
      description: "تصویر پروفایل با موفقیت بروزرسانی شد"
    });
  };

  return {
    profile,
    activeSection,
    setActiveSection,
    handleImageUpdate
  };
};
