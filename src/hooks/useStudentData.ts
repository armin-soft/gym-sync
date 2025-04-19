
import { useState, useEffect } from "react";
import { Student } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";

export const useStudentData = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('trainerProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setIsProfileComplete(Boolean(profile.name && profile.gymName && profile.phone));
      } catch (error) {
        console.error('Error checking profile completeness:', error);
      }
    }
    
    const savedStudents = localStorage.getItem('students');
    
    if (savedStudents) {
      try {
        const parsedStudents = JSON.parse(savedStudents);
        setStudents(parsedStudents);
      } catch (error) {
        console.error('Error loading students from localStorage:', error);
        setStudents([]);
      }
    } else {
      setStudents([]);
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('students', JSON.stringify(students));
    }
  }, [students, loading]);

  return {
    students,
    setStudents,
    loading,
    isProfileComplete
  };
};
