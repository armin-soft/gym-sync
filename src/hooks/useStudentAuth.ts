
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface StudentAuthData {
  studentId: number;
  name: string;
  phone: string;
  isAuthenticated: boolean;
}

export const useStudentAuth = () => {
  const [authData, setAuthData] = useState<StudentAuthData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if student is already logged in
    const savedAuth = localStorage.getItem('studentAuth');
    if (savedAuth) {
      try {
        const parsedAuth = JSON.parse(savedAuth);
        setAuthData(parsedAuth);
      } catch (error) {
        console.error('Error parsing student auth:', error);
        localStorage.removeItem('studentAuth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (phone: string): boolean => {
    try {
      const studentsData = localStorage.getItem('students');
      if (!studentsData) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: "هیچ شاگردی در سیستم ثبت نشده است"
        });
        return false;
      }

      const students = JSON.parse(studentsData);
      const student = students.find((s: any) => s.phone === phone);

      if (!student) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: "شماره تلفن صحیح نیست"
        });
        return false;
      }

      const studentAuthData: StudentAuthData = {
        studentId: student.id,
        name: student.name,
        phone: student.phone,
        isAuthenticated: true
      };

      setAuthData(studentAuthData);
      localStorage.setItem('studentAuth', JSON.stringify(studentAuthData));

      toast({
        title: "ورود موفق",
        description: `خوش آمدید ${student.name}`
      });

      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "مشکلی در ورود پیش آمده است"
      });
      return false;
    }
  };

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem('studentAuth');
    localStorage.removeItem('hasSelectedUserType');
    toast({
      title: "خروج موفق",
      description: "با موفقیت خارج شدید"
    });
  };

  return {
    authData,
    isLoading,
    isAuthenticated: !!authData?.isAuthenticated,
    login,
    logout
  };
};
