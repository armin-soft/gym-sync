
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { Supplement, Vitamin } from '@/types/database';

export const useSupabaseSupplements = () => {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [vitamins, setVitamins] = useState<Vitamin[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSupplements = async () => {
    try {
      const { data, error } = await supabase
        .from('supplements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSupplements(data || []);
    } catch (error: any) {
      console.error('Error fetching supplements:', error);
      toast({
        variant: "destructive",
        title: "خطا در بارگیری مکمل‌ها",
        description: error.message
      });
    }
  };

  const fetchVitamins = async () => {
    try {
      const { data, error } = await supabase
        .from('vitamins')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVitamins(data || []);
    } catch (error: any) {
      console.error('Error fetching vitamins:', error);
      toast({
        variant: "destructive",
        title: "خطا در بارگیری ویتامین‌ها",
        description: error.message
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchSupplements(),
        fetchVitamins()
      ]);
      setLoading(false);
    };
    
    loadData();
  }, []);

  return {
    supplements,
    vitamins,
    loading,
    refetch: async () => {
      await Promise.all([
        fetchSupplements(),
        fetchVitamins()
      ]);
    }
  };
};
