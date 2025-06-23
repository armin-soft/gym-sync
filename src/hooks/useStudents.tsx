
import { useState, useEffect } from 'react';
import { Student } from '@/components/students/StudentTypes';
import { useToast } from '@/hooks/use-toast';

export const useStudents = () => {
  console.log('useStudents.tsx: Hook called');
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadStudents = () => {
      console.log('useStudents.tsx: Loading students from localStorage...');
      try {
        const savedStudents = localStorage.getItem('students');
        console.log('useStudents.tsx: Raw data from localStorage:', savedStudents ? 'Data exists' : 'No data found');
        
        if (savedStudents) {
          const parsedStudents = JSON.parse(savedStudents);
          console.log('useStudents.tsx: Parsed students:', parsedStudents);
          console.log('useStudents.tsx: Is array?', Array.isArray(parsedStudents));
          console.log('useStudents.tsx: Length:', Array.isArray(parsedStudents) ? parsedStudents.length : 'Not an array');
          
          setStudents(Array.isArray(parsedStudents) ? parsedStudents : []);
        } else {
          console.log('useStudents.tsx: No students found in localStorage');
          setStudents([]);
        }
      } catch (error) {
        console.error('useStudents.tsx: Error loading students:', error);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  const handleSave = (studentData: Student, existingStudent?: Student | null) => {
    try {
      let updatedStudents: Student[];
      
      if (existingStudent) {
        // Update existing student
        updatedStudents = students.map(student => 
          student.id === existingStudent.id ? studentData : student
        );
        toast({
          title: "ویرایش موفق",
          description: `اطلاعات ${studentData.name} با موفقیت به‌روزرسانی شد`,
        });
      } else {
        // Add new student
        updatedStudents = [...students, studentData];
        toast({
          title: "ثبت موفق",
          description: `${studentData.name} با موفقیت اضافه شد`,
        });
      }
      
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      setStudents(updatedStudents);
      return true;
    } catch (error) {
      console.error('Error saving student:', error);
      toast({
        title: "خطا",
        description: "مشکلی در ذخیره اطلاعات پیش آمد",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleDelete = (studentId: number) => {
    try {
      const updatedStudents = students.filter(student => student.id !== studentId);
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      setStudents(updatedStudents);
      return true;
    } catch (error) {
      console.error('Error deleting student:', error);
      toast({
        title: "خطا",
        description: "مشکلی در حذف شاگرد پیش آمد",
        variant: "destructive",
      });
      return false;
    }
  };

  console.log('useStudents.tsx: Returning students count:', students.length);
  return { students, loading, handleSave, handleDelete };
};
