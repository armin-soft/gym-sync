
import { useState, useEffect, useMemo } from 'react';
import type { Supplement, SupplementCategory } from '@/types/supplement';

export const useSupplementsManager = () => {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [categories, setCategories] = useState<SupplementCategory[]>([]);
  const [activeTab, setActiveTab] = useState<'supplement' | 'vitamin'>('supplement');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedSupplements = localStorage.getItem('supplements');
      const savedCategories = localStorage.getItem('supplementCategories');
      
      console.log('Loading supplements data:', { savedSupplements, savedCategories });
      
      if (savedSupplements) {
        const parsedSupplements = JSON.parse(savedSupplements);
        console.log('Parsed supplements:', parsedSupplements);
        setSupplements(parsedSupplements);
      }
      
      if (savedCategories) {
        const parsedCategories = JSON.parse(savedCategories);
        console.log('Parsed categories:', parsedCategories);
        setCategories(parsedCategories);
      }
    } catch (error) {
      console.error('Error loading supplements data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveSupplements = (newSupplements: Supplement[]) => {
    console.log('Saving supplements:', newSupplements);
    setSupplements(newSupplements);
    localStorage.setItem('supplements', JSON.stringify(newSupplements));
  };

  const saveCategories = (newCategories: SupplementCategory[]) => {
    console.log('Saving categories:', newCategories);
    setCategories(newCategories);
    localStorage.setItem('supplementCategories', JSON.stringify(newCategories));
  };

  const addCategory = (name: string) => {
    const newCategory: SupplementCategory = {
      id: Date.now(),
      name,
      type: activeTab,
    };
    console.log('Adding new category:', newCategory);
    saveCategories([...categories, newCategory]);
  };

  const updateCategory = (id: number, name: string) => {
    const updatedCategories = categories.map(cat =>
      cat.id === id ? { ...cat, name } : cat
    );
    saveCategories(updatedCategories);
  };

  const deleteCategory = (categoryToDelete: SupplementCategory) => {
    const updatedCategories = categories.filter(cat => cat.id !== categoryToDelete.id);
    saveCategories(updatedCategories);
    
    if (selectedCategory === categoryToDelete.name) {
      setSelectedCategory(null);
    }
  };

  const addSupplement = (data: Omit<Supplement, 'id'>) => {
    const newSupplement: Supplement = {
      ...data,
      id: Date.now(),
      type: activeTab,
    };
    console.log('Adding new supplement:', newSupplement);
    saveSupplements([...supplements, newSupplement]);
  };

  const updateSupplement = (id: number, data: Omit<Supplement, 'id'>) => {
    const updatedSupplements = supplements.map(supp =>
      supp.id === id ? { ...data, id, type: activeTab } : supp
    );
    saveSupplements(updatedSupplements);
  };

  const deleteSupplement = (id: number) => {
    const updatedSupplements = supplements.filter(supp => supp.id !== id);
    saveSupplements(updatedSupplements);
  };

  const filteredSupplements = useMemo(() => {
    const filtered = supplements.filter(supplement => {
      const matchesType = supplement.type === activeTab;
      const matchesCategory = !selectedCategory || supplement.category === selectedCategory;
      return matchesType && matchesCategory;
    });
    console.log('Filtered supplements:', { activeTab, selectedCategory, filtered });
    return filtered;
  }, [supplements, activeTab, selectedCategory]);

  const relevantCategories = useMemo(() => {
    // اگر هیچ دسته‌بندی با نوع مشخص نشده است، همه دسته‌بندی‌ها را نمایش بده
    const filtered = categories.filter(category => 
      !category.type || category.type === activeTab
    );
    console.log('Relevant categories:', { activeTab, categories, filtered });
    return filtered;
  }, [categories, activeTab]);

  return {
    supplements,
    categories,
    filteredSupplements,
    relevantCategories,
    activeTab,
    selectedCategory,
    isLoading,
    
    setActiveTab,
    setSelectedCategory,
    addCategory,
    updateCategory,
    deleteCategory,
    addSupplement,
    updateSupplement,
    deleteSupplement,
  };
};

export * from './types';
