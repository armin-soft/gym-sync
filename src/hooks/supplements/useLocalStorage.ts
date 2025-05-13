
import { useState, useEffect } from 'react';
import type { Supplement, SupplementCategory } from '@/types/supplement';
import type { SupplementType } from './types';
import { useToast } from '@/hooks/use-toast';

export const useLocalStorage = (initialTab: SupplementType) => {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [categories, setCategories] = useState<SupplementCategory[]>([]);
  const [activeTab, setActiveTab] = useState<SupplementType>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedSupplements = localStorage.getItem('supplements');
      const savedCategories = localStorage.getItem('supplementCategories');

      if (savedSupplements) {
        const parsedSupplements = JSON.parse(savedSupplements);
        if (Array.isArray(parsedSupplements)) {
          setSupplements(parsedSupplements);
        } else {
          console.error('Parsed supplements is not an array');
          setSupplements([]);
        }
      }

      if (savedCategories) {
        const parsedCategories = JSON.parse(savedCategories);
        if (Array.isArray(parsedCategories)) {
          setCategories(parsedCategories);
        } else {
          console.error('Parsed categories is not an array');
          setCategories([]);
        }
      } else {
        // Initialize with default categories if none exist
        const defaultCategories: SupplementCategory[] = [
          { id: "cat1", name: "پروتئین", type: "supplement" },
          { id: "cat2", name: "آمینو اسید", type: "supplement" },
          { id: "cat3", name: "ویتامین B", type: "vitamin" },
          { id: "cat4", name: "ویتامین D", type: "vitamin" }
        ];
        setCategories(defaultCategories);
        localStorage.setItem('supplementCategories', JSON.stringify(defaultCategories));
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      toast({
        title: "خطا در بارگذاری",
        description: "مشکلی در بارگذاری اطلاعات پیش آمد",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('supplements', JSON.stringify(supplements));
    }
  }, [supplements, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('supplementCategories', JSON.stringify(categories));
    }
  }, [categories, isLoading]);

  return {
    supplements,
    setSupplements,
    categories,
    setCategories,
    activeTab,
    setActiveTab,
    selectedCategory,
    setSelectedCategory,
    isLoading
  };
};
