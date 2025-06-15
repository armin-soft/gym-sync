
import { useState, useCallback } from "react";
import { StudentProfile } from "../types/studentSidebarTypes";

export const useStudentProfileData = () => {
  const [studentProfile, setStudentProfile] = useState<StudentProfile>({
    name: "کاربر عزیز",
    phone: "",
    image: "",
    level: "مبتدی",
    status: 'active',
    membersSince: "۱۴۰۳/۰۱/۰۱"
  });

  const loadProfile = useCallback(() => {
    try {
      const savedData = localStorage.getItem('studentData');
      if (savedData) {
        const data = JSON.parse(savedData);
        setStudentProfile(prev => ({
          ...prev,
          name: data.name || "کاربر عزیز",
          phone: data.phone || "",
          image: data.image || "",
          level: data.level || "مبتدی",
          membersSince: data.membersSince || "۱۴۰۳/۰۱/۰۱"
        }));
      }
    } catch (error) {
      console.error('خطا در بارگذاری پروفایل شاگرد:', error);
    }
  }, []);

  return { studentProfile, loadProfile };
};
