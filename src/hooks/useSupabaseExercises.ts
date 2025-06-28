
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { Exercise, ExerciseCategory, ExerciseType } from '@/types/database';

export const useSupabaseExercises = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [categories, setCategories] = useState<ExerciseCategory[]>([]);
  const [exerciseTypes, setExerciseTypes] = useState<ExerciseType[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchExercises = async () => {
    try {
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setExercises(data || []);
    } catch (error: any) {
      console.error('Error fetching exercises:', error);
      toast({
        variant: "destructive",
        title: "خطا در بارگیری تمرینات",
        description: error.message
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('exercise_categories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      toast({
        variant: "destructive",
        title: "خطا در بارگیری دسته‌بندی‌ها",
        description: error.message
      });
    }
  };

  const fetchExerciseTypes = async () => {
    try {
      const { data, error } = await supabase
        .from('exercise_types')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setExerciseTypes(data || []);
    } catch (error: any) {
      console.error('Error fetching exercise types:', error);
      toast({
        variant: "destructive",
        title: "خطا در بارگیری انواع تمرین",
        description: error.message
      });
    }
  };

  const addExercise = async (exerciseData: Omit<Exercise, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('exercises')
        .insert([exerciseData])
        .select()
        .single();

      if (error) throw error;
      setExercises(prev => [data, ...prev]);
      toast({
        title: "موفقیت",
        description: "تمرین جدید اضافه شد"
      });
      return true;
    } catch (error: any) {
      console.error('Error adding exercise:', error);
      toast({
        variant: "destructive",
        title: "خطا در افزودن تمرین",
        description: error.message
      });
      return false;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchExercises(),
        fetchCategories(),
        fetchExerciseTypes()
      ]);
      setLoading(false);
    };
    
    loadData();
  }, []);

  return {
    exercises,
    categories,
    exerciseTypes,
    loading,
    addExercise,
    refetch: async () => {
      await Promise.all([
        fetchExercises(),
        fetchCategories(),
        fetchExerciseTypes()
      ]);
    }
  };
};
