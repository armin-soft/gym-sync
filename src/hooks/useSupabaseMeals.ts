
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { Meal } from '@/types/database';

export const useSupabaseMeals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMeals = async () => {
    try {
      const { data, error } = await supabase
        .from('meals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMeals(data || []);
    } catch (error: any) {
      console.error('Error fetching meals:', error);
      toast({
        variant: "destructive",
        title: "خطا در بارگیری وعده‌های غذایی",
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const addMeal = async (mealData: Omit<Meal, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('meals')
        .insert([mealData])
        .select()
        .single();

      if (error) throw error;
      setMeals(prev => [data, ...prev]);
      toast({
        title: "موفقیت",
        description: "وعده غذایی جدید اضافه شد"
      });
      return true;
    } catch (error: any) {
      console.error('Error adding meal:', error);
      toast({
        variant: "destructive",
        title: "خطا در افزودن وعده غذایی",
        description: error.message
      });
      return false;
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return {
    meals,
    loading,
    addMeal,
    refetch: fetchMeals
  };
};
