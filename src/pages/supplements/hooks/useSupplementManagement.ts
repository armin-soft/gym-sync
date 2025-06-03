
import { useState, useEffect, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";

export interface Supplement {
  id: number;
  name: string;
  type: 'supplement' | 'vitamin';
  category: string;
  dosage?: string;
  timing?: string;
  description?: string;
  benefits?: string[];
  sideEffects?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  type: 'supplement' | 'vitamin';
  description?: string;
  createdAt: string;
}

export const useSupplementManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'supplement' | 'vitamin'>('supplement');
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Load data from localStorage only - no default data
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
      console.error('Error loading data:', error);
      toast({
        title: "خطا در بارگذاری داده‌ها",
        description: "مشکلی در بارگذاری اطلاعات پیش آمد",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Filter supplements by active tab
  const filteredSupplements = useMemo(() => {
    let filtered = supplements.filter(s => s.type === activeTab);
    if (selectedCategory) {
      filtered = filtered.filter(s => s.category === selectedCategory);
    }
    return filtered;
  }, [supplements, activeTab, selectedCategory]);

  // Filter categories by active tab
  const filteredCategories = useMemo(() => {
    return categories.filter(c => c.type === activeTab);
  }, [categories, activeTab]);

  const addSupplement = (supplementData: Omit<Supplement, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSupplement: Supplement = {
      ...supplementData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedSupplements = [...supplements, newSupplement];
    setSupplements(updatedSupplements);
    localStorage.setItem('supplements', JSON.stringify(updatedSupplements));
    
    toast({
      title: `${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} جدید افزوده شد`,
      description: `${newSupplement.name} با موفقیت اضافه شد`
    });
  };

  const updateSupplement = (id: number, supplementData: Partial<Supplement>) => {
    const updatedSupplements = supplements.map(s => 
      s.id === id ? { ...s, ...supplementData, updatedAt: new Date().toISOString() } : s
    );
    setSupplements(updatedSupplements);
    localStorage.setItem('supplements', JSON.stringify(updatedSupplements));
    
    toast({
      title: `${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} ویرایش شد`,
      description: "تغییرات با موفقیت ذخیره شد"
    });
  };

  const deleteSupplement = (id: number) => {
    const supplementToDelete = supplements.find(s => s.id === id);
    const updatedSupplements = supplements.filter(s => s.id !== id);
    setSupplements(updatedSupplements);
    localStorage.setItem('supplements', JSON.stringify(updatedSupplements));
    
    toast({
      title: `${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} حذف شد`,
      description: `${supplementToDelete?.name} با موفقیت حذف شد`
    });
  };

  const addCategory = (categoryData: Omit<Category, 'id' | 'createdAt'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    localStorage.setItem('supplementCategories', JSON.stringify(updatedCategories));
    
    toast({
      title: "دسته‌بندی جدید افزوده شد",
      description: `${newCategory.name} با موفقیت اضافه شد`
    });
  };

  const updateCategory = (id: number, categoryData: Partial<Category>) => {
    const updatedCategories = categories.map(c => 
      c.id === id ? { ...c, ...categoryData } : c
    );
    setCategories(updatedCategories);
    localStorage.setItem('supplementCategories', JSON.stringify(updatedCategories));
    
    toast({
      title: "دسته‌بندی ویرایش شد",
      description: "تغییرات با موفقیت ذخیره شد"
    });
  };

  const deleteCategory = (id: number) => {
    const categoryToDelete = categories.find(c => c.id === id);
    const updatedCategories = categories.filter(c => c.id !== id);
    setCategories(updatedCategories);
    localStorage.setItem('supplementCategories', JSON.stringify(updatedCategories));
    
    // Clear selected category if it was deleted
    if (selectedCategory === categoryToDelete?.name) {
      setSelectedCategory(null);
    }
    
    toast({
      title: "دسته‌بندی حذف شد",
      description: `${categoryToDelete?.name} با موفقیت حذف شد`
    });
  };

  return {
    activeTab,
    setActiveTab,
    supplements: filteredSupplements,
    allSupplements: supplements,
    categories: filteredCategories,
    allCategories: categories,
    isLoading,
    selectedCategory,
    setSelectedCategory,
    addSupplement,
    updateSupplement,
    deleteSupplement,
    addCategory,
    updateCategory,
    deleteCategory
  };
};
