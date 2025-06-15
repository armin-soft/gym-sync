
import { useState, useEffect } from 'react';

interface StudentProfile {
  id: string;
  name: string;
  image?: string;
  profileImage?: string;
}

export const useStudentProfile = () => {
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);

  useEffect(() => {
    const getStudentProfile = () => {
      try {
        const loggedInStudentId = localStorage.getItem("loggedInStudentId");
        const students = JSON.parse(localStorage.getItem("students") || "[]");
        
        if (loggedInStudentId && students.length > 0) {
          const student = students.find((s: any) => s.id === loggedInStudentId);
          console.log('Student found:', student);
          console.log('Student image field:', student?.image);
          console.log('Student profileImage field:', student?.profileImage);
          setStudentProfile(student || null);
        }
      } catch (error) {
        console.error('خطا در بارگذاری پروفایل شاگرد:', error);
      }
    };

    getStudentProfile();
  }, []);

  const profileImageSrc = studentProfile?.image || studentProfile?.profileImage || "/Assets/Images/Place-Holder.svg";

  return { studentProfile, profileImageSrc };
};
