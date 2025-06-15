
import { useState, useCallback, useEffect } from "react";
import { StudentProfile } from "../types/studentSidebarTypes";

export const useStudentProfileData = () => {
  const [studentProfile, setStudentProfile] = useState<StudentProfile>({
    name: "کاربر عزیز",
    phone: "",
    image: "",
    level: "مبتدی",
    status: 'offline',
    membersSince: ""
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
          level: determineLevel(data),
          status: 'active', // Student is logged in so they're active
          membersSince: data.createdAt ? formatDate(data.createdAt) : ""
        }));
      } else {
        // Reset to empty profile if no data
        setStudentProfile({
          name: "کاربر عزیز",
          phone: "",
          image: "",
          level: "مبتدی",
          status: 'offline',
          membersSince: ""
        });
      }
    } catch (error) {
      console.error('خطا در بارگذاری پروفایل شاگرد:', error);
      // Reset to empty on error
      setStudentProfile({
        name: "کاربر عزیز",
        phone: "",
        image: "",
        level: "مبتدی",
        status: 'offline',
        membersSince: ""
      });
    }
  }, []);

  // Auto-load profile on mount
  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return { studentProfile, loadProfile };
};

// Helper function to determine student level based on their data
const determineLevel = (studentData: any): string => {
  const totalWorkouts = calculateTotalWorkouts(studentData);
  
  if (totalWorkouts === 0) return "مبتدی";
  if (totalWorkouts < 10) return "مبتدی";
  if (totalWorkouts < 20) return "متوسط";
  return "پیشرفته";
};

const calculateTotalWorkouts = (student: any): number => {
  let total = 0;
  for (let day = 1; day <= 7; day++) {
    const exercises = student[`exercisesDay${day}`];
    if (exercises && Array.isArray(exercises)) {
      total += exercises.length;
    }
  }
  return total;
};

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR');
  } catch {
    return "۱۴۰۳/۰۱/۰۱";
  }
};
