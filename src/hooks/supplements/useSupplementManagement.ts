
import { useState } from 'react';
import type { Supplement } from '@/types/supplement';
import { useToast } from '@/hooks/use-toast';
import { SupplementType } from './types';

export const useSupplementManagement = (
  supplements: Supplement[],
  setSupplements: React.Dispatch<React.SetStateAction<Supplement[]>>,
  activeTab: SupplementType
) => {
  const { toast } = useToast();

  const addSupplement = () => {
    // This would typically open a modal/form
    // For simplicity, we're using prompt
    const supplementName = prompt(
      `نام ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} جدید را وارد کنید:`
    );
    
    if (supplementName && supplementName.trim() !== '') {
      const newId = supplements.length > 0 
        ? Math.max(...supplements.map(s => s.id)) + 1 
        : 1;
      
      const newSupplement: Supplement = {
        id: newId,
        name: supplementName.trim(),
        type: activeTab,
        categoryId: "",
        description: "",
        dosage: "",
        image: "",
        frequency: "",
        createdAt: new Date().toISOString()
      };
      
      setSupplements(prev => [...prev, newSupplement]);
      
      toast({
        title: `${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} جدید اضافه شد`,
        description: `«${supplementName}» با موفقیت اضافه شد`,
      });
    }
  };

  const editSupplement = (supplement: Supplement) => {
    // This would typically open a modal/form with all fields
    // For simplicity, we're just updating the name via prompt
    const updatedName = prompt(
      `نام جدید ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} را وارد کنید:`,
      supplement.name
    );
    
    if (updatedName && updatedName.trim() !== '' && updatedName !== supplement.name) {
      setSupplements(prev => prev.map(supp => 
        supp.id === supplement.id ? { ...supp, name: updatedName } : supp
      ));
      
      toast({
        title: "ویرایش انجام شد",
        description: `نام به «${updatedName}» تغییر یافت`,
      });
    }
  };

  const deleteSupplement = (id: number) => {
    const supplementToDelete = supplements.find(s => s.id === id);
    if (!supplementToDelete) return;
    
    const confirmDelete = window.confirm(`آیا از حذف «${supplementToDelete.name}» اطمینان دارید؟`);
    
    if (confirmDelete) {
      setSupplements(prev => prev.filter(supp => supp.id !== id));
      
      toast({
        title: "حذف انجام شد",
        description: `«${supplementToDelete.name}» با موفقیت حذف شد`,
      });
    }
  };

  return {
    addSupplement,
    editSupplement,
    deleteSupplement
  };
};
