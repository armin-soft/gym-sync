
import { useState, useCallback } from "react";
import { TrainerProfile } from "@/components/modern-sidebar/types";

export const useStudentProfileData = () => {
  const [studentProfile, setStudentProfile] = useState<TrainerProfile>({
    name: "دانش‌آموز",
    phone: "",
    image: "/Assets/Images/Place-Holder.svg",
    gymName: "",
    status: "active",
    membersSince: ""
  });

  const loadProfile = useCallback(() => {
    try {
      const loggedInStudentId = localStorage.getItem("loggedInStudentId");
      const students = JSON.parse(localStorage.getItem("students") || "[]");
      
      if (loggedInStudentId && students.length > 0) {
        const student = students.find((s: any) => s.id === loggedInStudentId);
        
        if (student) {
          console.log('Student profile loaded:', student);
          
          setStudentProfile({
            name: student.name || "دانش‌آموز",
            phone: student.phone || "",
            image: student.profileImage || "/Assets/Images/Place-Holder.svg",
            gymName: "باشگاه ورزشی",
            status: "active",
            membersSince: student.membershipDate || new Date().toISOString().split('T')[0]
          });
        }
      }
    } catch (error) {
      console.error('خطا در بارگذاری پروفایل شاگرد:', error);
    }
  }, []);

  return { studentProfile, loadProfile };
};
