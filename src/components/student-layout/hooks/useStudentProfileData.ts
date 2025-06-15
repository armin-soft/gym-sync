
import { useState, useCallback } from "react";
import { TrainerProfile } from "@/components/modern-sidebar/types";

export const useStudentProfileData = () => {
  const [studentProfile, setStudentProfile] = useState<TrainerProfile>({
    name: "دانش‌آموز",
    role: "شاگرد",
    avatar: "/Assets/Images/Place-Holder.svg",
    status: "active",
    gymName: "",
    membersSince: "",
    phone: "",
    email: ""
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
            role: "شاگرد",
            avatar: student.profileImage || "/Assets/Images/Place-Holder.svg",
            status: "active",
            gymName: "باشگاه ورزشی",
            membersSince: student.membershipDate || new Date().toISOString().split('T')[0],
            phone: student.phone || "",
            email: student.email || ""
          });
        }
      }
    } catch (error) {
      console.error('خطا در بارگذاری پروفایل شاگرد:', error);
    }
  }, []);

  return { studentProfile, loadProfile };
};
