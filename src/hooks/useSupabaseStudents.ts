
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { Student } from '@/types/database';

export const useSupabaseStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchStudents = async () => {
    try {
      console.log('Fetching students from Supabase...');
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching students:', error);
        toast({
          variant: "destructive",
          title: "خطا در بارگیری شاگردان",
          description: error.message
        });
        return;
      }

      console.log('Students fetched successfully:', data?.length || 0);
      setStudents(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطای غیرمنتظره در بارگیری داده‌ها"
      });
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async (studentData: Omit<Student, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .insert([studentData])
        .select()
        .single();

      if (error) {
        console.error('Error adding student:', error);
        toast({
          variant: "destructive",
          title: "خطا در افزودن شاگرد",
          description: error.message
        });
        return false;
      }

      setStudents(prev => [data, ...prev]);
      toast({
        title: "موفقیت",
        description: "شاگرد با موفقیت اضافه شد"
      });
      return true;
    } catch (error) {
      console.error('Unexpected error:', error);
      return false;
    }
  };

  const updateStudent = async (id: number, updates: Partial<Student>) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating student:', error);
        toast({
          variant: "destructive",
          title: "خطا در ویرایش شاگرد",
          description: error.message
        });
        return false;
      }

      setStudents(prev => prev.map(student => 
        student.id === id ? data : student
      ));
      toast({
        title: "موفقیت",
        description: "اطلاعات شاگرد ویرایش شد"
      });
      return true;
    } catch (error) {
      console.error('Unexpected error:', error);
      return false;
    }
  };

  const deleteStudent = async (id: number) => {
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting student:', error);
        toast({
          variant: "destructive",
          title: "خطا در حذف شاگرد",
          description: error.message
        });
        return false;
      }

      setStudents(prev => prev.filter(student => student.id !== id));
      toast({
        title: "موفقیت",
        description: "شاگرد حذف شد"
      });
      return true;
    } catch (error) {
      console.error('Unexpected error:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return {
    students,
    loading,
    addStudent,
    updateStudent,
    deleteStudent,
    refetch: fetchStudents
  };
};
