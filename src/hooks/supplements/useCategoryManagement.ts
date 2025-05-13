
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Supplement, SupplementCategory } from '@/types/supplement';
import { useToast } from '@/hooks/use-toast';
import { SupplementType } from './types';

export const useCategoryManagement = (
  supplements: Supplement[],
  setSupplements: React.Dispatch<React.SetStateAction<Supplement[]>>,
  categories: SupplementCategory[],
  setCategories: React.Dispatch<React.SetStateAction<SupplementCategory[]>>,
  activeTab: SupplementType
) => {
  const { toast } = useToast();

  const addCategory = () => {
    // Create a prompt or dialog to get the category name
    const categoryName = prompt(`نام دسته جدید ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} را وارد کنید:`);
    if (categoryName && categoryName.trim() !== '') {
      const newCategory: SupplementCategory = {
        id: uuidv4(),
        name: categoryName.trim(),
        type: activeTab
      };
      
      setCategories(prev => [...prev, newCategory]);
      
      toast({
        title: "دسته جدید اضافه شد",
        description: `دسته «${categoryName}» با موفقیت اضافه شد`,
      });
    }
  };

  const editCategory = (category: SupplementCategory) => {
    const updatedName = prompt('نام جدید دسته را وارد کنید:', category.name);
    
    if (updatedName && updatedName.trim() !== '' && updatedName !== category.name) {
      setCategories(prev => prev.map(cat => 
        cat.id === category.id ? { ...cat, name: updatedName } : cat
      ));
      
      toast({
        title: "دسته ویرایش شد",
        description: `نام دسته به «${updatedName}» تغییر یافت`,
      });
    }
  };

  const deleteCategory = (category: SupplementCategory) => {
    const supplementsInCategory = supplements.filter(s => s.categoryId === category.id);
    
    if (supplementsInCategory.length > 0) {
      const confirmDelete = window.confirm(
        `این دسته حاوی ${supplementsInCategory.length} مورد است. حذف دسته باعث می‌شود این موارد بدون دسته‌بندی شوند. آیا مطمئن هستید؟`
      );
      
      if (!confirmDelete) return;

      // Update supplements to remove the category reference
      setSupplements(prev => prev.map(supp => 
        supp.categoryId === category.id ? { ...supp, categoryId: "" } : supp
      ));
    } else {
      const confirmDelete = window.confirm(`آیا از حذف دسته «${category.name}» اطمینان دارید؟`);
      if (!confirmDelete) return;
    }
    
    setCategories(prev => prev.filter(cat => cat.id !== category.id));
    
    toast({
      title: "دسته حذف شد",
      description: `دسته «${category.name}» با موفقیت حذف شد`,
    });
  };

  return {
    addCategory,
    editCategory,
    deleteCategory
  };
};
