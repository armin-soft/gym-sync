
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
      
      if (savedSupplements) {
        setSupplements(JSON.parse(savedSupplements));
      }
      
      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      }
    } catch (error) {
      console.error('Error loading supplements data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveSupplements = (newSupplements: Supplement[]) => {
    setSupplements(newSupplements);
    localStorage.setItem('supplements', JSON.stringify(newSupplements));
  };

  const saveCategories = (newCategories: SupplementCategory[]) => {
    setCategories(newCategories);
    localStorage.setItem('supplementCategories', JSON.stringify(newCategories));
  };

  const addCategory = (name: string) => {
    const newCategory: SupplementCategory = {
      id: Date.now(),
      name,
      type: activeTab,
    };
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
    return supplements.filter(supplement => {
      const matchesType = supplement.type === activeTab;
      const matchesCategory = !selectedCategory || supplement.category === selectedCategory;
      return matchesType && matchesCategory;
    });
  }, [supplements, activeTab, selectedCategory]);

  const relevantCategories = useMemo(() => {
    return categories.filter(category => category.type === activeTab);
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
