
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
          const student = students.find((s: any) => s.id === parseInt(loggedInStudentId));
          console.log('Student found:', student);
          console.log('Student image field:', student?.image);
          console.log('Student profileImage field:', student?.profileImage);
          setStudentProfile(student || null);
        } else {
          // اگر شاگردی پیدا نشد، از studentData استفاده کن
          const studentData = localStorage.getItem('studentData');
          if (studentData) {
            const parsedData = JSON.parse(studentData);
            setStudentProfile({
              id: loggedInStudentId || '1',
              name: parsedData.name || 'شاگرد عزیز',
              image: parsedData.image || parsedData.profileImage
            });
          }
        }
      } catch (error) {
        console.error('خطا در بارگذاری پروفایل شاگرد:', error);
      }
    };

    getStudentProfile();

    // Listen for changes
    const handleStorageChange = () => {
      getStudentProfile();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('studentsUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('studentsUpdated', handleStorageChange);
    };
  }, []);

  const profileImageSrc = studentProfile?.image || studentProfile?.profileImage || "/Assets/Images/Place-Holder.svg";

  return { studentProfile, profileImageSrc };
};
